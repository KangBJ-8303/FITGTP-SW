
package com.example.fitgpt.repository;

import com.example.fitgpt.entity.ChatHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatHistoryRepository extends JpaRepository<ChatHistoryEntity, Long> {
    // 필요한 추가 메서드가 있다면 여기서 정의할 수 있습니다.
}



