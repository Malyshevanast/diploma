const { Photo } = require('../models');

exports.createPhoto = async ({ body, files }) => {
  try {
    const { tags } = body;
    const tagsArr = [];
    JSON.parse(tags).forEach((tag) => tagsArr.push(tag.value));

    files.forEach(async ({ filename }) => {
      await Photo.create({ filename, tags: tagsArr });
    });

    return { success: true, message: 'Photos uploaded successfully' };
  } catch (error) {
    console.error(error);
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.findPhotos = async () => {
  try {
    const photos = await Photo.findAll();
    return { success: true, photos };
  } catch (error) {
    console.error(new Error(error));
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.findPhoto = async (id) => {
  try {
    const photo = await Photo.findOne({ where: { id } });

    return { photo };
  } catch (error) {
    console.error(new Error(error));
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.deletePhoto = async (photo) => {
  try {
    await photo.destroy();

    return { success: true };
  } catch (error) {
    console.error(new Error(error));
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};
