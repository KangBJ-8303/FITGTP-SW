// App.js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Calendar from './Calendar';
import Main from './Main';
import Chat from "./Chat";
import Recommend from "./Recommend";
import Signin from "./Signin";
import Signup from "./Signup";
import Header from "./Header"; // Header 컴포넌트 추가
import BottomNav from "./BottomNav"; // BottomNav 컴포넌트 추가
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto; /* 스크롤 가능 */
`;

function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <Header />
        <ContentWrapper>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Write" element={<Calendar />} />
            <Route path="/Chat" element={<Chat />} />
            <Route path="/Recommend" element={<Recommend />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
        </ContentWrapper>
        <BottomNav />
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
