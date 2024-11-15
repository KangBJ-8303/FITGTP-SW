package com.example.fitgpt.controller;

import com.example.fitgpt.dto.MemoDTO;
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
    @GetMapping("/{userId}/{date}")
    public ResponseEntity<Map<String, String>> getMemoContentByDate(@PathVariable Long userId, @PathVariable String date) {
        Optional<MemoDTO> memo = memoService.findMemoByUserIdAndDate(userId, date);

        if (memo.isPresent()) {
            String content = memo.get().getContent();
            Map<String, String> response = new HashMap<>();
            response.put("content", content);
            return ResponseEntity.ok(response);
        }

        Map<String, String> emptyResponse = new HashMap<>();
        emptyResponse.put("content", "내용을 입력해주세요.");
        return ResponseEntity.ok(emptyResponse);
    }


    // 메모 저장
    @PostMapping("/{userId}/{date}")
    public ResponseEntity<MemoDTO> saveMemo(@PathVariable Long userId, @PathVariable String date, @RequestBody MemoDTO memoDTO) {
        MemoDTO savedMemo = memoService.saveMemo(userId, date, memoDTO);
        return ResponseEntity.ok(savedMemo);
    }

    // 메모 업데이트
    @PutMapping("/{userId}/{date}")
    public ResponseEntity<MemoDTO> updateMemo(@PathVariable Long userId, @PathVariable String date, @RequestBody MemoDTO memoDTO) {
        MemoDTO updatedMemo = memoService.updateMemo(userId, date, memoDTO);
        return ResponseEntity.ok(updatedMemo);
    }
}
