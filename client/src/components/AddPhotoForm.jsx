/* eslint-disable react/button-has-type */
/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from "react";
import { FileEarmarkArrowDown } from "react-bootstrap-icons";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { MultiSelect } from "react-multi-select-component";
import { uploadPhotos } from "../api/photo";
import { getServices } from "../api/service";

const AddPhotoForm = () => {
  const [files, setFiles] = useState(null);
  const [tags, setTags] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [validated, setValidated] = useState(false);
  const [options, setOptions] = useState([]);

  const [showToast, setShowToast] = useState(false);

  const getServicesList = async () => {
    try {
      const { success, services } = await getServices();
      if (!success) {
        alert("error");
        return;
      }

      services.map((service) => {
        if (options.includes(service.name)) {
          return;
        }

        return setOptions((prev) => [...prev, { label: service.name, value: service.name }]);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addPhotos = async (e) => {
    try {
      e.preventDefault();
      await uploadPhotos({ files, tags });
      setShowToast(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setFiles(null);
    setTags([]);
    setPreviews([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    if (validated && files && tags) {
      addPhotos(e);
      handleReset();
    }
  };

  useEffect(() => {
    getServicesList();
  }, []);

  useEffect(() => {
    if (files) {
      setPreviews([]);
      for (let i = 0; i < files.length; ++i) {
        const file = files[i];
        const preview = URL.createObjectURL(file);

        if (files.length > 1) {
          setPreviews((prev) => [...prev, preview]);
        } else {
          setPreviews([preview]);
        }
      }
    }
  }, [files]);

  return (
    <>
      <Form
        noValidate
        validated
        onSubmit={handleSubmit}
        className="my-3 p-3"
        style={{ backgroundColor: "white", borderRadius: 5 }}
      >
        <Row>
          <h1 style={{ width: "50%" }}>Добавление фото</h1>
          {files ? <h1 style={{ width: "50%" }}>Предпросмотр</h1> : null}
          <Col md={files ? 4 : 12}>
            <Form.Group controlId="validationCustomUsername">
              <Form.Label>Фотографии</Form.Label>

              <InputGroup hasValidation>
                <Form.Control
                  required
                  type="file"
                  placeholder="Фото"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />

                <InputGroup.Text id="inputGroupPrepend">
                  <FileEarmarkArrowDown />
                </InputGroup.Text>

                <Form.Control.Feedback type="invalid">
                  Please upload at least one file.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="my_multiselect_field">
              <Form.Label>Тэги</Form.Label>

              <MultiSelect
                overrideStrings={{
                  allItemsAreSelected: "Выбраны все теги.",
                  clearSearch: "Очистить поиск",
                  clearSelected: "Очистить выбранное",
                  noOptions: "Нет опций, добавьте тариф",
                  search: "Поиск",
                  selectAll: "Выбрать всё",
                  selectAllFiltered: "Select All (Filtered)",
                  selectSomeItems: "Выбрать...",
                  create: "Создать",
                }}
                options={options}
                value={tags}
                onChange={setTags}
                labelledBy="выбор тегов"
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <ButtonToolbar
              className={files ? "justify-content-between" : null}
              aria-label="Toolbar with Button groups"
            >
              <button className="custom-btn btn-2" type="submit">
                Добавить
              </button>

              <button className="custom-btn btn-2  ms-3" type="reset" onClick={handleReset}>
                Очистить
              </button>
            </ButtonToolbar>
          </Col>

          {files ? (
            <Col>
              <Row>
                {previews.length > 0
                  ? previews.map((preview, index) => (
                      <Col key={index + 1}>
                        <Image src={preview} thumbnail />
                      </Col>
                    ))
                  : null}
              </Row>
            </Col>
          ) : null}
        </Row>
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
            <strong className="me-auto">Добавление фото</strong>
          </Toast.Header>
          <Toast.Body>Фото успешно добавлены!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default AddPhotoForm;
