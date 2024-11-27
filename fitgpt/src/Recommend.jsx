import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue } from 'recoil';
import { userEmailState } from './atoms';

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

const Subtitle = styled.p`
  font-size: 1rem;
  color: #666;
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

  // Replace with the actual user ID you want to use
  const userEmail = useRecoilValue(userEmailState);

  const getPersonalizedRecommendations = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/recommendations/${userEmail}`);
      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }
      const data = await response.json();
      const newRecommendation = {
        diet: data.diet,
        exercise: data.exercise
      };

      localStorage.setItem("dailyRecommendation", JSON.stringify(newRecommendation));
      localStorage.setItem("recommendationDate", new Date().toDateString());
      setRecommendation(newRecommendation);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  useEffect(() => {
    const storedDate = localStorage.getItem("recommendationDate");
    const today = new Date().toDateString();

    if (storedDate !== today) {
      getPersonalizedRecommendations();
    } else {
      const storedRecommendation = JSON.parse(localStorage.getItem("dailyRecommendation"));
      if (storedRecommendation) setRecommendation(storedRecommendation);
    }
  }, []);

  return (
    <RecommendContainer>
      <Title>오늘의 맞춤 추천</Title>
      <Subtitle>목표: 근육 증가</Subtitle>
      <Button onClick={getPersonalizedRecommendations}>새 추천 받기</Button>
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

