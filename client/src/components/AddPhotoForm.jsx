/* eslint-disable react/no-array-index-key */
import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
import { FileEarmarkArrowDown } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { uploadPhotos } from "../api/photo";

const AddPhotoForm = () => {
  const [files, setFiles] = useState(null);
  const [tags, setTags] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [validated, setValidated] = useState(false);

  const options = [
    { label: "Sea", value: "sea" },
    { label: "Beach", value: "beach" },
    { label: "Boat", value: "boat" },
    { label: "Lighthouse", value: "lighthouse" },
  ];

  // eslint-disable-next-line no-unused-vars
  const addPhotos = async (e) => {
    e.preventDefault();
    await uploadPhotos({ files, tags });
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
      // addPhotos(e);
      console.log("files and tags:", files, tags);
    }
  };

  const handleReset = () => {
    setFiles(null);
    setTags([]);
    setPreviews([]);
  };

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
    <Form
      noValidate
      validated
      onSubmit={handleSubmit}
      className="m-2 p-3"
      style={{ backgroundColor: "white", borderRadius: 5 }}
    >
      <Row>
        <h1 style={{ width: "50%" }}>Добавление фото</h1>
        {files ? <h1 style={{ width: "50%" }}>Предпросмотр</h1> : null}
        <Col md={files ? 4 : 12}>
          <Form.Group controlId="validationCustomUsername">
            <Form.Label>Files</Form.Label>

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
                noOptions: "Нет опций",
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
            <Button type="submit">Добавить фото</Button>

            <Button variant="danger" type="reset" onClick={handleReset}>
              Отменить
            </Button>
          </ButtonToolbar>
        </Col>

        {files ? (
          <Col>
            <Row>
              {previews.length > 0
                ? previews.map((preview, index) => (
                    <Col>
                      <Image src={preview} key={index} thumbnail />
                    </Col>
                  ))
                : null}
            </Row>
          </Col>
        ) : null}
      </Row>
    </Form>
  );
};

export default AddPhotoForm;
