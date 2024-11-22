package com.example.fitgpt.service;

import com.example.fitgpt.dto.ChatGPTRequest;
import com.example.fitgpt.dto.ChatGPTResponse;
import com.example.fitgpt.entity.UserPhysicalEntity;
import com.example.fitgpt.repository.UserPhysicalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RecommendationService {

    @Autowired
    private UserPhysicalRepository userPhysicalRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${openai.api.url}")
    private String openAiApiUrl;

    @Value("${openai.exercise_fine_tuned_model}")
    private String exerciseFineTunedModel; // Fine-tuned 모델 ID

    @Value("${openai.diet_fine_tuned_model}")
    private String dietFineTunedModel; // Fine-tuned 모델 ID

    public String getExerciseRecommendation(String userEmail) {
        String userContext = generateContext(userEmail, "운동");
        return getRecommendationFromOpenAi(userContext, "운동");
    }

    public String getDietRecommendation(String userEmail) {
        String userContext = generateContext(userEmail, "식단");
        return getRecommendationFromOpenAi(userContext, "식단");
    }

    private String generateContext(String userEmail, String type) {
        UserPhysicalEntity physicalInfo = userPhysicalRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("사용자의 신체 정보를 찾을 수 없습니다."));

        return "사용자의 신체 정보:\n" + "성별: " + physicalInfo.getGender() +
                "키: " + physicalInfo.getHeight() + " cm\n" +
                "몸무게: " + physicalInfo.getWeight() + " kg\n" +
                "나이: " + physicalInfo.getAge() + " 세\n" +
                "체지방량: " + physicalInfo.getBodyFat() + " %\n" +
                "근육량: " + physicalInfo.getMuscleMass() + " kg\n\n" +
                type + "을 키워드 하나로 추천해줘";
    }

    private String getRecommendationFromOpenAi(String context, String type) {
        try {
            ChatGPTRequest chatRequest =null;

            if(type.equals("운동")){
                chatRequest = new ChatGPTRequest(exerciseFineTunedModel, context);
            }
            else if(type.equals("식단")){
                chatRequest = new ChatGPTRequest(dietFineTunedModel, context);
            }
            ChatGPTResponse chatResponse = restTemplate.postForObject(openAiApiUrl, chatRequest, ChatGPTResponse.class);

            if (chatResponse != null && !chatResponse.getChoices().isEmpty()) {
                return chatResponse.getChoices().get(0).getMessage().getContent();
            } else {
                return type + " 추천을 생성하는 데 문제가 발생했습니다.";
            }
        } catch (Exception e) {
            return type + " 추천을 생성하는 동안 오류가 발생했습니다: " + e.getMessage();
        }
    }
}
