package com.example.fitgpt.repository;

import com.example.fitgpt.entity.MemoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemoRepository extends JpaRepository<MemoEntity, Long> {
    Optional<MemoEntity> findByUserIdAndDate(Long userId, String date);
    List<MemoEntity> findByUserIdAndDateBetween(Long userId, String startDate, String endDate);
}