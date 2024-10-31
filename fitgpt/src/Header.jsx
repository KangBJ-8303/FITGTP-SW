// Header.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";


const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #3f51b5;
  color: white;
  position: relative;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  margin: 0;
`;

const MenuIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  width: 70%;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  padding-top: 2rem;
  transition: left 0.3s;
  z-index: 1000;
`;

const SidebarLink = styled.a`
  display: block;
  padding: 1rem;
  color: #3f51b5;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    background-color: #f0f0f0;
  }
`;

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderWrapper>
      <MenuIcon onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </MenuIcon>
      <Title>HealthCare</Title>

      {/* 사이드바 메뉴 */}
      <Sidebar isOpen={isOpen}>
        <SidebarLink href="/">Home</SidebarLink>
        <SidebarLink href="/workouts">Workouts</SidebarLink>
        <SidebarLink href="/nutrition">Nutrition</SidebarLink>
        <SidebarLink href="/report">Report</SidebarLink>
        <SidebarLink href="/profile">Profile</SidebarLink>
      </Sidebar>
    </HeaderWrapper>
  );
}

export default Header;
