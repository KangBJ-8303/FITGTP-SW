// Main.jsx
import React from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";
import styled from "styled-components";

const MainContent = styled.main`
  padding: 1rem;
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 6vh;
`;

const WelcomeText = styled.h2`
  font-size: 1.5rem;
  color: #3f51b5;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #333;
  margin: 1rem 0;
`;

function Main() {
  return (
    <>
      <Header />
      <MainContent>
        <WelcomeText>Welcome to HealthCare App</WelcomeText>
        <Description>Track your health, monitor workouts, and manage your nutrition.</Description>
      </MainContent>
      <BottomNav />
    </>
  );
}

export default Main;
