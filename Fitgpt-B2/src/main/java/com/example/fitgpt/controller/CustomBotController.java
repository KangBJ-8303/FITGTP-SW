package com.example.fitgpt.controller;

import com.example.fitgpt.entity.ChatHistoryEntity;
import com.example.fitgpt.repository.ChatHistoryRepository;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CustomBotController {

    @Value("${openai.api.key}")
    private String apiKey;  // application.properties에서 API 키를 가져옴

    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

    @Autowired
    private ChatHistoryRepository chatHistoryRepository;  // ChatHistoryRepository 주입

    @PostMapping("/chat")
    public String chat(@RequestBody String userMessage) throws JSONException {  // 사용자 메시지를 요청 본문으로 받음
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);  // application.properties에 설정된 API 키 사용

        JSONObject message = new JSONObject();
        message.put("role", "user");
        message.put("content", userMessage);

        JSONArray messages = new JSONArray();
        messages.put(message);  // 메시지를 JSON 배열에 추가

        JSONObject openAiRequestBody = new JSONObject();
        openAiRequestBody.put("model", "gpt-3.5-turbo");  // 사용할 모델 설정
        openAiRequestBody.put("messages", messages);

        HttpEntity<String> entity = new HttpEntity<>(openAiRequestBody.toString(), headers);

        ResponseEntity<String> response = restTemplate.exchange(
                OPENAI_API_URL,
                HttpMethod.POST,
                entity,
                String.class
        );

        JSONObject responseBody = new JSONObject(response.getBody());
        String reply = responseBody
                .getJSONArray("choices")
                .getJSONObject(0)
                .getJSONObject("message")
                .getString("content");

        // 채팅 기록을 데이터베이스에 저장
        ChatHistoryEntity userChat = new ChatHistoryEntity(1L, userMessage, reply, LocalDateTime.now());
        chatHistoryRepository.save(userChat);

        return reply;
    }

    // 이전 채팅 기록을 조회할 수 있는 엔드포인트 추가
    @GetMapping("/chat/history")
    public List<ChatHistoryEntity> getChatHistory() {
        return chatHistoryRepository.findAll();
    }
}