/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { getUserData } from "../api/user";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);

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
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Персональные данные</Card.Title>

              <Card.Text>Имя: {(currentUser && currentUser.username) || "Место под имя"}</Card.Text>

              <Card.Text>Почта: {currentUser && currentUser.email}</Card.Text>

              <Card.Text>
                {currentUser && currentUser.email_is_confirmed
                  ? "Почта подтверждена"
                  : "Почта неподтверждена"}
              </Card.Text>

              <Button variant="primary">Изменить данные</Button>
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
                            <td>Запись {record.is_confirmed ? "подтвержена" : "неподтверждена"}</td>
                          </tr>
                        ))}
                    </tbody>
                  </>
                ) : (
                  <h1 className="d-flex justify-content-center">Таблица с записями пуста</h1>
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
