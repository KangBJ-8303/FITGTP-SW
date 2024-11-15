package com.example.fitgpt.entity;

import com.example.fitgpt.dto.MemoDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "chatbot_table")
public class ChatBotEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column
    private String question;

    @Column
    private String solution;
}
