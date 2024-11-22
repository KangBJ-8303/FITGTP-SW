package com.example.fitgpt.service;

import com.example.fitgpt.dto.ChatGPTRequest;
import com.example.fitgpt.dto.ChatGPTResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

@Service
public class  OpenAiService {

    @Autowired
    private RestTemplate restTemplate;

    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

    public String getRecommendationFromOpenAi(String prompt) {
        try {
            // 요청 객체 생성
            ChatGPTRequest chatRequest = new ChatGPTRequest("gpt-3.5-turbo", prompt);

            // REST 요청 실행
            ResponseEntity<ChatGPTResponse> responseEntity = restTemplate.postForEntity(
                    OPENAI_API_URL,
                    new HttpEntity<>(chatRequest), // 요청 본문과 헤더가 포함된 엔티티
                    ChatGPTResponse.class
            );

            // 응답 처리
            ChatGPTResponse chatResponse = responseEntity.getBody();
            if (chatResponse != null && !chatResponse.getChoices().isEmpty()) {
                return chatResponse.getChoices().get(0).getMessage().getContent();
            } else {
                return "평가를 생성하는 데 문제가 발생했습니다.";
            }
        } catch (Exception e) {
            return "평가를 생성하는 동안 오류가 발생했습니다: " + e.getMessage();
        }
    }
}
