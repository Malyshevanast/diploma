module.exports = function routeExeption(res, error, message) {
  res.status(500).send({ error, message: message || 'Ошибка на стороне сервера' });
};
