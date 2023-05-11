const router = require('express').Router();
const {
  createRecord,
  updateRecord,
  deleteRecord,
  getAll,
  getOne,
} = require('../controllers/record');
const routeExeption = require('../utilities/routeExeption');

router.post('/create', async (req, res) => {
  try {
    const { body } = req;
    const { success, record } = await createRecord(body);
    if (!success) {
      return res.send({ success, message: 'Ошибка на стороне сервера' });
    }

    return res.status(201).send({ success, record, message: 'Успешная запись' });
  } catch (error) {
    console.log(error);
    return routeExeption(res, error);
  }
});

router.post('/update', async (req, res) => {
  try {
    const { record, body } = req;
    if (!record) {
      return res.send({ success: false, message: 'Запись не найдена' });
    }

    const { success } = await updateRecord(record, body);
    if (!success) {
      return res.send({ success, message: 'Не удалось обновить запись!' });
    }

    return res.status(201).send({ success });
  } catch (error) {
    console.log(error);
    return routeExeption(res, error);
  }
});

router.post('/delete', async (req, res) => {
  try {
    const { record } = req;

    if (!record) {
      return res.send({ success: false, message: 'Запись не найдена' });
    }

    const { success } = await deleteRecord(record);
    if (!success) {
      return res.send({ success, message: 'Не удалось удалить запись' });
    }

    return res.status(200).send({ success });
  } catch (error) {
    console.log(error);
    return routeExeption(res, error);
  }
});

router.get('/all', async (_, res) => {
  try {
    const { success, records } = await getAll();

    return res.status(200).send({ success, records });
  } catch (error) {
    console.log(error);
    return routeExeption(res, error);
  }
});

router.get('/get-one', async (req, res) => {
  try {
    const { query } = req;
    const { param } = query;
    const { success, record } = getOne(param);
    if (!success) {
      return res.send({ success, message: 'Не удалось найти запись' });
    }

    return res.send({ success, record });
  } catch (error) {
    console.log(error);
    return routeExeption(res, error);
  }
});

module.exports = router;
