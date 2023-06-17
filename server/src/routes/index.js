const express = require('express');
const photoRoutes = require('./photo');
const userRoutes = require('./user');
const recordRoutes = require('./record');
const requestRoutes = require('./request');
const serviceRoutes = require('./service');
const upload = require('./middlewares/multer');

const router = express.Router();

router.use('/user', upload.none(), userRoutes);
router.use('/photo', photoRoutes);
router.use('/service', upload.none(), serviceRoutes);
router.use('/record', upload.none(), recordRoutes);
router.use('/request', upload.none(), requestRoutes);

module.exports = router;
