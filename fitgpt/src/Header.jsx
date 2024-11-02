// Header.jsx
import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1rem 0.5rem;
  background-color: #ffffff;
  width: 100%;
  max-width: 400px;
  margin: auto;
  font-family: 'Montserrat', sans-serif;
  height: 70px; /* 고정 높이 설정 */
  box-sizing: border-box;
  overflow: hidden; /* 내용이 넘쳐도 스크롤이나 높이 변화를 방지 */
  margin-bottom: -4rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #003366;
  font-weight: bold;
  margin: 0;
  text-align: center;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding-top: 0.5rem;
  padding-left: 1rem;
`;

const ProfileIcon = styled.div`
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  margin-bottom: 0.3rem;
`;

const PageName = styled.span`
  font-size: 1.2rem;
  color: #333;
  font-weight: bold;
`;

const PageDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin-top: 0.2rem;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden;
  text-overflow: ellipsis; /* 텍스트가 넘칠 경우 ... 표시 */
`;

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
  
    const goToProfile = () => {
      navigate("/profile");
    };
  
    const pageNames = {
      
    };
  
    const currentPage = pageNames[location.pathname];
  
    return (
      <HeaderContainer>
        <Title>FITGPT</Title>
        <SubContainer>
          <ProfileIcon onClick={goToProfile}>
            
          </ProfileIcon>
          {currentPage && (
            <>
              <PageName>{currentPage.name}</PageName>
              <PageDescription>{currentPage.description}</PageDescription>
            </>
          )}
        </SubContainer>
      </HeaderContainer>
    );
  }

export default Header;
