import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import usePhotos from "../hooks/usePhotos";
import "./photo-grid.css";

const PhotoGrid = () => {
  const { allPhotos, photosList, setPhotosList } = usePhotos();
  const [filterProperty, setFilterProperty] = useState("all");

  const filterProperties = ["all", "beach", "boat", "lighthouse", "sea"];

  const filterGallery = () => {
    setTimeout(() => {
      const filteredPhotosList = allPhotos.filter(
        (photo) => filterProperty === "all" || photo.tags.includes(filterProperty)
      );
      setPhotosList(filteredPhotosList);
    }, 400);
  };

  useEffect(() => {
    filterGallery();
  }, [filterProperty]);

  return (
    <Container>
      <div className="button-group filters-button-group">
        {filterProperties.map((property) => (
          <button
            className="button"
            type="button"
            key={property.id}
            onClick={() => setFilterProperty(property)}
          >
            {property}
          </button>
        ))}
      </div>

      <section id="grid-container" className="transitions-enabled fluid masonry js-masonry grid">
        {photosList
          ? photosList.map((photo) => (
              <article key={photo.id}>
                <img
                  src={`http://localhost:8090/images/${photo.filename}`}
                  {...{
                    className:
                      filterProperty === "all" || photo.tags.includes(filterProperty)
                        ? "img-responsive fade-in"
                        : "img-responsive fade-out",
                  }}
                  alt="my"
                />
              </article>
            ))
          : null}
      </section>
    </Container>
  );
};

export default PhotoGrid;
