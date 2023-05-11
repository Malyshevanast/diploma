/* eslint-disable react/no-array-index-key */
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
// import { uploadPhotos } from "../api/photo";

const AddServiceForm = () => {
  // const [files, setFiles] = useState(null);
  // const [validated, setValidated] = useState(false);

  // // eslint-disable-next-line no-unused-vars
  // const addPhotos = async (e) => {
  //   e.preventDefault();
  //   await uploadPhotos({ files, tags });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const form = e.currentTarget;
  //   if (form.checkValidity() === false) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   }

  //   setValidated(true);

  //   if (validated && files && tags) {
  //     // addPhotos(e);
  //     console.log("files and tags:", files, tags);
  //   }
  // };

  // useEffect(() => {
  //   if (files) {
  //     setPreviews([]);
  //     for (let i = 0; i < files.length; ++i) {
  //       const file = files[i];
  //       const preview = URL.createObjectURL(file);

  //       if (files.length > 1) {
  //         setPreviews((prev) => [...prev, preview]);
  //       } else {
  //         setPreviews([preview]);
  //       }
  //     }
  //   }
  // }, [files]);

  return (
    <Form className="p-3" title="Добавление услуги" style={{ background: "#FFF", borderRadius: 5 }}>
      <h1>Добавление услуги</h1>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Наименование</Form.Label>

        <Form.Control required type="text" placeholder="Наименование" />

        <Form.Control.Feedback type="invalid">
          Поле обязательно для заполнения
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Описание</Form.Label>

        <Form.Control required as="textarea" rows={3} placeholder="Введите описание" />

        <Form.Control.Feedback type="invalid">
          Поле обязательно для заполнения
        </Form.Control.Feedback>
      </Form.Group>

      <ButtonToolbar className="" aria-label="Toolbar with Button groups">
        <Button type="submit">Подтвердить</Button>

        <Button variant="danger">Сброс</Button>
      </ButtonToolbar>
    </Form>
  );
};

export default AddServiceForm;
