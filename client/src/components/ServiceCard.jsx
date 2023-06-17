/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useNavigate } from "react-router";
import { getPhotos } from "../api/photo";
import { deleteService } from "../api/service";
import { getUserData } from "../api/user";
import useToken from "../hooks/useToken";
import UpdateModal from "./UpdateModal";

const ConfirmModal = ({ show, handleClose, reloadList, serviceId }) => {
  const [showToast, setShowToast] = useState(false);

  const handleDeleteService = async () => {
    try {
      handleClose();
      setShowToast(true);
      await deleteService(serviceId);
      reloadList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Удаление тарифа</Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы точно хотите удалить тариф?</Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={handleClose}>
            Нет
          </button>
          <button type="button" onClick={handleDeleteService}>
            Да
          </button>
        </Modal.Footer>
      </Modal>

      <ToastContainer className="p-2" position="bottom-end">
        <Toast
          onClose={() => setShowToast(false)}
          bg="warning"
          show={showToast}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Удаление тарифа</strong>
          </Toast.Header>
          <Toast.Body>Тариф успешно удалён!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

const ServiceCard = ({ service, reloadList }) => {
  const { loggedIn } = useToken();
  const [currentUser, setCurrentUser] = useState(null);
  const [servicePhotos, setServicePhotos] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = () => setDeleteShow(true);

  const navigate = useNavigate();

  const getCurrentUser = async () => {
    const { success, user } = await getUserData();
    if (!success) {
      return;
    }

    setCurrentUser(user);
  };

  const getPhotoList = async () => {
    try {
      const { success, photos } = await getPhotos();

      if (!success) {
        return console.log("Can not get list of photos");
      }

      photos.map((photo) => {
        if (photo.tags.includes(service.name)) {
          return setServicePhotos((prev) => [...prev, photo.filename]);
        }
        return null;
      });
    } catch (error) {
      return console.error(error);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      getCurrentUser();
    }
    getPhotoList();
  }, []);

  return (
    <>
      <UpdateModal
        show={show}
        handleClose={handleClose}
        reloadList={reloadList}
        currentService={service}
      />
      <ConfirmModal
        show={deleteShow}
        reloadList={reloadList}
        handleClose={handleDeleteClose}
        serviceId={service.id}
      />
      <Card className="position-relative" style={{ minHeight: 50 }}>
        {currentUser && currentUser.role === "admin" && (
          <span
            className="position-absolute top-0 start-100 translate-middle badge  rounded-circle bg-danger p-2"
            role="button"
            style={{ cursor: "pointer" }}
            onClick={handleDeleteShow}
          >
            <X size={20} />
          </span>
        )}

        <Card.Body className="d-flex flex-column">
          {servicePhotos && (
            <Carousel className="mb-3">
              {servicePhotos.map((photo) => {
                if (!photo) {
                  return null;
                }

                return (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={`/images/${photo}`}
                      alt="First slide"
                      style={{ aspectRatio: 3 / 4 }}
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          )}

          <Card.Title className="text-capitalize">{service.name}</Card.Title>

          <Card.Text>
            Описание: {service.description.length === 0 ? "Отсутвует" : service.description}
          </Card.Text>

          <Card.Text>
            <b>Стоимость: </b>
            {new Intl.NumberFormat("ru-RU", {
              style: "currency",
              currency: "RUB",
              maximumFractionDigits: 0,
            }).format(service.price)}
          </Card.Text>

          {currentUser && currentUser.role === "admin" ? (
            <button className="custom-btn btn-2" type="button" onClick={handleShow}>
              Изменить
            </button>
          ) : (
            <button className="custom-btn btn-2" type="button" onClick={() => navigate("/record")}>
              Записаться
            </button>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default ServiceCard;
