// App.js 수정안
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Calendar from './Calendar';
import Main from './Main';
import Chat from "./Chat";
import Recommend from "./Recommend";
import Signin from "./Signin";
import Signup from "./Signup";
import Header from "./Header";
import BottomNav from "./BottomNav";
import styled from "styled-components";

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
