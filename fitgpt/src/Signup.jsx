import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const Button = styled.button`
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

function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 현재 단계 관리
  const [info, setInfo] = useState({
    userName: '',
    userEmail: '',
    userPassword: '',
    gender: '',
    height: '',
    weight: '',
    age: '',
    bodyFat: '',
    muscleMass: '',
  })

  const handleNext = () => {
    if (step === 1) setStep(2);
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://54.180.138.98:8080/api/user/register', {
        ...info,
      });
      if (response.status === 200) {
        alert("회원가입이 완료되었습니다.");
        navigate("/signin"); // 회원가입 성공 시 로그인 페이지로 이동
      }
    } catch (error) {
      console.error("회원가입 실패:", error.response || error);
      if (error.response) {
        alert(`회원가입 실패: ${error.response.data.message || "알 수 없는 오류"}`);
      } else {
        alert("회원가입에 실패했습니다. 네트워크 상태를 확인해주세요.");
      }
    }
  };
  

  return (
    <Container>
      <Title>회원가입</Title>
      {step === 1 && (
        <>
          <Input
            type="text"
            placeholder="아이디"
            value={info.userName}
            onChange={(e) => setInfo({ ...info, userName: e.target.value })}
          />
          <Input
            type="email"
            placeholder="이메일"
            value={info.userEmail}
            onChange={(e) => setInfo({ ...info, userEmail: e.target.value })}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={info.userPassword}
            onChange={(e) => setInfo({ ...info, userPassword: e.target.value })}
          />
          <Button onClick={handleNext}>다음</Button>
        </>
      )}
      {step === 2 && (
        <>
          <Input
            type="text"
            placeholder="성별 (남/여)"
            value={info.gender}
            onChange={(e) => setInfo({ ...info, gender: e.target.value })}
          />
          <Input
            type="number"
            placeholder="키 (cm)"
            value={info.height}
            onChange={(e) => setInfo({ ...info, height: e.target.value })}
          />
          <Input
            type="number"
            placeholder="몸무게 (kg)"
            value={info.weight}
            onChange={(e) => setInfo({ ...info, weight: e.target.value })}
          />
          <Input
            type="number"
            placeholder="나이"
            value={info.age}
            onChange={(e) => setInfo({ ...info, age: e.target.value })}
          />
          <Input
            type="number"
            placeholder="체지방률 (%)"
            value={info.bodyFat}
            onChange={(e) => setInfo({ ...info, bodyFat: e.target.value })}
          />
          <Input
            type="number"
            placeholder="골격근량 (kg)"
            value={info.muscleMass}
            onChange={(e) => setInfo({ ...info, muscleMass: e.target.value })}
          />
          <Button onClick={handleSignup}>회원가입</Button>
        </>
      )}
    </Container>
  );
}

export default Signup;

