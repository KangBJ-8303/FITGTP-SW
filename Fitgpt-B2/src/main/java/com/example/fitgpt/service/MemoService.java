package com.example.fitgpt.service;

import com.example.fitgpt.dto.MemoDTO;
import com.example.fitgpt.entity.MemoEntity;
import com.example.fitgpt.repository.MemoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemoService {

    @Autowired
    private MemoRepository memoRepository;

    public Optional<MemoDTO> findMemoByUserEmailAndDate(String userEmail, String date) {
        return memoRepository.findByUserEmailAndDate(userEmail, date)
                .map(MemoDTO::toMemoDTO);
    }

    public MemoDTO saveMemo(String userEmail, String date, MemoDTO memoDTO) {
        // 현재 이메일과 날짜에 해당하는 메모를 조회
        Optional<MemoEntity> existingMemo = memoRepository.findByUserEmailAndDate(userEmail, date);

        MemoEntity memoEntity;
        if (existingMemo.isPresent()) {
            // 데이터가 존재하면 기존 엔티티를 업데이트
            memoEntity = existingMemo.get();
            memoEntity.setContent(memoDTO.getContent());
        } else {
            // 데이터가 없으면 새로운 엔티티 생성
            memoEntity = MemoEntity.toMemoEntity(memoDTO);
            memoEntity.setUserEmail(userEmail);
            memoEntity.setDate(date);
        }

        // 저장 후 DTO로 변환하여 반환
        MemoEntity savedEntity = memoRepository.save(memoEntity);
        return MemoDTO.toMemoDTO(savedEntity);
    }

}
