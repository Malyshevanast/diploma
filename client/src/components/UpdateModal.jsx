/* eslint-disable react/button-has-type */
import { useState } from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { updateService } from "../api/service";

const UpdateModal = ({ show, handleClose, reloadList, currentService }) => {
  const [newName, setNewName] = useState(currentService.name);
  const [newPrice, setNewPrice] = useState(currentService.price);
  const [newDescription, setNewDescription] = useState(currentService.description);
  const [showToast, setShowToast] = useState(false);

  const [validated, setValidated] = useState(false);

  const handleUpdateService = async () => {
    try {
      const { success } = await updateService(currentService.id, {
        name: newName.toLowerCase(),
        price: newPrice,
        description: newDescription,
      });
      if (success) {
        handleClose();
        setShowToast(true);
        reloadList();
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

    if (validated && newName !== "" && newPrice > 0 && newDescription !== "") {
      handleUpdateService();
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Обновление тарифа</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="p-3"
            title="Добавление тарифа"
            style={{ background: "#FFF", borderRadius: 5 }}
            onSubmit={handleSubmit}
          >
            <h1>Добавление тарифа</h1>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Наименование</Form.Label>

              <Form.Control
                required
                type="text"
                placeholder="Наименование"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />

              <Form.Control.Feedback type="invalid">
                Поле обязательно для заполнения
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Стоимость</Form.Label>

              <Form.Control
                required
                type="number"
                placeholder="Введите стоимость"
                min={0}
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />

              <Form.Control.Feedback type="invalid">
                Поле обязательно для заполнения
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Описание</Form.Label>

              <Form.Control
                required
                as="textarea"
                rows={3}
                placeholder="Введите описание"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
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

      <ToastContainer className="p-2" position="bottom-end">
        <Toast
          onClose={() => setShowToast(false)}
          bg="success"
          show={showToast}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Тариф обновлён</strong>
          </Toast.Header>
          <Toast.Body>Тариф успешно обновлён!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default UpdateModal;
