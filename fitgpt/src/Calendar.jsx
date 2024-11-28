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
  margin: 1rem auto; /* 세로 여백과 수평 가운데 정렬 */
  display: block; /* 수평 가운데 정렬을 위해 block으로 설정 */
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


export default function Calendar() {
  const userEmail = useRecoilValue(userEmailState);
    const [selectedDate, setSelectedDate] = useState(null);
    const [notes, setNotes] = useState({});
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isModalVisible, setModalVisible] = useState(false);
    const [noteText, setNoteText] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    const today = new Date();
  
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    useEffect(() => {
      if (selectedDate) {
        fetchMemoData();
      }
    }, [selectedDate]);
  
    const fetchMemoData = async () => {
      setLoading(true);
      setErrorMessage('');
      try {
        const formattedDate = formatDate(new Date(selectedDate));
        const response = await fetch(`http://54.180.138.98:443/api/memos/${userEmail}/${formattedDate}`);
        console.log(`Formatted Date: ${formattedDate}`);
  
        if (response.ok) {
          const content = await response.text();
          setNoteText(content);
          setNotes((prevNotes) => ({
            ...prevNotes,
            [formattedDate]: content,
          }));
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
  
    const saveNote = async () => {
      setErrorMessage('');
      try {
        const formattedDate = formatDate(new Date(selectedDate));
        const response = await fetch(`http://54.180.138.98:443/api/memos/${userEmail}/${formattedDate}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: formattedDate,
            content: noteText,
          }),
        });
  
        if (response.ok) {
          setNotes((prevNotes) => ({
            ...prevNotes,
            [formattedDate]: noteText,
          }));
          alert('메모가 저장되었습니다.');
          setModalVisible(false);
        } else {
          throw new Error('메모 저장 실패');
        }
      } catch (error) {
        console.error('메모 저장 오류:', error);
        setErrorMessage('메모를 저장하는 중 오류가 발생했습니다.');
      }
    };
  
    const handleDateClick = (date) => {
      setSelectedDate(date);
      setModalVisible(true);
      setNoteText(notes[date] || '');
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
  
      return days.map((date, index) =>
        date ? (
          <Day
            key={index}
            onClick={() => handleDateClick(date.toDateString())}
            isSelected={selectedDate === date.toDateString()}
            isToday={date.toDateString() === today.toDateString()}
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
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="운동이나 식단을 작성해주세요"
            />
            {loading && <div>로딩 중</div>}
            {errorMessage && <div>{errorMessage}</div>}
            <SaveButton onClick={saveNote}>저장</SaveButton>
          </Modal>
        )}
      </CalendarContainer>
    );
  }
  
