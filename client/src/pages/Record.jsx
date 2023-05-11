import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import moment from "moment";
import { createRecord } from "../api/record";
import { getServices } from "../api/service";
import "./record.css";

const Record = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [selectedService, setSelectedService] = useState(1);
  const [question, setQuestion] = useState(null);
  const [date, setDate] = useState(null);
  const [validated, setValidated] = useState(false);
  const [serviceList, setServiceList] = useState(null);

  const currentDate = new Date();
  const minDate = moment(currentDate.setDate(currentDate.getDate() + 1)).format("YYYY-MM-DD");

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

    setValidated(true);

    if (validated && name && email && selectedService && date) {
      createRecord({
        name,
        email,
        user_id: 1,
        service_id: parseInt(selectedService, 10),
        question,
        date,
      }).then(({ message }) => alert(message));
    }
  };

  useEffect(() => {
    getServiceList();
  }, []);
  return (
    <Container>
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

              <button className="custom-btn btn-2" type="submit">
                Записаться
              </button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default Record;
