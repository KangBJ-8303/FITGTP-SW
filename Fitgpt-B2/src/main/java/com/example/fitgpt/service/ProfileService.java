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
public class ProfileService {
    @Autowired
    private MemoRepository memoRepository;

    @Autowired
    private UserPhysicalRepository userPhysicalRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${openai.api.url}")
    private String openAiApiUrl;

    public String getUserEvaluation(Long userId) {
        String prompt = generatePrompt(userId);
        return getRecommendationFromOpenAi(prompt);
    }

    private String generatePrompt(Long userId) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(7);

        // 사용자의 메모(1주일 기록) 가져오기
        List<MemoEntity> memoList = memoRepository.findByUserIdAndDateBetween(userId, startDate.toString(), endDate.toString());

        // 사용자의 신체 정보 가져오기
        UserPhysicalEntity physicalInfo = userPhysicalRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("사용자의 신체 정보를 찾을 수 없습니다."));

        // 1주일치 기록을 하나의 문자열로 병합
        String memoContent = memoList.stream()
                .map(memo -> "- " + memo.getDate() + ": " + memo.getContent())
                .reduce("", (a, b) -> a + "\n" + b);

        // GPT에 전달할 프롬프트 생성
        return "사용자의 운동 기록과 신체 정보를 바탕으로 사용자의 몸에 대한 평가를 작성해 주세요.\n\n" +
                "### 사용자 기록 (지난 1주일):\n" +
                memoContent + "\n\n" +
                "### 사용자 신체 정보:\n" +
                "- 키: " + physicalInfo.getHeight() + " cm\n" +
                "- 몸무게: " + physicalInfo.getWeight() + " kg\n" +
                "- 나이: " + physicalInfo.getAge() + " 세\n" +
                "- 체지방률: " + physicalInfo.getBodyFat() + " %\n" +
                "- 골격근량: " + physicalInfo.getMuscleMass() + " kg\n\n" +
                "위 데이터를 기반으로 사용자 몸의 현재 상태를 평가하고, 개선을 위해 필요한 조언을 간단히 제공해 주세요. 50글자 내로 응답해줘";
    }

    private String getRecommendationFromOpenAi(String prompt) {
        try {
            ChatGPTRequest chatRequest = new ChatGPTRequest("gpt-3.5-turbo", prompt);
            ChatGPTResponse chatResponse = restTemplate.postForObject(openAiApiUrl, chatRequest, ChatGPTResponse.class);

            if (chatResponse != null && !chatResponse.getChoices().isEmpty()) {
                return "평가:\n" + chatResponse.getChoices().get(0).getMessage().getContent();
            } else {
                return "평가를 생성하는 데 문제가 발생했습니다.";
            }
        } catch (Exception e) {
            return "평가를 생성하는 동안 오류가 발생했습니다: " + e.getMessage();
        }
    }
}
