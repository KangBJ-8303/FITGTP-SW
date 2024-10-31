// Header.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #3f51b5;
  color: white;
`;

const BackButton = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  margin: 0;
`;

const CartIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
`;

function Header() {
  const locationNow = useLocation();
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("email");

  const goBack = () => navigate(-1);
  const handleConnectCart = () => {
    navigate(userId ? "/cart" : "/login");
  };

  return (
    <HeaderWrapper>
      <BackButton onClick={goBack}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </BackButton>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <Title>HealthCare</Title>
      </Link>
      <CartIcon onClick={handleConnectCart}>
        <FontAwesomeIcon
          icon={faCartShopping}
          className={
            locationNow.pathname === "/cart" ? "active-cart-icon" : "cart-icon"
          }
        />
      </CartIcon>
    </HeaderWrapper>
  );
}

export default Header;
