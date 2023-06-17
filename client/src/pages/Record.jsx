import moment from "moment";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useNavigate } from "react-router";
import { createRecord } from "../api/record";
import { getServices } from "../api/service";
import { getUserData } from "../api/user";
import "./record.css";

const Record = () => {
  const [username, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [selectedService, setSelectedService] = useState(1);
  const [question, setQuestion] = useState(null);
  const [date, setDate] = useState(null);
  const [validated, setValidated] = useState(false);
  const [serviceList, setServiceList] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const currentDate = new Date();
  const minDate = moment(currentDate.setDate(currentDate.getDate() + 6)).format("YYYY-MM-DD");

  const getServiceList = async () => {
    const { success, services, message } = await getServices();
    if (!success) {
      alert(message);
      return;
    }

    setServiceList(services);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!currentUser) {
      handleShow();
      return;
    }

    setValidated(true);

    if (currentUser && validated && username && email && selectedService && date) {
      createRecord({
        name: username,
        email,
        user_id: currentUser.id,
        service_id: serviceList[parseInt(selectedService, 10) - 1].id,
        question,
        date,
      }).then(({ success }) => {
        if (success) {
          setShowToast(true);
          navigate("/profile");
        }
      });
    }
  };

  const getUserDetails = async () => {
    const { success, user } = await getUserData();
    if (!success) {
      return;
    }

    setName(user.username);
    setEmail(user.email);
    setCurrentUser(user);
  };

  useEffect(() => {
    getUserDetails();
    getServiceList();
  }, []);

  return (
    <>
      <Container>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Вы неавторизованы!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Чтобы продолжить, необходимо войти или зарегистрироваться</Modal.Body>
          <Modal.Footer>
            <button className="custom-btn btn-2" type="button" onClick={handleClose}>
              Закрыть
            </button>

            <button
              className="custom-btn btn-2"
              type="button"
              onClick={() => {
                handleClose();
                navigate("/sign-in");
              }}
            >
              Войти
            </button>
          </Modal.Footer>
        </Modal>

        <Row>
          <Card className="my-5" style={{ width: "50rem", margin: "auto" }}>
            <Card.Body>
              <h1 style={{ textAlign: "center", fontFamily: "Montserrat-Light" }}>Онлайн-запись</h1>

              <Form
                noValidate
                validated={validated}
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <Form.Group className="mb-3">
                  <FloatingLabel label="Имя">
                    <Form.Control
                      name="name"
                      type="text"
                      placeholder="Имя"
                      required
                      value={username}
                      onChange={(e) => setName(e.target.value)}
                    />

                    <Form.Control.Feedback type="invalid">
                      Пожалуйста, введите свое имя.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel label="Email">
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Пожалуйста, введите свой Email.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel label="Тариф">
                    <Form.Select
                      className="text-capitalize"
                      disabled={!serviceList}
                      defaultValue={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                    >
                      {serviceList &&
                        serviceList.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name}
                          </option>
                        ))}
                    </Form.Select>
                  </FloatingLabel>
                  {!serviceList && <Form.Text>Услуги отсутствуют</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Дата</Form.Label>
                  <Form.Control
                    name="date"
                    type="date"
                    min={minDate}
                    placeholder="Дата"
                    required
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Пожалуйста, выберите дату.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Пожелания к съемке</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Введите текст"
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </Form.Group>

                <button className="custom-btn btn-2 w-100" type="submit">
                  Записаться
                </button>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>

      <ToastContainer className="p-2" position="bottom-end">
        <Toast
          onClose={() => setShowToast(false)}
          bg="success"
          show={showToast}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Запись</strong>
          </Toast.Header>
          <Toast.Body>Вы успешно записались!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default Record;
