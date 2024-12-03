import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userEmailState } from './atoms';

const RecommendContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  max-width: 350px;
  margin: auto;
  background-color: #f7f7f7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
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

const Description = styled.p`
  font-size: 1rem;
  color: #444;
  margin-bottom: 1.5rem;
  text-align: center;
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
  margin-bottom: 1rem;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const MoreInfoButton = styled(Button)`
  background-color: #007700;
  margin-top: 1rem;

  &:hover {
    background-color: #005500;
  }
`;

export default function Recommend() {
  const [recommendation, setRecommendation] = useState({
    diet: "",
    exercise: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const userEmail = useRecoilValue(userEmailState);
  const navigate = useNavigate();

  const getPersonalizedRecommendations = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://54.180.138.98:443/api/recommendations/${userEmail}`);
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
    } finally {
      setIsLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    const storedDate = localStorage.getItem("recommendationDate");
    const today = new Date().toDateString();

    if (storedDate !== today) {
      getPersonalizedRecommendations();
    } else {
      const storedRecommendation = JSON.parse(localStorage.getItem("dailyRecommendation"));
      if (storedRecommendation) setRecommendation(storedRecommendation);
    }
  }, [getPersonalizedRecommendations]);

  return (
    <RecommendContainer>
      <Title>오늘의 맞춤 추천</Title>
      <Description>이 추천은 사용자의 신체 정보와 캘린더에 저장된 기록을 바탕으로 맞춤형으로 제공됩니다. 매일 업데이트된 식단과 운동 추천을 받아보세요.</Description>
      <Button onClick={getPersonalizedRecommendations}>새 추천 받기</Button>
      <RecommendationContainer>
        <RecommendationTitle>식단</RecommendationTitle>
        <RecommendationText>{recommendation.diet || "추천을 받으려면 버튼을 눌러주세요."}</RecommendationText>
      </RecommendationContainer>
      <RecommendationContainer>
        <RecommendationTitle>운동</RecommendationTitle>
        <RecommendationText>{recommendation.exercise || "추천을 받으려면 버튼을 눌러주세요."}</RecommendationText>
      </RecommendationContainer>
      <MoreInfoButton onClick={() => navigate('/Chat', {
        state: {
          initialMessages: [
            { text: `오늘의 추천 식단: ${recommendation.diet}`, isSender: true },
            { text: `오늘의 추천 운동: ${recommendation.exercise}`, isSender: true }
          ]
        }
      })}>  자세하게 궁금해!</MoreInfoButton>

    </RecommendContainer>
  );
}
