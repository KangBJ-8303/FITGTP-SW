import React, { useState } from "react";
import styled from "styled-components";

const RecommendContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  max-width: 350px;
  margin: auto;
  background-color: #f7f7f7;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #003366;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #004080;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1.5rem;

  &:hover {
    background-color: #003366;
  }
`;

const RecommendationContainer = styled.div`
  width: 100%;
  max-width: 300px;
  text-align: center;
`;

const RecommendationTitle = styled.h3`
  font-size: 1.2rem;
  color: #003366;
  margin-bottom: 0.5rem;
`;

const RecommendationText = styled.p`
  font-size: 1rem;
  color: #333;
  background-color: #d0e4f7;
  padding: 10px;
  border-radius: 5px;
`;

export default function Recommend() {
  const [recommendation, setRecommendation] = useState({
    diet: "",
    exercise: ""
  });

  const getRecommendations = () => {
    const diets = [
      "근육 증가를 위한 고단백 식단",
      "체중 감량을 위한 저탄수화물 식단",
      "체중 유지를 위한 균형 잡힌 식단",
      "건강한 삶을 위한 채식 식단"
    ];
    
    const exercises = [
      "30분 유산소 운동",
      "45분 근력 운동",
      "15분 요가 세션",
      "1시간 자전거 타기"
    ];

    const randomDiet = diets[Math.floor(Math.random() * diets.length)];
    const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];

    setRecommendation({
      diet: randomDiet,
      exercise: randomExercise
    });
  };

  return (
    <RecommendContainer>
      <Title>오늘의 추천</Title>
      <Button onClick={getRecommendations}>추천 받기</Button>
      <RecommendationContainer>
        <RecommendationTitle>식단</RecommendationTitle>
        <RecommendationText>{recommendation.diet || "추천을 받으려면 버튼을 눌러주세요."}</RecommendationText>
      </RecommendationContainer>
      <RecommendationContainer>
        <RecommendationTitle>운동</RecommendationTitle>
        <RecommendationText>{recommendation.exercise || "추천을 받으려면 버튼을 눌러주세요."}</RecommendationText>
      </RecommendationContainer>
    </RecommendContainer>
  );
}
