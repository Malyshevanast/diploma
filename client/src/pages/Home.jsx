import { ImgComparisonSlider } from "@img-comparison-slider/react";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { createRequest } from "../api/request";
import { getServices } from "../api/service";
import afterCity from "../assets/afterCity.jpg";
import afterGirl from "../assets/afterGirl.jpg";
import afterTree from "../assets/afterTree.jpg";
import beforeCity from "../assets/beforeCity.jpg";
import beforeGirl from "../assets/beforeGirl.jpg";
import beforeTree from "../assets/beforeTree.jpg";
import first from "../assets/first.jpg";
import photo2 from "../assets/photo_2.jpg";
import photoI from "../assets/photo_I.jpg";
import "./home.css";

const Home = () => {
  const [validated, setValidated] = useState(false);
  const [serviceList, setServiceList] = useState(null);

  const [fio, setFio] = useState(null);
  const [email, setEmail] = useState(null);
  const [question, setQuestion] = useState(null);

  // const emailRegex =
  //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const getCategoriesList = async () => {
    const { success, services, message } = await getServices();
    if (!success) {
      console.log(message);
      return;
    }

    setServiceList(services);
  };

  const postRequest = () => {
    createRequest({ fio, email, question }).then(({ message }) => {
      return alert(message);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    if (validated && fio && email && question) {
      postRequest();
    }
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  return (
    <>
      <div className="first_slide">
        <img src={first} alt="Фотография" />

        <a href="/record">
          <div className="box-3">
            <div className="btn btn-three">
              <span>Записаться</span>
            </div>
          </div>
        </a>
      </div>

      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <h1>Обо мне</h1>

            <p>
              Меня зовут Александр. Я профессиональный фотограф, с опытом работы более 8 лет. Для
              меня это не просто хобби, а способ самовыражения и восприятия мира. <br />
              <br /> Я работаю в Москве и Санкт-Петербурге. Безупречно организованная съемка и моя
              любовь к фотографии станут гарантом качественной работы и ваших незабываемых эмоций. Я
              работаю с различными проектами: от простых семейных фотосессий до сложных
              коммерческих. Люблю общаться с людьми, узнавать их истории и сочинять. новые. Вместе
              мы создадим нечто уникальное!
            </p>
          </Col>

          <Col className="pictures">
            <img
              className="pictures1"
              style={{ marginLeft: "100px", marginTop: "80px" }}
              src={photoI}
              alt="Фотография"
            />

            <img className="pictures2" src={photo2} alt="Фотография" />
          </Col>
        </Row>
      </Container>

      {serviceList ? (
        <Container style={{ margin: "auto" }}>
          <h1>Тарифы</h1>

          <Row>
            {serviceList.map((category) => (
              <Col className="my-1" xs={12} md={4} key={category.id}>
                <Card style={{ minHeight: 50 }}>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="title">{category.name}</Card.Title>

                    <Card.Text className="text">{category.description}</Card.Text>

                    <Button className="custom-btn btn-2" href="/service">
                      Поподробнее
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      ) : null}

      <Container className="content" style={{ textAlign: "center" }}>
        <h1>Мои работы</h1>

        <Carousel>
          <Carousel.Item>
            <ImgComparisonSlider>
              <img slot="first" src={beforeTree} alt="Фотография до" />

              <img slot="second" src={afterTree} alt="Фотография после" />
            </ImgComparisonSlider>
          </Carousel.Item>

          <Carousel.Item>
            <ImgComparisonSlider>
              <img slot="first" src={beforeCity} alt="Фотография до" />

              <img slot="second" src={afterCity} alt="Фотография после" />
            </ImgComparisonSlider>
          </Carousel.Item>

          <Carousel.Item>
            <ImgComparisonSlider>
              <img slot="first" src={beforeGirl} alt="Фотография до" />

              <img slot="second" src={afterGirl} alt="Фотография после" />
            </ImgComparisonSlider>
          </Carousel.Item>
        </Carousel>
      </Container>

      <Container className="content">
        <Card className="m-2 p-3">
          <Card.Title className="mx-auto">Остались вопросы? Свяжитесь с нами</Card.Title>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Form.Group className="mb-3" as={Col} md={6} controlId="exampleForm.ControlInput1">
                <Form.Label>Как к вам обращаться?</Form.Label>

                <Form.Control
                  required
                  type="text"
                  placeholder="ФИО"
                  onChange={(e) => setFio(e.target.value)}
                />

                <Form.Control.Feedback type="invalid">
                  Поле обязательно для заполнения
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" as={Col} md={6} controlId="exampleForm.ControlInput1">
                <Form.Label>Ваш email</Form.Label>

                <Form.Control
                  required
                  type="email"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Form.Control.Feedback type="invalid">
                  Введите корректный адресс email
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Что вы хотели бы узнать?</Form.Label>

              <Form.Control
                required
                as="textarea"
                rows={3}
                onChange={(e) => setQuestion(e.target.value)}
              />

              <Form.Control.Feedback type="invalid">
                Поле обязательно для заполнения
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit">Отправить</Button>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default Home;
