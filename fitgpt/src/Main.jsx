import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background-color: #ffffff;
  width: 100%;
  max-width: 400px;
  margin: auto;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif; /* Noto Sans KR 폰트 적용 */
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 3rem;
  line-height: 1.5;
  padding: 0 1rem;
`;

const CircleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 5rem;
`;

const CircleButton = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #004080;
  color: white;
  border-radius: 50%;
  font-size: 1rem;
  text-align: center;
  padding: 0.5rem;
  cursor: pointer;
  line-height: 1.4; /* 텍스트 간격 조정 */
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Main = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>FITGPT - 당신의 맞춤형 피트니스 파트너</Title>
      <Description>
        FITGPT는 당신의 피트니스 여정을 더욱 스마트하게 도와드립니다.
        AI가 함께하는 맞춤형 트레이닝, 상세한 운동 기록 관리, 
        그리고 최적의 운동 추천 기능까지! 
        <br/><br/>
        건강한 라이프 스타일을 추구하는 모든 분들을 위한 필수 앱입니다.
        오늘부터 FITGPT와 함께 목표를 달성해보세요!
      </Description>
      <CircleContainer>
        <CircleButton size={150} onClick={() => navigate("/Write")}>
          내가 운동했던 기록을 캘린더로 한눈에!
        </CircleButton>
        <CircleButton size={120} onClick={() => navigate("/Chat")}>
          똑똑한 맞춤형 트레이너와 채팅
        </CircleButton>
        <CircleButton size={90} onClick={() => navigate("/Recommend")}>
          추천 기능까지
        </CircleButton>
      </CircleContainer>
    </Container>
  );
};

export default Main;
