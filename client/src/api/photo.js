import { getData, postData } from "./index";

const uploadPhotos = async ({ files, tags }) => {
  try {
    const { success } = await postData("/photo/upload", { files, tags });

    return { success };
  } catch (error) {
    return console.log(error);
  }
};

const getPhotos = async () => {
  try {
    const { success, photos } = await getData("/photo/all");

    return { success, photos };
  } catch (error) {
    return console.log(error);
  }
};

const deletePhoto = async (data) => {
  try {
    await postData("/photo/delete", data);
  } catch (error) {
    console.log(error);
  }
};

export { uploadPhotos, deletePhoto, getPhotos };
