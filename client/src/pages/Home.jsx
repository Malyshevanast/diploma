/* eslint-disable import/no-cycle */
import { ImgComparisonSlider } from "@img-comparison-slider/react";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { NavLink } from "react-router-dom";
import { getPhotos } from "../api/photo";
import { createRequest } from "../api/request";
import { getServices } from "../api/service";
import afterCity from "../assets/afterCity.jpg";
import afterGirl from "../assets/afterGirl.jpg";
import afterTree from "../assets/afterTree.jpg";
import beforeCity from "../assets/beforeCity.jpg";
import beforeGirl from "../assets/beforeGirl.jpg";
import beforeTree from "../assets/beforeTree.jpg";
import first from "../assets/first.jpg";
import "./home.css";

const Home = () => {
  const [isShown, setIsShown] = useState(false);
  const [validated, setValidated] = useState(false);
  const [serviceList, setServiceList] = useState([]);
  const [photoList, setPhotoList] = useState([]);

  const [fio, setFio] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");

  const getServicesList = async () => {
    try {
      const { success, services } = await getServices();
      if (!success) {
        return;
      }

      setServiceList(services);
      return;
    } catch (error) {
      console.error(error);
    }
  };

  const postRequest = async () => {
    try {
      const { success } = await createRequest({ fio, email, question });
      if (success) {
        setIsShown(true);
        setEmail("");
        setFio("");
        setQuestion("");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPhotoList = async () => {
    try {
      const { success, photos } = await getPhotos();

      if (!success) {
        return console.log("Can not get list of photos");
      }

      return setPhotoList(photos);
    } catch (error) {
      return console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    if (!validated) {
      return;
    }

    if (validated && fio !== "" && email !== "" && question !== "") {
      postRequest();
    }
  };

  useEffect(() => {
    getServicesList();
    getPhotoList();
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

      <Container className="position-relative my-5">
        <Row xs={1} md={2}>
          <Col md={8}>
            <h1>Обо мне</h1>

            <p>
              Меня зовут Александр. Я профессиональный фотограф, с опытом работы более 8 лет. Для
              меня это не просто хобби, а способ самовыражения и восприятия мира. <br />
              <br /> Я работаю в Владимире. Безупречно организованная съемка и моя любовь к
              фотографии станут гарантом качественной работы и ваших незабываемых эмоций. Я работаю
              с различными проектами: от простых семейных фотосессий до сложных коммерческих. Люблю
              общаться с людьми, узнавать их истории и сочинять. новые. Вместе мы создадим нечто
              уникальное!
            </p>
          </Col>

          <Col xs={12} md={4}>
            <Image className="w-100" src="/assets/main-photo.png" alt="Фотография" />
          </Col>
        </Row>
      </Container>

      {serviceList.length > 0 ? (
        <Container style={{ margin: "auto" }}>
          <h1>Тарифы</h1>

          <Row xs={1} className="justify-content-center my-3 g-4">
            {serviceList.slice(0, 2).map((service) => {
              const servicePhotos = photoList.map((photo) => {
                if (photo.tags.includes(service.name)) {
                  return photo.filename;
                }
                return null;
              });

              return (
                <Col xs={12} md={6} key={service.id}>
                  <Card className="position-relative" style={{ minHeight: 50 }}>
                    <Card.Body className="d-flex flex-column">
                      <Carousel className="mb-3">
                        {servicePhotos &&
                          servicePhotos.map((photo) => {
                            if (!photo) {
                              return null;
                            }

                            return (
                              <Carousel.Item>
                                <img
                                  className="d-block w-100"
                                  src={`/images/${photo}`}
                                  alt="First slide"
                                  style={{ aspectRatio: 3 / 4 }}
                                />
                              </Carousel.Item>
                            );
                          })}
                      </Carousel>

                      <Card.Title className="text-capitalize">{service.name}</Card.Title>

                      <Card.Text className="text-capitalize">
                        Описание:{" "}
                        {service.description.length === 0 ? "отсутвует" : service.description}
                      </Card.Text>

                      <Card.Text>
                        <b>Стоимость: </b>
                        {new Intl.NumberFormat("ru-RU", {
                          style: "currency",
                          currency: "RUB",
                          maximumFractionDigits: 0,
                        }).format(service.price)}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}

            <NavLink to="/service">
              <button className="w-100 custom-btn btn-2" type="button">
                Смотреть все
              </button>
            </NavLink>
          </Row>
        </Container>
      ) : null}

      <Container className="text-center my-5">
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
          <Card.Title className="mx-auto">
            Остались вопросы?
            <br /> Свяжитесь с нами
          </Card.Title>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Form.Group className="mb-3" as={Col} md={6} controlId="exampleForm.ControlInput1">
                <Form.Label>Как к вам обращаться?</Form.Label>

                <Form.Control
                  required
                  type="text"
                  value={fio}
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
                  value={email}
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
                value={question}
                rows={3}
                onChange={(e) => setQuestion(e.target.value)}
              />

              <Form.Control.Feedback type="invalid">
                Поле обязательно для заполнения
              </Form.Control.Feedback>
            </Form.Group>

            <button className="custom-btn btn-2 w-100" type="submit">
              Отправить
            </button>
          </Form>
        </Card>

        <ToastContainer className="position-absolute end-0 p-2">
          <Toast
            onClose={() => setIsShown(false)}
            bg="success"
            show={isShown}
            delay={5000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Отправка заявки</strong>
            </Toast.Header>
            <Toast.Body>Ваша заявка принята, мы с вами свяжемся</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
    </>
  );
};

export default Home;
