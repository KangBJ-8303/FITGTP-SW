package com.example.fitgpt.controller;

import com.example.fitgpt.service.OpenAiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/bot")
public class CustomBotController {

    private final OpenAiService openAiService;

    @Autowired
    public CustomBotController(OpenAiService openAiService) {
        this.openAiService = openAiService;
    }

    /**
     * OpenAI와의 대화를 처리하는 API 엔드포인트
     * @param prompt 사용자가 입력한 메시지
     * @return 사용자 입력과 ChatGPT의 응답을 포함한 Map 객체
     */
    @GetMapping("/chat")
    public ResponseEntity<Map<String, Object>> getChatResponse(@RequestParam String prompt) {
        Map<String, Object> responseMap = new HashMap<>();
        try {
            // OpenAiService를 통해 ChatGPT 응답 가져오기
            String chatResponse = openAiService.getRecommendationFromOpenAi(prompt);

            // 응답 데이터를 Map에 추가

            responseMap.put("content", chatResponse);

            return ResponseEntity.ok(responseMap);
        } catch (Exception e) {
            // 에러 발생 시 에러 메시지와 상태 코드 반환

            responseMap.put("error", "Error: Unable to process your request. " + e.getMessage());
            return ResponseEntity.status(500).body(responseMap);
        }
    }
}
