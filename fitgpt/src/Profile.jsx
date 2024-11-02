// Profile.jsx
import React from 'react';
import styled from 'styled-components';

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
  /* height 속성 제거 */
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
  padding: 0.75rem; /* 패딩을 줄여 컴팩트하게 */
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

const Value = styled.span`
  color: #333;
`;

const SummaryText = styled.div`
  width: 100%;
  background-color: #e8f5ff;
  padding: 0.5rem; /* 패딩을 줄여 높이 조정 */
  color: #333;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-top: 0.5rem; /* 위쪽 여백을 줄임 */
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
          <Value>{userData.name}</Value>
        </InfoItem>
        <InfoItem>
          <Label>신장:</Label>
          <Value>{userData.height}</Value>
        </InfoItem>
        <InfoItem>
          <Label>체중:</Label>
          <Value>{userData.weight}</Value>
        </InfoItem>
        <InfoItem>
          <Label>나이:</Label>
          <Value>{userData.age}</Value>
        </InfoItem>
      </InfoContainer>
      <SummaryText>
        <strong>최근 운동 기록:</strong>
        <ul>
          {userData.workoutRecords.map((record, index) => (
            <li key={index}>
              {record.date}: {record.activity} ({record.duration})
            </li>
          ))}
        </ul>
      </SummaryText>
      <SummaryText>
        {"홍길동님은 최근 일주일간 꾸준히 운동을 유지하며, 근력과 유산소 운동을 균형 있게 수행하고 있습니다. 현재 체중에는 큰 변화가 없지만, 체력과 근지구력은 안정적으로 향상 중입니다. 꾸준한 운동과 더불어 스트레칭을 포함해 유연성도 함께 관리하시면 건강 유지에 큰 도움이 될 것입니다."}
      </SummaryText>
    </ProfileContainer>
  );
}

export default Profile;
