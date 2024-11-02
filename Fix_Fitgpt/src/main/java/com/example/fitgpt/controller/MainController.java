package com.example.fitgpt.controller;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class MainController {

    private static final String API_KEY = "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";
    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";


    @PostMapping("/chat")
    public String chat() throws JSONException {// 기본 메시지 설정
//    public String chat( @RequestBody Map<String, Object> requestBody) throws JSONException {// 기본 메시지 설정
        // String userMessage =  body.get("user_msg")
//        System.out.println("Request Body 전체: " + requestBody);
        String userMessage = "단기간 다이어트를 위한 여성용 식단을 추천해줘요!";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(API_KEY);

        // 요청 데이터 설정 (ChatGPT 형식에 맞춤)
        JSONObject message = new JSONObject();
        message.put("role", "user");
        message.put("content", userMessage);

        JSONArray messages = new JSONArray();
        messages.put(message);  // JSONArray에 메시지를 추가

        JSONObject openAirequestBody = new JSONObject();
        openAirequestBody.put("model", "gpt-4o");  // 사용할 ChatGPT 모델
        openAirequestBody.put("messages", messages);  // JSONArray 사용

        HttpEntity<String> entity = new HttpEntity<>(openAirequestBody.toString(), headers);

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

        return reply;
    }
}
