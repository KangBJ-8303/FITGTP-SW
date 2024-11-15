package com.example.fitgpt.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class KeyWordService {

    private final RestTemplate restTemplate;
    private final String openAiApiUrl;
    private final String openAiApiKey;

    @Autowired
    public KeyWordService(RestTemplate restTemplate,
                          @Value("${openai.api.url}") String openAiApiUrl,
                          @Value("${openai.api.key}") String openAiApiKey) {
        this.restTemplate = restTemplate;
        this.openAiApiUrl = openAiApiUrl;
        this.openAiApiKey = openAiApiKey;
    }

    // 입력 텍스트에서 키워드를 추출하는 메소드
    public Map<String, List<String>> extractKeywords(String text) {
        try {
            String prompt = generatePrompt(text);
            String response = callOpenAiApi(prompt);
            return parseOpenAiResponse(response);
        } catch (Exception e) {
            throw new RuntimeException("키워드 추출 중 오류가 발생했습니다: " + e.getMessage(), e);
        }
    }

    // OpenAI 모델에 전달할 프롬프트 생성
    private String generatePrompt(String text) {
        return String.format(
                "다음 문장에서 운동 관련 키워드와 식단 관련 키워드를 추출해 주세요.\n\n" +
                        "문장: \"%s\"\n\n" +
                        "결과 형식: {\"운동\": [\"운동 키워드1\", \"운동 키워드2\"], \"식단\": [\"식단 키워드1\", \"식단 키워드2\"]}",
                text
        );
    }

    // OpenAI API 호출
    private String callOpenAiApi(String prompt) {
        // 요청 본문 생성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("messages", List.of(Map.of("role", "user", "content", prompt)));
        requestBody.put("temperature", 0.5);

        // HTTP 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openAiApiKey);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        // OpenAI API 호출 및 응답 처리
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(openAiApiUrl, requestEntity, String.class);

        if (!responseEntity.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("OpenAI API 호출 실패: " + responseEntity.getBody());
        }

        return responseEntity.getBody();
    }

    // OpenAI 응답을 파싱하여 키워드 맵으로 변환
    private Map<String, List<String>> parseOpenAiResponse(String response) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // OpenAI에서 JSON 형태로 반환된 데이터를 파싱
            return objectMapper.readValue(response, new TypeReference<>() {});
        } catch (Exception e) {
            throw new RuntimeException("OpenAI 응답 처리 중 오류가 발생했습니다.", e);
        }
    }
}
