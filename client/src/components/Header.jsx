import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import useToken from "../hooks/useToken";
import "./header.css";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { loggedIn } = useToken();

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar expand="sm">
      <Container>
        <Navbar.Brand ms-left as={Link} to="/">
          <img id="logo" src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav>
            <Nav.Link as={Link} to="/" disabled={pathname === "/"}>
              Главная
            </Nav.Link>
            <Nav.Link as={Link} to="/service" disabled={pathname === "/service"}>
              Услуги
            </Nav.Link>
            <Nav.Link as={Link} to="/photo" disabled={pathname === "/photo"}>
              Портфолио
            </Nav.Link>
            <Nav.Link as={Link} to="/record" disabled={pathname === "/record"}>
              Онлайн-запись
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {!loggedIn ? (
          <Nav.Link as={Link} to="/sign-in" disabled={pathname === "/sign-in"}>
            Вход
          </Nav.Link>
        ) : (
          <>
            <Nav.Link className="me-3" as={Link} to="/profile" disabled={pathname === "/profile"}>
              Профиль
            </Nav.Link>
            <Nav.Link onClick={onLogout}>Выход</Nav.Link>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
