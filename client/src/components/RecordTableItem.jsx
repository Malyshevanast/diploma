import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { updateRecord } from "../api/record";

const ConfirmModal = ({ reload, show, setShowToast, handleClose, record }) => {
  const confirmRecord = async (recordId) => {
    try {
      const { success } = await updateRecord(recordId, { isConfirmed: true });

      if (success) {
        handleClose();
        reload();
        setShowToast(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Подтвержение записи</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы точно хотите подтвердить запись?</Modal.Body>
      <Modal.Footer>
        <button type="button" onClick={handleClose}>
          Нет
        </button>
        <button type="button" onClick={() => confirmRecord(record.id)}>
          Да
        </button>
      </Modal.Footer>
    </Modal>
  );
};

const RecordTableItem = ({ reload, record, index }) => {
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <ConfirmModal
        reload={reload}
        show={show}
        setShowToast={setShowToast}
        handleClose={handleClose}
        record={record}
      />

      <tr key={record.id}>
        <td align="center">{index + 1}</td>
        <td>{record.service.name}</td>
        <td>{new Intl.DateTimeFormat("ru-RU").format(new Date(record.date))}</td>
        <td>
          <p>Имя: {record.client.username}</p>
          <p>Почта: {record.client.email}</p>
        </td>
        <td>{record.question !== "null" ? record.question : "Комментарии отсутствуют"}</td>
        <td align="center">
          Запись{" "}
          {record.is_confirmed ? (
            "подтвержена"
          ) : (
            <>
              неподтверждена <br />
              <button type="button" onClick={handleShow}>
                {" "}
                Подтвердить запись
              </button>
            </>
          )}
        </td>
      </tr>

      <ToastContainer className="position-absolute end-0 p-2">
        <Toast
          onClose={() => setShowToast(false)}
          bg="success"
          show={showToast}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Подтвержение записи</strong>
          </Toast.Header>
          <Toast.Body>Запись успешно подтверждена!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default RecordTableItem;
