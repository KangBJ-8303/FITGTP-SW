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
`;

const Title = styled.h1`
  font-size: 1.2rem;
  margin: 0 auto;
`;

const MenuIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
`;

function Header() {
  return (
    <HeaderWrapper>
      <MenuIcon>
        <FontAwesomeIcon icon={faBars} />
      </MenuIcon>
      <Title>HealthCare</Title>
    </HeaderWrapper>
  );
}

export default Header;
