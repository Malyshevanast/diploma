const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function authCheck(role) {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(203).send({ success: false, message: 'Token has not been presented' });
      }

      if (req.method === 'OPTIONS') {
        return next();
      }

      const decodedData = jwt.verify(token, process.env.JWT_KEY);
      if (!decodedData) {
        return res.status(203).send({ success: false, message: 'Invalid token' });
      }

      if (role !== decodedData.role) {
        return res.status(203).send({ success: false, message: 'Access denied' });
      }

      req.user = decodedData;

      return next();
    } catch (error) {
      console.log(error);
      return res.status(500).send({ success: false, message: 'Server error' });
    }
  };
};
