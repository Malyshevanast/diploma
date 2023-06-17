import { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { signIn } from "../api/auth";
import useLoginGuard from "../hooks/useLoginGuard";
import "./record.css";

const SignIn = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  useLoginGuard({ loggedIn: true, path: "/" });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    try {
      const { success, token, message } = await signIn({ email, password });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    if (validated && email && password) {
      onLogin();
    }
  };

  return (
    <Container>
      <Row>
        <Col md={3} sm={0} />
        <Col md={6} sm={12}>
          <Card style={{ marginTop: 50, marginBottom: 150 }}>
            <Card.Body>
              <Card.Title>Авторизация</Card.Title>
              <Form>
                <Form.Group className="login-fg">
                  <Form.Label>Адрес электронной почты</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="login-fg">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button className="custom-btn btn-2 w-100" type="submit" onClick={handleSubmit}>
                    Войти
                  </button>
                </Form.Group>
              </Form>
              <Link className="mx-auto" to="/sign-up">
                Нет аккаунта? Регистрация тут
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={0} />
      </Row>
    </Container>
  );
};

export default SignIn;
