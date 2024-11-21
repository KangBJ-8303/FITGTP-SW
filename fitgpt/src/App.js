// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Calendar from './Calendar';
import Main from './Main';
import Chat from './Chat';
import Recommend from './Recommend';
import Signin from './Signin';
import Signup from './Signup';
import Profile from './Profile'; // 프로필 컴포넌트 추가
import Header from './Header';
import BottomNav from './BottomNav';
import { styled, createGlobalStyle } from 'styled-components';
import { RecoilRoot } from 'recoil';

// 전역 스타일 설정
const GlobalStyle = createGlobalStyle`
  body, h1, p {
    margin: 0;
    padding: 0;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-top: 60px; /* 헤더 공간 확보 */
  padding-bottom: 60px; /* 하단 네비게이션 공간 확보 */
`;

function App() {
  return (
    <AppContainer>
      <GlobalStyle /> {/* 전역 스타일 적용 */}
      <BrowserRouter>
        <Header />
        <ContentWrapper>
          <RecoilRoot>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/recommend" element={<Recommend />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} /> {/* 프로필 라우트 추가 */}
          </Routes>
          </RecoilRoot>
        </ContentWrapper>
        <BottomNav />
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;


