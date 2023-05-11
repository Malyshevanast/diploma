import { getData, postData } from "./index";

const uploadPhotos = async ({ files, tags }) => {
  const { success } = await postData("/photo/upload", { files, tags });

  return { success };
};

const getPhotos = async () => {
  const { success, photos } = await getData("/photo/all");

  return { success, photos };
};

export { uploadPhotos, getPhotos };
