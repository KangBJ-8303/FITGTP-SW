
package com.example.fitgpt.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Table(name = "chat_history")
public class ChatHistoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String question;

    @Column(nullable = false)
    private String solution;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    public ChatHistoryEntity() {}

    public ChatHistoryEntity(Long userId, String question, String solution, LocalDateTime timestamp) {
        this.userId = userId;
        this.question = question;
        this.solution = solution;
        this.timestamp = timestamp;
    }
}

