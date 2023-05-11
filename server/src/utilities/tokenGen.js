const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function tokenGen(id, role) {
  const payload = { id, role };

  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });
};
