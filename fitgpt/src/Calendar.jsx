import React, { useState, useEffect } from 'react';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setNotes] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  useEffect(() => {
    setCurrentMonth(new Date()); // 현재 달을 기본값으로 설정
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
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

    return days.map((date) => (
      <div
        key={date}
        onClick={() => handleDateClick(date.toDateString())}
        style={{
          padding: '10px',
          margin: '5px',
          cursor: 'pointer',
          backgroundColor: selectedDate === date.toDateString() ? 'lightblue' : 'lightgray',
        }}
      >
        {date.getDate()}
      </div>
    ));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>
        {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', marginBottom: '10px' }}>
        {daysOfWeek.map((day) => (
          <div key={day} style={{ fontWeight: 'bold', textAlign: 'center' }}>{day}</div>
        ))}
        {renderCalendar()}
      </div>
      {selectedDate && (
        <div style={{ marginTop: '20px', width: '200px' }}>
          <h3>{selectedDate}의 메모</h3>
          <textarea
            value={notes[selectedDate] || ''}
            onChange={handleNoteChange}
            placeholder="내용을 입력하세요..."
            style={{ width: '100%', height: '100px' }}
          />
        </div>
      )}
    </div>
  );
}
