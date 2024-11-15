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
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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

    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getProfileDetails(@PathVariable Long userId) {
        // 현재 날짜와 전날 날짜 가져오기
        LocalDate todayDate = LocalDate.now();
        LocalDate yesterdayDate = todayDate.minusDays(1);

        String today = todayDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        String yesterday = yesterdayDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        // 오늘과 전날의 메모 조회
        Optional<MemoDTO> todayMemo = memoService.findMemoByUserIdAndDate(userId, today);
        String todayContent = todayMemo.map(MemoDTO::getContent).orElse("");

        Optional<MemoDTO> yesterdayMemo = memoService.findMemoByUserIdAndDate(userId, yesterday);
        String yesterdayContent = yesterdayMemo.map(MemoDTO::getContent).orElse("");

        // 사용자 이름 및 신체 정보 조회
        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        UserPhysicalEntity physicalInfo = userPhysicalRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("사용자의 신체 정보를 찾을 수 없습니다."));

        String chatGptResponse = profileService.getUserEvaluation(userId);

        // JSON 응답 생성
        Map<String, String> todayResponse = new HashMap<>();
        todayResponse.put("date", today);
        todayResponse.put("content", todayContent);

        Map<String, String> yesterdayResponse = new HashMap<>();
        yesterdayResponse.put("date", yesterday);
        yesterdayResponse.put("content", yesterdayContent);

        Map<String, Object> userDetails = new HashMap<>();
        userDetails.put("name", userEntity.getUserName());
        userDetails.put("height", physicalInfo.getHeight());
        userDetails.put("weight", physicalInfo.getWeight());
        userDetails.put("age", physicalInfo.getAge());

        // 최종 응답 구조
        Map<String, Object> response = new HashMap<>();
        response.put("today", todayResponse);
        response.put("yesterday", yesterdayResponse);
        response.put("evaluation", chatGptResponse); // ChatGPT 응답 추가
        response.put("userDetails", userDetails);   // 사용자 이름 및 신체 정보 추가

        return ResponseEntity.ok(response);
    }
}

