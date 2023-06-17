/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { getRecords } from "../api/record";
import { getRequests, updateRequest } from "../api/request";
import AddPhotoForm from "../components/AddPhotoForm";
import AddServiceForm from "../components/AddServiceForm";
import RecordTableItem from "../components/RecordTableItem";

const AdminPage = () => {
  const [records, setRecords] = useState(null);
  const [requests, setRequests] = useState(null);

  const requestsTableHead = ["#", "Контактная информация", "Вопрос", "Дата обращения", "Ответ"];

  const getRequestList = async () => {
    try {
      const { success, requests: requestsList } = await getRequests();
      if (!success) {
        return;
      }

      return setRequests(requestsList);
    } catch (error) {
      return console.error(error);
    }
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
    try {
      const { success, records: recordsList } = await getRecords();
      if (!success) {
        return;
      }

      return setRecords(recordsList);
    } catch (error) {
      return console.error(error);
    }
  };

  const confirmRequest = async (requestId) => {
    try {
      await updateRequest(requestId);
      getRequestList();
    } catch (error) {
      console.log(error);
    }
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
                  <td align="center">
                    {request.is_answered ? (
                      "Обработано"
                    ) : (
                      <>
                        Обращение не обработано <br />
                        <button type="button" onClick={() => confirmRequest(request.id)}>
                          Отметить ответ
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          <h1 className="text-center">Таблица с обращениями пуста</h1>
        )}
      </Table>

      <Table
        responsive="sm"
        bordered
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
                <RecordTableItem reload={getRecordsList} record={record} index={index} />
              ))}
            </tbody>
          </>
        ) : (
          <h1 className="text-center">Таблица с записями пуста</h1>
        )}
      </Table>

      <AddServiceForm />
      <AddPhotoForm />
    </Container>
  );
};

export default AdminPage;
