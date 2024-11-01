// Main.jsx
import React from "react";
import styled from "styled-components";
import MainImage from "./asset/러닝.jpeg";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  width: 100%;
  max-width: 400px; /* 모바일 규격에 맞춘 너비 설정 */
  height: 100%;
  margin: 0 auto;
  font-family: 'Noto Sans KR', sans-serif;
  position: relative;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${MainImage});
  background-size: cover;
  background-position: center;
  filter: brightness(0.7);
  z-index: 1;
`;

const TextContainer = styled.div`
  z-index: 2;
  text-align: center;
  color: white;
  padding: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const RunButton = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: #004080;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #003366;
  }
`;

function Main() {
  const navigate = useNavigate();

  const goToChat = () => {
    navigate("/chat");
  };

  return (
    <Container>
      <BackgroundImage />
      <TextContainer>
        <Title>나만의 맞춤형 트레이너</Title>
        <Subtitle>AI 트레이너와 실시간으로 대화하며 <br></br>나만의 맞춤형 운동 지도를 받아보세요.</Subtitle>
        <RunButton onClick={goToChat}>채팅 시작</RunButton>
      </TextContainer>
    </Container>
  );
}

export default Main;
