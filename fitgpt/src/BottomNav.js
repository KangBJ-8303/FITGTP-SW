import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faDumbbell,
  faAppleWhole,
  faChartLine,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

// styled-components를 사용해 스타일 정의
const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 0;
  background-color: #3f51b5;
  position: fixed;
  bottom: 0;
  width: 100%;
  color: white;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const NavItem = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s;

  &.active {
    color: #ff5722;
  }
`;

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("email");

  const handleUserClick = () => {
    if (!userId) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  if (
    location.pathname === "/" ||
    location.pathname === "/workouts" ||
    location.pathname === "/nutrition" ||
    location.pathname === "/report" ||
    location.pathname === "/profile"
  ) {
    return (
      <NavWrapper>
        <NavLink to="/">
          <NavItem
            icon={faHome}
            className={location.pathname === "/" ? "active" : ""}
          />
        </NavLink>
        
        <NavLink to="/workouts">
          <NavItem
            icon={faDumbbell}
            className={location.pathname === "/workouts" ? "active" : ""}
          />
        </NavLink>
        
        <NavLink to="/nutrition">
          <NavItem
            icon={faAppleWhole}
            className={location.pathname === "/nutrition" ? "active" : ""}
          />
        </NavLink>
        
        <NavLink to="/report">
          <NavItem
            icon={faChartLine}
            className={location.pathname === "/report" ? "active" : ""}
          />
        </NavLink>
        
        <div onClick={handleUserClick}>
          <NavItem
            icon={faUser}
            className={location.pathname === "/profile" ? "active" : ""}
          />
        </div>
      </NavWrapper>
    );
  } else {
    return null;
  }
};

export default BottomNav;
