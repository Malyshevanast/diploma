const router = require('express').Router();
const {
  createService,
  updateService,
  deleteService,
  getAll,
  getOne,
} = require('../controllers/service');
const routeExeption = require('../utilities/routeExeption');

router.post('/create', async (req, res) => {
  try {
    const { body } = req;
    const { success, service } = await createService(body);
    if (!success) {
      return res.send({ success, message: 'Ошибка на стороне сервера' });
    }

    return res.status(201).send({ success, service, message: 'Услуга добавлена успешно' });
  } catch (error) {
    console.log(error);
    return routeExeption(res, error);
  }
});

router.post('/update', async (req, res) => {
  try {
    const { service, body } = req;

    if (!service) {
      return res.send({ success: false, message: 'Услуга не найдена' });
    }

    const { success } = await updateService(service, body);
    if (!success) {
      return res.send({ success, message: 'Не удалось обновить услугу!' });
    }

    return res.status(201).send({ success });
  } catch (error) {
    console.log(error);
    return routeExeption(res, error);
  }
});

router.post('/delete', async (req, res) => {
  try {
    const { service } = req;

    if (!service) {
      return res.send({ success: false, message: 'Услуга не найдена' });
    }

    const { success } = await deleteService(service);
    if (!success) {
      return res.send({ success, message: 'Не удалось удалить услугу' });
    }

    return res.status(200).send({ success });
  } catch (error) {
    console.log(error);
    return routeExeption(res, error);
  }
});

router.get('/all', async (_, res) => {
  try {
    const { success, services } = await getAll();

    return res.status(200).send({ success, services });
  } catch (error) {
    console.log(error);
    return routeExeption(res, error);
  }
});

router.get('/get-one', async (req, res) => {
  try {
    const { query } = req;
    const { param } = query;
    const { success, service } = getOne(param);
    if (!success) {
      return res.send({ success, message: 'Услуга не найдена' });
    }

    return res.send({ success, service });
  } catch (error) {
    console.log(error);
    return routeExeption(res, error);
  }
});

module.exports = router;
