package com.example.fitgpt.service;

import com.example.fitgpt.dto.ChatGPTRequest;
import com.example.fitgpt.dto.ChatGPTResponse;
import com.example.fitgpt.entity.MemoEntity;
import com.example.fitgpt.entity.UserPhysicalEntity;
import com.example.fitgpt.repository.MemoRepository;
import com.example.fitgpt.repository.UserPhysicalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;

@Service
public class UserEvaluationService {

    @Autowired
    private MemoRepository memoRepository;

    @Autowired
    private UserPhysicalRepository userPhysicalRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${openai.api.url}")
    private String openAiApiUrl;

    public String getExerciseRecommendation(Long userId) {
        String prompt = generatePrompt(userId, "운동");
        return getRecommendationFromOpenAi(prompt, "운동");
    }

    public String getDietRecommendation(Long userId) {
        String prompt = generatePrompt(userId, "식단");
        return getRecommendationFromOpenAi(prompt, "식단");
    }

    public String getUserEvaluation(Long userId) {
        String prompt = generatePrompt(userId, "운동");
        return getRecommendationFromOpenAi(prompt, "운동");
    }

    private String generatePrompt(Long userId, String type) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(7);
        List<MemoEntity> memoList = memoRepository.findByUserIdAndDateBetween(userId, startDate.toString(), endDate.toString());

        UserPhysicalEntity physicalInfo = userPhysicalRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("사용자의 신체 정보를 찾을 수 없습니다."));

        String memoContent = memoList.stream().map(MemoEntity::getContent).reduce("", (a, b) -> a + "\n" + b);

        return "사용자의 기록: " + memoContent + "\n\n" +
                "사용자의 신체 정보:\n" +
                "키: " + physicalInfo.getHeight() + " cm\n" +
                "몸무게: " + physicalInfo.getWeight() + " kg\n" +
                "나이: " + physicalInfo.getAge() + " 세\n" +
                "체지방률: " + physicalInfo.getBodyFatPercentage() + " %\n" +
                "골격근량: " + physicalInfo.getMuscleMass() + " kg\n\n" +
                "위 정보를 바탕으로 사용자에게 적합한 " + type + " 1가지를 키워드(ex데드리프트)로 추천해줘.";
    }

    private String getRecommendationFromOpenAi(String prompt, String type) {
        try {
            ChatGPTRequest chatRequest = new ChatGPTRequest("gpt-3.5-turbo", prompt);
            ChatGPTResponse chatResponse = restTemplate.postForObject(openAiApiUrl, chatRequest, ChatGPTResponse.class);

            if (chatResponse != null && !chatResponse.getChoices().isEmpty()) {
                return type + " 추천:\n" + chatResponse.getChoices().get(0).getMessage().getContent();
            } else {
                return type + " 추천을 생성하는 데 문제가 발생했습니다.";
            }
        } catch (Exception e) {
            return type + " 추천을 생성하는 동안 오류가 발생했습니다: " + e.getMessage();
        }
    }
}
