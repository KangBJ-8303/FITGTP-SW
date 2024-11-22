package com.example.fitgpt.controller;

import com.example.fitgpt.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/{userEmail}")
    public Map<String, String> getRecommendations(@PathVariable String userEmail) {
        // 각각의 추천 결과 가져오기
        String exerciseRecommendation = recommendationService.getExerciseRecommendation(userEmail);
        String dietRecommendation = recommendationService.getDietRecommendation(userEmail);

        // JSON 형식의 Map 객체 생성
        Map<String, String> response = new HashMap<>();
        response.put("exercise", exerciseRecommendation);
        response.put("diet", dietRecommendation);

        // JSON 형식으로 반환
        return response;
    }
}
