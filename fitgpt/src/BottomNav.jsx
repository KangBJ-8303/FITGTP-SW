// BottomNav.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendar, faComments, faChartBar, faUser } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const NavWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #ddd;
  max-width: 400px;
  margin: 0 auto;
  font-family: 'Noto Sans KR', sans-serif;
`;

const NavItem = styled(Link)`
  color: ${({ active }) => (active ? '#333' : '#888')};
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  font-weight: ${({ active }) => (active ? '700' : '400')}; // 선택된 항목 강조
`;

function BottomNav() {
  const location = useLocation();

  return (
    <NavWrapper>
      <NavItem to="/" active={location.pathname === '/'}>
        <FontAwesomeIcon icon={faHome} />
        <span>홈</span>
      </NavItem>
      <NavItem to="/calendar" active={location.pathname === '/calendar'}>
        <FontAwesomeIcon icon={faCalendar} />
        <span>캘린더</span>
      </NavItem>
      <NavItem to="/chat" active={location.pathname === '/chat'}>
        <FontAwesomeIcon icon={faComments} />
        <span>채팅</span>
      </NavItem>
      <NavItem to="/recommend" active={location.pathname === '/recommend'}>
        <FontAwesomeIcon icon={faChartBar} />
        <span>추천</span>
      </NavItem>
      <NavItem to="/profile" active={location.pathname === '/profile'}>
        <FontAwesomeIcon icon={faUser} />
        <span>프로필</span>
      </NavItem>
    </NavWrapper>
  );
}

export default BottomNav;
