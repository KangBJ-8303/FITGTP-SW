import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  width: 100%;
  max-width: 400px;
  height: 100%;
  margin: 0 auto;
  font-family: 'Noto Sans KR', sans-serif;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 80%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const SigninButton = styled.button`
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

function Signin() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleSignin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          userEmail,
          userPassword,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("로그인 성공:", result);
        // 로그인 성공 시 이동할 경로
        navigate("/");
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <Title>로그인</Title>
      <Input
        type="email"
        placeholder="이메일"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
      />
      <SigninButton onClick={handleSignin}>로그인</SigninButton>
    </Container>
  );
}

export default Signin;


