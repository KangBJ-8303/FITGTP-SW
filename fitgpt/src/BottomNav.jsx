// BottomNav.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faDumbbell, faAppleWhole, faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 0;
  background-color: #fff;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 0;
  width: 100%;
  color: rgba(128, 128, 128, 0.623);
  max-width: 400px;
  margin: auto;
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
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("email");

  const handleUserClick = () => {
    navigate(userId ? "/profile" : "/login");
  };

  return (
    <NavWrapper>
      <NavLink to="/" className={location.pathname === "/" ? "active" : ""}>
        <FontAwesomeIcon icon={faHome} />
      </NavLink>
      <NavLink to="/workouts" className={location.pathname === "/workouts" ? "active" : ""}>
        <FontAwesomeIcon icon={faDumbbell} />
      </NavLink>
      <NavLink to="/nutrition" className={location.pathname === "/nutrition" ? "active" : ""}>
        <FontAwesomeIcon icon={faAppleWhole} />
      </NavLink>
      <div onClick={handleUserClick} style={{ cursor: "pointer" }}>
        <FontAwesomeIcon icon={faUser} className={location.pathname === "/profile" ? "active" : ""} />
      </div>
    </NavWrapper>
  );
};

export default BottomNav;
