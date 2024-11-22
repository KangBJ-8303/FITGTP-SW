package com.example.fitgpt.controller;

import com.example.fitgpt.dto.MemoDTO;
import com.example.fitgpt.entity.UserPhysicalEntity;
import com.example.fitgpt.entity.UserEntity;
import com.example.fitgpt.service.MemoService;
import com.example.fitgpt.service.ProfileService;
import com.example.fitgpt.repository.UserPhysicalRepository;
import com.example.fitgpt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    @Autowired
    private MemoService memoService;

    @Autowired
    private ProfileService profileService;

    @Autowired
    private UserPhysicalRepository userPhysicalRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{userEmail}")
    public ResponseEntity<Map<String, Object>> getProfileDetails(@PathVariable("userEmail") String userEmail) {
        // 현재 날짜와 전날 날짜 가져오기
        LocalDate todayDate = LocalDate.now();
        LocalDate yesterdayDate = todayDate.minusDays(1);

        String today = todayDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        String yesterday = yesterdayDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        // 오늘과 전날의 메모 조회
        Optional<MemoDTO> todayMemo = memoService.findMemoByUserEmailAndDate(userEmail, today);
        String todayContent = todayMemo.map(MemoDTO::getContent).orElse("");

        Optional<MemoDTO> yesterdayMemo = memoService.findMemoByUserEmailAndDate(userEmail, yesterday);
        String yesterdayContent = yesterdayMemo.map(MemoDTO::getContent).orElse("");

        String[] memo = {todayContent, yesterdayContent};
        List<String> memoContents = Arrays.asList(todayContent, yesterdayContent);

        // 사용자 이름 및 신체 정보 조회
        UserEntity userEntity = userRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        UserPhysicalEntity physicalInfo = userPhysicalRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("사용자의 신체 정보를 찾을 수 없습니다."));

        String chatGptResponse = profileService.getUserEvaluation(userEmail);

        Map<String, Object> response = new HashMap<>();
        response.put("name", userEntity.getUserName());
        response.put("height", physicalInfo.getHeight());
        response.put("weight", physicalInfo.getWeight());
        response.put("age", physicalInfo.getAge());
        response.put("workoutRecord", memo);
        response.put("evaluation", chatGptResponse);

        // 최종 응답 구조
        /*
        Map<String, Object> response = new HashMap<>();
        response.put("today", todayResponse);
        response.put("yesterday", yesterdayResponse);
        response.put("evaluation", chatGptResponse); // ChatGPT 응답 추가
        response.put("userDetails", userDetails);   // 사용자 이름 및 신체 정보 추가
        */

        return ResponseEntity.ok(response);
    }
}

