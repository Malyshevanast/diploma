const { compare } = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const {
  register,
  update,
  delete: deleteUser,
  getAll,
  getUserDetails,
} = require('../controllers/user');
const routeExeption = require('../utilities/routeExeption');
const checkUser = require('./middlewares/check-user');
const checkToken = require('./middlewares/check-token');
require('dotenv').config();

router.post('/auth', checkUser, async (req, res) => {
  try {
    const { user, body } = req;
    if (!user) {
      return res.send({ success: false, message: 'Wrong Credentials' });
    }

    const isCompared = await compare(body.password, user.password);
    if (!isCompared) {
      return res.send({ success: false, message: 'Wrong Credentials' });
    }

    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '6h' });

    return res.status(202).send({ success: true, user, token });
  } catch (error) {
    console.log(error);
    return routeExeption(res, 500, error);
  }
});

router.post('/create', checkUser, async (req, res) => {
  try {
    const { user, body } = req;
    if (user) {
      return res.send({ success: false, message: 'Пользователь уже существует' });
    }
    console.log(body);

    const { success, user: newUser } = await register(body);
    if (!success) {
      return res.send({ success, message: 'Ошибка на стороне сервера' });
    }

    const payload = { id: newUser.id, role: newUser.role };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '6h' });

    return res.status(201).send({ success, user: newUser, token });
  } catch (error) {
    console.log(error);
    return routeExeption(res, 500, error);
  }
});

router.post('/update', checkUser, async (req, res) => {
  try {
    const { userId, username, email, password } = req.body;

    const { success } = await update(userId, { username, email, password });
    if (!success) {
      return res.send({ success, message: 'Something went wrong' });
    }

    return res.status(200).send({ success, message: 'Данные обновлены' });
  } catch (error) {
    console.log(error);
    return routeExeption(res, 500, error);
  }
});

router.post('/delete', checkUser, async (req, res) => {
  try {
    const { user } = req;

    if (!user) {
      return res.send({ success: false, message: 'Пользователь не найден' });
    }

    const { success } = await deleteUser(user);
    if (!success) {
      return res.send({ success, message: 'Something went wrong' });
    }

    return res.status(200).send({ success });
  } catch (error) {
    console.log(error);
    return routeExeption(res, 500, error);
  }
});

router.get('/all', async (_, res) => {
  try {
    const { success, users } = await getAll();

    return res.status(200).send({ success, users });
  } catch (error) {
    console.log(error);
    return routeExeption(res, 500, error);
  }
});

router.get('/details', checkToken, async (req, res) => {
  try {
    const { user: currentUser } = req;
    const { success, user } = await getUserDetails(currentUser.id);
    if (!success) {
      return res.send({ success, message: 'User not found' });
    }

    return res.send({ success, user });
  } catch (error) {
    console.log(error);
    return routeExeption(res, 500, error);
  }
});

module.exports = router;
