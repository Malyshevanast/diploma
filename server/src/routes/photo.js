const express = require('express');
const { createPhoto, findPhotos } = require('../controllers/photo');
const routeExeption = require('../utilities/routeExeption');
const upload = require('./middlewares/multer');

const router = express.Router();

router.post('/upload', upload.array('files', 12), async (req, res) => {
  try {
    const { body, files } = req;
    if (!files) {
      return res.send({ success: false });
    }

    const result = await createPhoto({ body, files });

    return res.send(result);
  } catch (error) {
    console.error(error);
    return routeExeption(res, 500, error);
  }
});

router.get('/all', async (_, res) => {
  try {
    const result = await findPhotos();

    return res.send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).errored(error);
  }
});

module.exports = router;
