// Calendar.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  max-width: 400px;
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

const NoteContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 300px;
  text-align: center;
`;

const NoteTitle = styled.h3`
  font-size: 1.2rem;
  color: #003366;
`;

const NoteInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 0.9rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
`;

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setNotes] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  useEffect(() => {
    setCurrentMonth(new Date());
  }, []);

  const handleDateClick = (date) => setSelectedDate(date);

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
        {daysOfWeek.map((day) => (
          <DayBox key={day}>{day}</DayBox>
        ))}
        {renderCalendar()}
      </DaysGrid>
      {selectedDate && (
        <NoteContainer>
          <NoteTitle>{selectedDate}의 메모</NoteTitle>
          <NoteInput
            value={notes[selectedDate] || ''}
            onChange={handleNoteChange}
            placeholder="내용을 입력하세요..."
          />
        </NoteContainer>
      )}
    </CalendarContainer>
  );
}
