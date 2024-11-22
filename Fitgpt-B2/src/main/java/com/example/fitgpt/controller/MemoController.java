package com.example.fitgpt.controller;

import com.example.fitgpt.dto.MemoDTO;
import com.example.fitgpt.entity.MemoEntity;
import com.example.fitgpt.service.MemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/memos")
public class MemoController {

    @Autowired
    private MemoService memoService;

    // 특정 날짜의 메모를 조회
    @GetMapping("/{userEmail}/{date}")
    public ResponseEntity<String> getMemoContentByDate(@PathVariable String userEmail, @PathVariable String date) {
        // 특정 이메일과 날짜로 메모 조회
        Optional<MemoDTO> memo = memoService.findMemoByUserEmailAndDate(userEmail, date);

        if (memo.isPresent()) {
            return ResponseEntity.ok(memo.get().getContent());
        }

        // 메모가 없을 경우 기본 메시지 반환
        return ResponseEntity.ok("내용을 입력해주세요.");
    }


    // 메모 저장
    @PostMapping("/{userEmail}/{date}")
    public ResponseEntity<MemoDTO> saveMemo(@RequestBody MemoDTO memoDTO) {
        MemoDTO savedMemo = memoService.saveMemo(memoDTO.getUserEmail(), memoDTO.getDate(), memoDTO);
        return ResponseEntity.ok(savedMemo);
    }
}
