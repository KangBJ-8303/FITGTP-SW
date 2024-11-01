// BottomNav.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCalendarAlt, faComments, faStar, faUser } from "@fortawesome/free-solid-svg-icons"; // 사용자 아이콘 추가
import styled from "styled-components";

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 0;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  text-align: center;
  font-size: 1.5rem;
  &.active {
    color: #3f51b5;
  }
`;

const BottomNav = () => {
  const location = useLocation();

  return (
    <NavWrapper>
      <NavLink to="/" className={location.pathname === "/" ? "active" : ""}>
        <FontAwesomeIcon icon={faHome} />
      </NavLink>
      <NavLink to="/Write" className={location.pathname === "/Write" ? "active" : ""}>
        <FontAwesomeIcon icon={faCalendarAlt} />
      </NavLink>
      <NavLink to="/Chat" className={location.pathname === "/Chat" ? "active" : ""}>
        <FontAwesomeIcon icon={faComments} />
      </NavLink>
      <NavLink to="/Recommend" className={location.pathname === "/Recommend" ? "active" : ""}>
        <FontAwesomeIcon icon={faStar} />
      </NavLink>
      <NavLink to="/Profile" className={location.pathname === "/Profile" ? "active" : ""}> {/* 프로필 페이지 링크 추가 */}
        <FontAwesomeIcon icon={faUser} /> {/* 프로필 아이콘 */}
      </NavLink>
    </NavWrapper>
  );
};

export default BottomNav;
