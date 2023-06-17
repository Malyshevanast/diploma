/* eslint-disable import/no-cycle */
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { signUp } from "../api/auth";
import useSignupGuard from "../hooks/useSignupGuard";
import "./record.css";

const SignUp = () => {
  useSignupGuard({ loggedIn: true, path: "/" });
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = async (e) => {
    try {
      e.preventDefault();
      const { success, token, message } = await signUp({ username, email, password });

      if (!success) {
        alert(message);
        setPassword("");
        return;
      }

      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={3} sm={0} />
        <Col md={6} sm={12}>
          <Card style={{ marginTop: 50, marginBottom: 150 }}>
            <Card.Body>
              <Card.Title>Регистрация</Card.Title>
              <Form onSubmit={onSignUp}>
                <Form.Group className="reg-fg">
                  <Form.Label>Имя</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Введите имя"
                    id="name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="reg-fg">
                  <Form.Label>Адрес электронной почты</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Введите email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="reg-fg">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Введите пароль"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <button className="custom-btn btn-2 w-100" type="submit">
                  Зарегистрироваться
                </button>
              </Form>
              <Link className="mx-auto" to="/sign-in">
                Есть аккаунт? Войдите тут
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={0} />
      </Row>
    </Container>
  );
};

export default SignUp;
