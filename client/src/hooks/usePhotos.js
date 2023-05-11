import { useEffect, useState } from "react";
import { getPhotos } from "../api/photo";

const usePhotos = () => {
  const [photosList, setPhotosList] = useState([]);
  const [allPhotos, setAllPhotos] = useState([]);

  useEffect(() => {
    getPhotos().then(({ success, photos }) => {
      if (success) {
        setAllPhotos(photos);
        setPhotosList(photos);
      }
    });
  }, []);

  return { allPhotos, photosList, setPhotosList };
};

export default usePhotos;
