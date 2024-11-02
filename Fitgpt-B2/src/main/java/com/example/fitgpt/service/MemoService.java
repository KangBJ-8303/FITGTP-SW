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

    public Optional<MemoDTO> findMemoByUserIdAndDate(Long userId, String date) {
        return memoRepository.findByUserIdAndDate(userId, date)
                .map(MemoDTO::toMemoDTO);
    }

    public MemoDTO saveMemo(Long userId, String date, MemoDTO memoDTO) {
        MemoEntity memoEntity = MemoEntity.toMemoEntity(memoDTO);
        memoEntity.setUserId(userId);
        memoEntity.setDate(date);
        MemoEntity savedEntity = memoRepository.save(memoEntity);
        return MemoDTO.toMemoDTO(savedEntity);
    }

    public MemoDTO updateMemo(Long userId, String date, MemoDTO memoDTO) {
        MemoEntity memoEntity = MemoEntity.toUpdateMemoEntity(memoDTO); // 업데이트용 MemoEntity 생성
        memoEntity.setUserId(userId);
        memoEntity.setDate(date);
        MemoEntity updatedEntity = memoRepository.save(memoEntity);
        return MemoDTO.toMemoDTO(updatedEntity); // 업데이트된 MemoEntity를 MemoDTO로 변환하여 반환
    }
}
