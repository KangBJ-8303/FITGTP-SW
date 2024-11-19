import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userEmailState } from './atoms';

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  max-width: 360px;
  margin: auto;
  background-color: #f7f7f7;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #003366;
  margin-bottom: 1rem;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 360px;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: transparent;
  color: #003366;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: #00509e;
  }
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-bottom: 10px;
  width: 100%;
`;

const DayBox = styled.div`
  font-weight: bold;
  text-align: center;
  color: #555;
`;

const Day = styled.div`
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
  background-color: ${({ isSelected, hasNotes }) =>
    isSelected ? 'lightblue' : hasNotes ? 'gray' : 'lightgray'};
  color: ${({ isToday }) => (isToday ? '#004080' : '#333')};
  font-weight: ${({ isToday }) => (isToday ? 'bold' : 'normal')};
  &:hover {
    background-color: #d0e4f7;
  }
`;

const EmptyDay = styled.div`
  padding: 10px;
  margin: 5px;
  background-color: transparent;
`;

const Modal = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(${({ isVisible }) => (isVisible ? '0' : '100%')});
  height: 50vh;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  width: 100%;
  max-width: 360px;
  transition: transform 0.3s ease-in-out;
`;

const NoteTitle = styled.h3`
  font-size: 1.2rem;
  color: #003366;
  text-align: center;
  margin-bottom: 1rem;
`;

const NoteInput = styled.textarea`
  width: calc(100% - 20px);
  height: 60px;
  padding: 10px;
  font-size: 0.9rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #888;
  cursor: pointer;
`;

const SaveButton = styled.button`
  margin-top: 1rem;
  padding: 8px 16px;
  background-color: #00509e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #003366;
  }
`;

const FeedbackMessage = styled.div`
  color: #d9534f;
  margin-top: 1rem;
  text-align: center;
`;

function Calendar() {
  const userEmail = useRecoilValue(userEmailState); // Recoil에서 userEmail 가져오기
  const [notes, setNotes] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // userEmail이 있으면 메모를 가져오기
    if (userEmail && selectedDate) {
      fetchMemoData();
    }
  }, [userEmail, selectedDate]);

  const fetchMemoData = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`http://localhost:8080/api/memos/${userEmail}/${selectedDate}`);
      if (response.ok) {
        const data = await response.json();
        if (data.notes) {
          setNoteText(data.notes.join('\n'));
          setNotes((prevNotes) => ({
            ...prevNotes,
            [selectedDate]: data.notes,
          }));
        }
      } else {
        throw new Error('메모를 가져오는 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('메모를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleNoteChange = (e) => {
    setNoteText(e.target.value);
  };

  const saveNote = async () => {
    const newNotes = noteText.split('\n').filter(note => note.trim() !== '');
    setErrorMessage('');
    try {
      const response = await fetch(`http://localhost:8080/api/memos/${userEmail}/${selectedDate}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: userEmail,  // 로그인된 사용자 이메일
          date: selectedDate,    // 선택한 날짜
          content: noteText,     // 메모 내용
        }),
      });

      if (response.ok) {
        setNotes((prevNotes) => ({
          ...prevNotes,
          [selectedDate]: newNotes,
        }));
        setNoteText('');
        alert('메모가 저장되었습니다.');
      } else {
        throw new Error('메모 저장 실패');
      }
    } catch (error) {
      console.error('메모 저장 오류:', error);
      setErrorMessage('메모를 저장하는 중 오류가 발생했습니다.');
    }
  };

  const renderCalendar = () => {
    // 달력 날짜 렌더링 로직 (가짜 데이터 예시)
    const days = [];
    for (let i = 1; i <= 30; i++) {
      days.push(
        <Day
          key={i}
          isSelected={selectedDate === i}
          onClick={() => setSelectedDate(i)}
          hasNotes={notes[i] && notes[i].length > 0}
        >
          {i}
        </Day>
      );
    }
    return days;
  };

  return (
    <CalendarContainer>
      <Title>{userEmail ? `${userEmail}님의 일정` : '로그인이 필요한 기능입니다.'}</Title>
      <DaysGrid>{renderCalendar()}</DaysGrid>
      {userEmail && selectedDate && (
        <>
          {loading && <div>로딩 중...</div>}
          {errorMessage && <FeedbackMessage>{errorMessage}</FeedbackMessage>}
          <textarea
            value={noteText}
            onChange={handleNoteChange}
            placeholder="운동이나 식단을 작성해주세요"
          />
          <SaveButton onClick={saveNote}>저장</SaveButton>
        </>
      )}
    </CalendarContainer>
  );
}

export default Calendar;


