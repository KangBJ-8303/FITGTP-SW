// Signin.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userEmailState } from './atoms'; // userEmail 상태를 import

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
  const setUserEmail = useSetRecoilState(userEmailState); // Recoil 상태 업데이트용 훅
  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async () => {
    try {
      const response = await fetch('http://54.180.138.98:8080/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, userPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserEmail(userEmail); // 로그인 성공 시 Recoil 상태에 userEmail 저장
        navigate('/'); // 로그인 후 캘린더 페이지로 이동
      } else {
        throw new Error('로그인 실패');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Container>
      <Title>로그인</Title>
      <Input
        type="email"
        placeholder="이메일"
        value={userEmail}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <SigninButton onClick={handleSignin}>로그인</SigninButton>
    </Container>
  );
}

export default Signin;



