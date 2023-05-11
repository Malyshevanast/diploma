const { Sequelize, User } = require('../../models');

const { Op } = Sequelize;

module.exports = async function checkUser(req, res, next) {
  try {
    const { username, email } = req.body;

    const user = await User.findOne({
      where: { [Op.or]: [{ username: username || '' }, { email: email || '' }] },
    });

    req.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).send(new Error(error));
  }
};
