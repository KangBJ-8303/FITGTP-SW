// Calendar.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  max-width: 360px; /* 모바일 규격에 맞춘 너비 */
  margin: auto;
  background-color: #f7f7f7;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #003366;
  margin-bottom: 1rem;
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
  background-color: ${({ isSelected }) => (isSelected ? 'lightblue' : 'lightgray')};
  color: ${({ isToday }) => (isToday ? '#004080' : '#333')};
  font-weight: ${({ isToday }) => (isToday ? 'bold' : 'normal')};
  &:hover {
    background-color: #d0e4f7;
  }
`;

const Modal = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(${({ isVisible }) => (isVisible ? '0' : '100%')});
  height: 50vh; /* 반쯤 올라오는 높이 */
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  width: 100%;
  max-width: 360px; /* 모바일 규격에 맞춘 너비 */
  transition: transform 0.3s ease-in-out;
`;

const NoteTitle = styled.h3`
  font-size: 1.2rem;
  color: #003366;
  text-align: center;
  margin-bottom: 1rem;
`;

const NoteInput = styled.textarea`
  width: calc(100% - 20px); /* 모달 패딩과 맞춰 텍스트 입력 창 너비 조정 */
  height: 60px;
  padding: 10px;
  font-size: 0.9rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  box-sizing: border-box;
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

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setNotes] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setCurrentMonth(new Date());
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setModalVisible(true); // 날짜 클릭 시 모달 표시
  };

  const handleNoteChange = (e) => {
    setNotes({
      ...notes,
      [selectedDate]: e.target.value,
    });
  };

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = getDaysInMonth(year, month);
    const today = new Date().toDateString();

    return days.map((date) => (
      <Day
        key={date}
        onClick={() => handleDateClick(date.toDateString())}
        isSelected={selectedDate === date.toDateString()}
        isToday={date.toDateString() === today}
      >
        {date.getDate()}
      </Day>
    ));
  };

  return (
    <CalendarContainer>
      <Title>
        {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
      </Title>
      <DaysGrid>
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <DayBox key={day}>{day}</DayBox>
        ))}
        {renderCalendar()}
      </DaysGrid>

      {/* 반쯤 올라오는 모달 */}
      <Modal isVisible={isModalVisible}>
        <CloseButton onClick={() => setModalVisible(false)}>&times;</CloseButton>
        <NoteTitle>{selectedDate}의 메모</NoteTitle>
        <NoteInput
          value={notes[selectedDate] || ''}
          onChange={handleNoteChange}
          placeholder="내용을 입력하세요..."
        />
      </Modal>
    </CalendarContainer>
  );
}
