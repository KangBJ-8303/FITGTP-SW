// Profile.jsx
import React from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1.5rem;
  background-color: #ffffff;
  max-width: 400px;
  margin: auto;
  font-family: 'Noto Sans KR', sans-serif;
`;

const ProfileTitle = styled.h1`
  font-size: 1.5rem;
  color: #003366;
  margin-bottom: 1rem;
`;

const InfoContainer = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  background-color: #f7f7f7;
  margin-bottom: 1rem;
`;

const InfoItem = styled.p`
  font-size: 1rem;
  color: #333;
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-between;
`;

const Label = styled.span`
  font-weight: bold;
  color: #003366;
`;

const SummaryText = styled.p`
  font-size: 0.95rem;
  color: #333;
  margin-top: 1rem;
  line-height: 1.5;
`;

function Profile() {
  // 샘플 데이터, 실제 데이터는 백엔드 또는 상태관리에서 가져올 수 있습니다.
  const userData = {
    name: '홍길동',
    height: '175cm',
    weight: '68kg',
    age: '29세',
    workoutRecords: [
      { date: '2024-11-01', activity: '하체 운동', duration: '1시간' },
      { date: '2024-11-02', activity: '상체 운동', duration: '45분' },
    ],
  };

  return (
    <ProfileContainer>
      <ProfileTitle>프로필</ProfileTitle>
      <InfoContainer>
        <InfoItem>
          <Label>이름:</Label>
          <span>{userData.name}</span>
        </InfoItem>
        <InfoItem>
          <Label>신장:</Label>
          <span>{userData.height}</span>
        </InfoItem>
        <InfoItem>
          <Label>체중:</Label>
          <span>{userData.weight}</span>
        </InfoItem>
        <InfoItem>
          <Label>나이:</Label>
          <span>{userData.age}</span>
        </InfoItem>
      </InfoContainer>
      <SummaryText>
        최근 운동 기록:
        <br />
        {userData.workoutRecords.map((record, index) => (
          <span key={index}>
            {record.date}: {record.activity} ({record.duration})
            <br />
          </span>
        ))}
      </SummaryText>
      <SummaryText>
        {`${userData.name}님은 현재 ${userData.height}의 신장과 ${userData.weight}의 체중을 유지하고 있습니다.
        꾸준한 운동과 함께 건강한 생활을 이어가고 있습니다.`}
      </SummaryText>
    </ProfileContainer>
  );
}

export default Profile;
