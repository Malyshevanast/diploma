/* eslint-disable react/no-array-index-key */
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import AddPhotoForm from "../components/AddPhotoForm";
import AddServiceForm from "../components/AddServiceForm";
import { getRecords } from "../api/record";
import { getRequests } from "../api/request";

const AdminPage = () => {
  const [records, setRecords] = useState(null);
  const [requests, setRequests] = useState(null);

  const requestsTableHead = ["#", "Контактная информация", "Вопрос", "Дата обращения", "Ответ"];

  const getRequestList = async () => {
    const { success, requests: requestsList, message } = await getRequests();
    if (!success) {
      return alert(message);
    }

    return setRequests(requestsList);
  };

  const recordsTableHead = [
    "#",
    "Выбранная услуга",
    "Препочитаемая дата",
    "Контактная информация",
    "Пожелания",
    "Подтвержение",
  ];

  const getRecordsList = async () => {
    const { success, records: recordsList, message } = await getRecords();
    if (!success) {
      return alert(message);
    }

    return setRecords(recordsList);
  };

  useEffect(() => {
    getRequestList();
    getRecordsList();
  }, []);

  return (
    <Container className="my-3">
      <Table
        responsive="sm"
        bordered
        hover
        striped
        title="Обращения"
        style={{ backgroundColor: "white", borderRadius: 5 }}
      >
        {requests && requests.length > 0 ? (
          <>
            <thead>
              <tr>
                <th colSpan={12}>Обращения</th>
              </tr>
              <tr>
                {requestsTableHead.map((item, index) => (
                  <th key={index}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={request.id}>
                  <td align="center">{index + 1}</td>
                  <td>
                    <p>Имя: {request.fio}</p>
                    <p>Почта: {request.email}</p>
                  </td>
                  <td>{request.question}</td>
                  <td>{new Intl.DateTimeFormat("ru-RU").format(new Date(request.created_at))}</td>
                  <td>{request.answer ? "Ответ" : "Ответ не предоставлен"}</td>
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          <h1 className="d-flex justify-content-center">Таблица с записями пуста</h1>
        )}
      </Table>

      <Table
        responsive="sm"
        bordered
        hover
        striped
        title="Записи"
        style={{ backgroundColor: "white", borderRadius: 5 }}
      >
        {records && records.length > 0 ? (
          <>
            <thead>
              <tr>
                <th colSpan={12}>Записи</th>
              </tr>
              <tr>
                {recordsTableHead.map((item, index) => (
                  <th key={index}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record.id}>
                  <td align="center">{index + 1}</td>
                  <td>{record.service.name}</td>
                  <td>{new Intl.DateTimeFormat("ru-RU").format(new Date(record.date))}</td>
                  <td>
                    <p>Имя: {record.client.username}</p>
                    <p>Почта: {record.client.email}</p>
                    <p>
                      {record.client.email_is_confirmed
                        ? "Почта подтверждена"
                        : "Почта неподтверждена"}
                    </p>
                  </td>
                  <td>
                    {record.question !== "null" ? record.question : "Комментарии отсутствуют"}
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

      <AddServiceForm />
      <AddPhotoForm />
    </Container>
  );
};

export default AdminPage;
