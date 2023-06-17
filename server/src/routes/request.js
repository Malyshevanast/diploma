const express = require('express');
const { createRequest, findRequests, updateRequest } = require('../controllers/request');
const routeExeption = require('../utilities/routeExeption');

const router = express.Router();

router.get('/all', async (_, res) => {
  try {
    const result = await findRequests();

    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).errored(error);
  }
});

router.post('/create', async (req, res) => {
  try {
    const { body } = req;
    const result = await createRequest(body);

    return res.status(201).send(result);
  } catch (error) {
    console.error(error);
    return routeExeption(res, 500, error);
  }
});

router.post('/update', async (req, res) => {
  try {
    const { requestId } = req.body;
    const result = await updateRequest({ id: requestId });

    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return routeExeption(res, 500, error);
  }
});

module.exports = router;
