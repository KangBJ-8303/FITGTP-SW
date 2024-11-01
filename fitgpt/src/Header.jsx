// Header.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #3f51b5;
  color: white;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  margin: 0 auto;
`;

const MenuIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-250px")}; /* 사이드바 열림/닫힘 상태 */
  width: 250px;
  height: 100vh;
  background-color: #3f51b5;
  color: white;
  padding: 1rem;
  transition: left 0.3s ease;
  z-index: 9;
`;

const SidebarLink = styled(Link)`
  display: block;
  color: white;
  padding: 0.5rem 0;
  text-decoration: none;
  font-size: 1rem;
  &:hover {
    color: #ddd;
  }
`;

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <HeaderWrapper>
        <MenuIcon onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </MenuIcon>
        <Title>FITGPT</Title>
      </HeaderWrapper>

      <Sidebar isOpen={isSidebarOpen}>
        <SidebarLink to="/" onClick={toggleSidebar}>Home</SidebarLink>
        <SidebarLink to="/Write" onClick={toggleSidebar}>Calendar</SidebarLink>
        <SidebarLink to="/Chat" onClick={toggleSidebar}>Chat</SidebarLink>
        <SidebarLink to="/Recommend" onClick={toggleSidebar}>Recommendations</SidebarLink>
        <SidebarLink to="/Profile" onClick={toggleSidebar}>Profile</SidebarLink>
      </Sidebar>
    </>
  );
}

export default Header;
