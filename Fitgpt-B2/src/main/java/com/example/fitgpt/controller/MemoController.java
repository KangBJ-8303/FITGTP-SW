package com.example.fitgpt.controller;

import com.example.fitgpt.dto.MemoDTO;
import com.example.fitgpt.service.MemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/memos")
public class MemoController {

    @Autowired
    private MemoService memoService;

    // 특정 날짜의 메모를 조회
    @GetMapping("/{userId}/{date}")
    public ResponseEntity<MemoDTO> getMemoByDate(@PathVariable Long userId, @PathVariable String date) {
        Optional<MemoDTO> memo = memoService.findMemoByUserIdAndDate(userId, date);
        return memo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.ok(new MemoDTO()));
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
