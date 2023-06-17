/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { X } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import { deletePhoto, getPhotos } from "../api/photo";
import { getServices } from "../api/service";
import { getUserData } from "../api/user";
import "./photo-grid.css";

const ConfirmModal = ({ show, reload, handleClose, photoId }) => {
  const handleDeletePhoto = async () => {
    try {
      handleClose();
      await deletePhoto({ photoId });
      reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удаление фото</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы точно хотите удалить фото?</Modal.Body>
      <Modal.Footer>
        <button type="button" onClick={handleClose}>
          Нет
        </button>
        <button type="button" onClick={handleDeletePhoto}>
          Да
        </button>
      </Modal.Footer>
    </Modal>
  );
};

const PhotoElement = ({ photo, reload, currentUser, filterProperty }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ConfirmModal show={show} reload={reload} handleClose={handleClose} photoId={photo.id} />

      <article key={photo.id} className="position-relative">
        <img
          src={`/images/${photo.filename}`}
          {...{
            className:
              filterProperty === "all" || photo.tags.includes(filterProperty)
                ? "img-responsive fade-in"
                : "img-responsive fade-out",
          }}
          alt="my"
        />
        {currentUser && currentUser.role === "admin" && (
          <span
            className="position-absolute top-0 start-100 translate-middle badge  rounded-circle bg-danger p-2"
            role="button"
            style={{ cursor: "pointer" }}
            onClick={handleShow}
          >
            <X size={20} />
          </span>
        )}
      </article>
    </>
  );
};

const PhotoGrid = () => {
  const [photoList, setPhotoList] = useState(null);
  const [filteredPhotoList, setFilteredPhotoList] = useState(null);
  const [filterProperty, setFilterProperty] = useState("все");
  const [filterProperties, setFilterProperties] = useState(["все"]);
  const [currentUser, setCurrentUser] = useState(null);

  const getServicesList = async () => {
    try {
      const { success, services } = await getServices();
      if (!success) {
        return;
      }
      services.map((service) => {
        if (filterProperties.includes(service.name)) {
          return null;
        }
        return setFilterProperties((prev) => [...prev, service.name]);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getPhotoList = async () => {
    try {
      const { success, photos } = await getPhotos();

      if (!success) {
        return console.log("Can not get list of photos");
      }

      setPhotoList(photos);
      return setFilteredPhotoList(photos);
    } catch (error) {
      return console.error(error);
    }
  };

  const filterPhotoList = () => {
    setTimeout(() => {
      const filteredList = photoList.filter(
        (photo) => filterProperty === "все" || photo.tags.includes(filterProperty)
      );
      setFilteredPhotoList(filteredList);
    }, 400);
  };

  const getUserDetails = async () => {
    const { success, user } = await getUserData();
    if (!success) {
      return;
    }

    setCurrentUser(user);
  };

  useEffect(() => {
    getServicesList();
    getPhotoList();
    getUserDetails();
  }, []);

  useEffect(() => {
    if (photoList) {
      filterPhotoList();
    }
  }, [filterProperty]);

  return (
    <Container>
      <div className="button-group filters-button-group">
        {filterProperties.map((property, index) => (
          <button
            className="button"
            type="button"
            key={index + 1}
            onClick={() => setFilterProperty(property)}
          >
            {property}
          </button>
        ))}
      </div>

      <section id="grid-container" className="transitions-enabled fluid masonry js-masonry grid">
        {!filteredPhotoList
          ? null
          : filteredPhotoList.map((photo) => (
              <PhotoElement
                key={photo.id}
                photo={photo}
                filterList={filterPhotoList}
                reload={getPhotoList}
                filterProperty={filterProperty}
                currentUser={currentUser}
              />
            ))}
      </section>
    </Container>
  );
};

export default PhotoGrid;
