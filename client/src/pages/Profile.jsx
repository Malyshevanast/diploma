/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { getUserData, updateUserData } from "../api/user";
import { deleteRecord } from "../api/record";

const UpdateModal = ({ show, getUserDetails, handleClose, currentUser }) => {
  const [newName, setNewName] = useState(currentUser.username);
  const [newEmail, setNewEmail] = useState(currentUser.email);

  const [validated, setValidated] = useState(false);

  const handleUpdateData = async () => {
    try {
      const { success } = await updateUserData(currentUser.id, {
        username: newName,
        email: newEmail,
      });
      if (success) {
        handleClose();
        getUserDetails();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    if (!validated) {
      return;
    }

    if (validated && newName !== "" && newEmail !== "") {
      handleUpdateData();
    }
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Изменение данных</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className="p-3"
          title="Добавление тарифа"
          style={{ background: "#FFF", borderRadius: 5 }}
          onSubmit={handleSubmit}
        >
          <h1>Изменение данных</h1>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Имя</Form.Label>

            <Form.Control
              required
              type="text"
              placeholder="Имя"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />

            <Form.Control.Feedback type="invalid">
              Поле обязательно для заполнения
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Email</Form.Label>

            <Form.Control
              required
              type="text"
              placeholder="Введите описание"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />

            <Form.Control.Feedback type="invalid">
              Поле обязательно для заполнения
            </Form.Control.Feedback>
          </Form.Group>

          <ButtonToolbar
            aria-label="Toolbar with Button groups"
            className="justify-content-between"
          >
            <button className="custom-btn btn-2" type="submit">
              Изменить
            </button>

            <button className="custom-btn btn-2" type="button" onClick={handleClose}>
              Отменить
            </button>
          </ButtonToolbar>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const ConfirmModal = ({ show, getUserDetails, handleClose, record }) => {
  const handleDeleteService = async () => {
    try {
      handleClose();
      await deleteRecord(record.id);
      await getUserDetails();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Отмена записи</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы точно хотите отменить запись?</Modal.Body>
      <Modal.Footer>
        <button type="button" onClick={handleClose}>
          Нет
        </button>
        <button type="button" onClick={handleDeleteService}>
          Да
        </button>
      </Modal.Footer>
    </Modal>
  );
};

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [show, setShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleUpdateShow = () => setUpdateShow(true);
  const handleUpdateClose = () => setUpdateShow(false);

  const recordsTableHead = [
    "#",
    "Выбранная услуга",
    "Препочитаемая дата",
    "Контактная информация",
    "Пожелания",
    "Подтвержение",
  ];

  const getUserDetails = async () => {
    const { success, user, message } = await getUserData();
    if (!success) {
      alert(message);
      return;
    }

    setCurrentUser(user);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Container className="my-4">
      {currentUser && (
        <UpdateModal
          show={updateShow}
          getUserDetails={getUserDetails}
          handleClose={handleUpdateClose}
          currentUser={currentUser}
        />
      )}
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Персональные данные</Card.Title>

              <Card.Text>Имя: {(currentUser && currentUser.username) || "Место под имя"}</Card.Text>

              <Card.Text>Почта: {currentUser && currentUser.email}</Card.Text>

              <button type="button" onClick={handleUpdateShow}>
                Изменить данные
              </button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title align="center">Ваши записи</Card.Title>
              <Table
                responsive="sm"
                bordered
                hover
                striped
                title="Записи"
                style={{ backgroundColor: "white", borderRadius: 5 }}
              >
                {currentUser && currentUser.records.length > 0 ? (
                  <>
                    <thead>
                      <tr>
                        {recordsTableHead.map((item, index) => (
                          <th key={index}>{item}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentUser &&
                        currentUser.records.map((record, index) => (
                          <>
                            <ConfirmModal
                              show={show}
                              getUserDetails={getUserDetails}
                              handleClose={handleClose}
                              record={record}
                            />
                            <tr key={record.id}>
                              <td align="center">{index + 1}</td>
                              <td>{record.service.name}</td>
                              <td>
                                {new Intl.DateTimeFormat("ru-RU").format(new Date(record.date))}
                              </td>
                              <td>
                                <p>Имя: {currentUser.username}</p>
                                <p>Почта: {currentUser.email}</p>
                              </td>
                              <td>
                                {record.question !== "null"
                                  ? record.question
                                  : "Комментарии отсутствуют"}
                              </td>
                              <td>
                                Запись{" "}
                                {record.is_confirmed ? (
                                  "подтвержена"
                                ) : (
                                  <>
                                    неподтверждена <br />
                                    <button type="button" onClick={handleShow}>
                                      Отменить запись
                                    </button>
                                  </>
                                )}
                              </td>
                            </tr>
                          </>
                        ))}
                    </tbody>
                  </>
                ) : (
                  <h1 className="text-center">Таблица с записями пуста</h1>
                )}
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
