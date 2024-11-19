import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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

export default function Calendar({ userId }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setNotes] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setCurrentMonth(new Date());
  }, []);

  const handleDateClick = async (date) => {
    setSelectedDate(date);
    setNoteText('');
    setModalVisible(true);
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(`http://localhost:8080/api/memos/${userId}/${date}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.notes) {
          setNoteText(data.notes.join('\n'));
          setNotes((prevNotes) => ({
            ...prevNotes,
            [date]: data.notes,
          }));
        }
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('메모 불러오기 오류:', error);
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

    const requestBody = {
      userEmail: userId,  // userId를 userEmail로 사용함
      date: selectedDate,
      content: newNotes,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/memos/${userId}/${selectedDate}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setNotes((prevNotes) => ({
        ...prevNotes,
        [selectedDate]: newNotes,
      }));
      setModalVisible(false);
    } catch (error) {
      console.error('메모 저장 오류:', error);
      setErrorMessage('메모를 저장하는 중 오류가 발생했습니다.');
    }
  };

  const getDaysInMonth = (year, month) => {
    const days = [];
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDate; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = getDaysInMonth(year, month);
    const today = new Date().toDateString();

    return days.map((date, index) =>
      date ? (
        <Day
          key={index}
          onClick={() => handleDateClick(date.toDateString())}
          isSelected={selectedDate === date.toDateString()}
          isToday={date.toDateString() === today}
          hasNotes={Boolean(notes[date.toDateString()])}
        >
          {date.getDate()}
        </Day>
      ) : (
        <EmptyDay key={index} />
      )
    );
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <CalendarContainer>
      <NavigationButtons>
        <Button onClick={handlePreviousMonth}>&lt;</Button>
        <Title>
          {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
        </Title>
        <Button onClick={handleNextMonth}>&gt;</Button>
      </NavigationButtons>
      <DaysGrid>
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <DayBox key={day}>{day}</DayBox>
        ))}
        {renderCalendar()}
      </DaysGrid>

      {isModalVisible && (
        <Modal isVisible={isModalVisible}>
          <CloseButton onClick={() => setModalVisible(false)}>&times;</CloseButton>
          <NoteTitle>운동, 식단 기록하기</NoteTitle>
          <NoteInput
            value={noteText}
            onChange={handleNoteChange}
            placeholder="운동 및 식단 내용을 입력하세요."
          />
          <SaveButton onClick={saveNote}>저장</SaveButton>
          {loading && <FeedbackMessage>로딩 중...</FeedbackMessage>}
          {errorMessage && <FeedbackMessage>{errorMessage}</FeedbackMessage>}
        </Modal>
      )}
    </CalendarContainer>
  );
}

