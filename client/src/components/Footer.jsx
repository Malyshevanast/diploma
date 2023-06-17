import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <Container id="footer" fluid>
      <Row>
        <Col className="footer-element" xs={12} sm={4}>
          <h3>Сайт-визитка</h3>
        </Col>
        <Col className="footer-element" xs={12} sm={4}>
          <h3>Страницы</h3>
          <ul>
            <li>
              <Link className={pathname === "/" ? "current" : ""} to="/">
                Главная
              </Link>
            </li>
            <li>
              <Link className={pathname === "/service" ? "current" : ""} to="/service">
                Тарифы
              </Link>
            </li>
            <li>
              <Link className={pathname === "/record" ? "current" : ""} to="/record">
                Онлайн-запись
              </Link>
            </li>
            <li>
              <Link className={pathname === "/photo" ? "current" : ""} to="/photo">
                Портфолио
              </Link>
            </li>
          </ul>
        </Col>
        <Col className="footer-element" xs={12} sm={4}>
          <h3>Мы в социальных сетях</h3>
          <ul>
            <li>
              <a target="_blank" rel="nofollow noreferrer" href="https://vk.com">
                ВК: @issues
              </a>
            </li>
            <li>
              <a href="mailto:issues@gmail.com">Почта: issues@gmail.com</a>
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col className="footer-element">
          <div>&copy; Сайт визитка </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
