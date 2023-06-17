/* eslint-disable import/no-cycle */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import { useState } from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { createService } from "../api/service";

const AddServiceForm = () => {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const [showToast, setShowToast] = useState(false);

  const addService = async () => {
    try {
      const { success } = await createService({
        name: name.toLowerCase(),
        price,
        description,
      });
      if (success) {
        setName("");
        setPrice(0);
        setDescription("");
        setShowToast(true);
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

    if (validated && name !== "" && price > 0 && description !== "") {
      addService();
    }
  };

  return (
    <>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Form.Control.Feedback type="invalid">
            Поле обязательно для заполнения
          </Form.Control.Feedback>
        </Form.Group>

        <ButtonToolbar aria-label="Toolbar with Button groups">
          <button className="custom-btn btn-2" type="submit">
            Добавить
          </button>

          <button className="custom-btn btn-2  ms-3" type="reset">
            Очистить
          </button>
        </ButtonToolbar>
      </Form>

      <ToastContainer className="position-absolute end-0 p-2">
        <Toast
          onClose={() => setShowToast(false)}
          bg="success"
          show={showToast}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Добавление тарифа</strong>
          </Toast.Header>
          <Toast.Body>Тариф успешно добавлен!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default AddServiceForm;
