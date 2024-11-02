package com.example.fitgpt.controller;

import com.example.fitgpt.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/exercise/{userId}")
    public String getExerciseRecommendation(@PathVariable Long userId) {
        return recommendationService.getExerciseRecommendation(userId);
    }

    @GetMapping("/diet/{userId}")
    public String getDietRecommendation(@PathVariable Long userId) {
        return recommendationService.getDietRecommendation(userId);
    }
}
