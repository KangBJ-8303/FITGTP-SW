package com.example.fitgpt.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ChatBotDTO {
    private Long id;
    private Long userId;
    private String question;
    private String solution;
}
