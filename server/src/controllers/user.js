const { hash } = require('bcryptjs');
const { User } = require('../models');
const emailCodeGen = require('../utilities/emailCodeGen');

exports.register = async (data) => {
  const { password } = data;
  const passwordHash = await hash(password, 10);

  const emailCode = emailCodeGen();

  const user = await User.create({
    ...data,
    email_confirmation_code: emailCode,
    password: passwordHash,
  });

  return { success: true, user };
};

exports.update = async (user, data) => {
  const { password } = data;
  if (password) {
    const passwordHash = await hash(password, 10);
    data.password = passwordHash;
  }

  await user.update(data);

  return { success: true, user };
};

exports.delete = async (user) => {
  await user.destroy();
};

exports.getAll = async () => {
  const users = await User.findAll({
    include: 'records',
  });

  return { success: true, users };
};
exports.getUserDetails = async (id) => {
  try {
    const user = await User.findOne({
      where: { id },
      include: { all: true, nested: true },
    });
    if (!user) {
      return { success: false };
    }

    return { success: true, user };
  } catch (error) {
    return console.log(error);
  }
};
