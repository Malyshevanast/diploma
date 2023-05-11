import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const AbstractForm = ({ className, title, attributes, children }) => {
  return (
    <Card className={className}>
      <Card.Title>{title}</Card.Title>
      <Form {...attributes}>{children}</Form>
    </Card>
  );
};
export default AbstractForm;

// const [name, setName] = useState();
//   const [description, setDescription] = useState();
//   const [price, setPrice] = useState();
//   const [file, setFile] = useState();

//   const createTour = async (event) => {
//     event.preventDefault();
//     const { success, message, id: photo_id } = await uploadImage(file);
//     if (success) {
//       const response = await postData("/tours/create", { name, description, price, photo_id });

//       if (!response.success) {
//         alert(response.message);
//         if (response.code !== "NETWORK_ERROR");
//         return;
//       }
//       setName("");
//       setDescription("");
//       setPrice("");
//       props.getTourList();
//       return alert(response.message);
//     }
//     return alert(message);
//   };
{
  /* <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавление нового тура</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Form onSubmit={createTour}>
            <Form.Group className="reg-fg">
              <Form.Label>Название Тура</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Введите Название"
                required
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="reg-fg">
              <Form.Label>Описание Тура</Form.Label>
              <Form.Control
                size="lg"
                as="textarea"
                type="text"
                placeholder="Введите Описание"
                required
                id="email"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="reg-fg">
              <Form.Label>Цена Тура</Form.Label>
              <Form.Control
                size="lg"
                type="number"
                placeholder="Введите Цену"
                required
                id="password"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Фото тура</Form.Label>
              <Form.Control
                type="file"
                size="lg"
                onChange={(event) => setFile(event.target.files[0])}
              />
            </Form.Group>

          </Form>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal> */
}
