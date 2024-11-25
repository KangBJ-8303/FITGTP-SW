import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userEmailState } from './atoms';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0.5rem;
  background-color: #ffffff;
  width: 100%;
  max-width: 360px;
  margin: auto;
  font-family: 'Noto Sans KR', sans-serif;
  box-sizing: border-box;
`;

const ProfileTitle = styled.h1`
  font-size: 1.5rem;
  color: #003366;
  margin-bottom: 1rem;
  text-align: center;
`;

const InfoContainer = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  padding: 0.75rem;
  background-color: #f9f9f9;
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0;
  border-bottom: 1px solid #e0e0e0;
  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-weight: bold;
  color: #003366;
`;

const Value = styled.input`
  color: #333;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.3rem;
  width: 70%;
  font-size: 1rem;
`;

const SummaryText = styled.div`
  width: 100%;
  background-color: #e8f5ff;
  padding: 0.5rem;
  color: #333;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-top: 0.5rem;
`;

const SaveButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #004080;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    background-color: #003366;
  }
`;

function Profile() {
  const userEmail = useRecoilValue(userEmailState); // Recoil에서 현재 이메일 상태 읽기
  const [userData, setUserData] = useState({
    name: '',
    height: '',
    weight: '',
    age: '',
    memo: [], // 운동 기록 데이터
    evaluation: '', // ChatGPT의 평가 데이터
  });

  // 사용자 정보 받기 (GET)
  const fetchUserInfo = async () => {
    if (!userEmail) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await fetch(`http://54.180.138.98:8080/api/profiles/${userEmail}`);
      if (!response.ok) {
        throw new Error('서버 응답에 문제가 있습니다.');
      }
      const data = await response.json();
      setUserData({
        name: data.name || '',
        height: data.height || '',
        weight: data.weight || '',
        age: data.age || '',
        memo: data.workoutRecord || [], // 운동 기록 초기화
        evaluation: data.evaluation || '', // ChatGPT 평가 데이터
      });
    } catch (error) {
      console.error('사용자 정보를 가져오는 중 오류 발생:', error);
      alert('사용자 정보를 가져올 수 없습니다. 다시 시도해주세요.');
    }
  };

  // 사용자 정보 수정하기 (PUT)
  const updateUserInfo = async () => {
    if (!userEmail) {
      alert('로그인이 필요합니다.');
      return;
    }

    const { name, height, weight, age } = userData;

    try {
      const response = await fetch('http://54.180.138.98:8080/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail,
          name,
          height,
          weight,
          age,
        }),
      });

      if (!response.ok) {
        throw new Error('정보 수정에 실패했습니다.');
      }

      alert('정보가 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error('정보 수정 중 오류 발생:', error);
      alert('정보 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    fetchUserInfo(); // 컴포넌트 마운트 시 사용자 정보 가져오기
  }, []);

  const handleInputChange = (e, field) => {
    setUserData({
      ...userData,
      [field]: e.target.value,
    });
  };

  return (
    <ProfileContainer>
      <ProfileTitle>프로필</ProfileTitle>
      <InfoContainer>
        <InfoItem>
          <Label>이름:</Label>
          <Value
            type="text"
            value={userData.name}
            onChange={(e) => handleInputChange(e, 'name')}
          />
        </InfoItem>
        <InfoItem>
          <Label>신장:</Label>
          <Value
            type="text"
            value={userData.height}
            onChange={(e) => handleInputChange(e, 'height')}
          />
        </InfoItem>
        <InfoItem>
          <Label>체중:</Label>
          <Value
            type="text"
            value={userData.weight}
            onChange={(e) => handleInputChange(e, 'weight')}
          />
        </InfoItem>
        <InfoItem>
          <Label>나이:</Label>
          <Value
            type="text"
            value={userData.age}
            onChange={(e) => handleInputChange(e, 'age')}
          />
        </InfoItem>
      </InfoContainer>
      <SaveButton onClick={updateUserInfo}>정보 수정 저장</SaveButton>
      <SummaryText>
        <strong>운동 기록:</strong>
        <ul>
          {userData.memo.map((record, index) => (
            <li key={index}>{record}</li>
          ))}
        </ul>
        <strong>평가:</strong>
        <p>{userData.evaluation}</p>
      </SummaryText>
    </ProfileContainer>
  );
}

export default Profile;

