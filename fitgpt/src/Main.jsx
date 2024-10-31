import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { FaBars } from 'react-icons/fa'; // 햄버거 아이콘
import './index.css'; // CSS 스타일을 포함한 파일

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app">
      {/* 상단 햄버거 메뉴바 */}
      <header className="app-header">
        <FaBars className="menu-icon" onClick={toggleSidebar} />
        <h1>FITGPT</h1>
      </header>

      {/* 사이드바 */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <p onClick={() => setSidebarOpen(false)}>기능 1: 헬스 기록</p>
        <p onClick={() => setSidebarOpen(false)}>기능 2: 운동 루틴</p>
        <p onClick={() => setSidebarOpen(false)}>기능 3: 영양 관리</p>
      </div>

      {/* 메인 콘텐츠: 원형 버튼들 */}
      <main className="main-content">
        <button className="circle-button large">자취생 레시피</button>
        <button className="circle-button medium">중고거래 사이트</button>
        <button className="circle-button small">학과 익명 커뮤니티</button>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
