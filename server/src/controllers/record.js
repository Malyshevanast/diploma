const { Record, User } = require('../models');

exports.createRecord = async (data) => {
  const record = await Record.create({
    ...data,
  });

  return { success: true, record };
};

exports.updateRecord = async (record, data) => {
  await record.update(data);

  return { success: true, record };
};

exports.deleteRecord = async (user) => {
  await user.destroy();
};

exports.getOne = async (param) => {
  const record = await Record.findOne({
    where: { param },
    include: ['client', 'service'],
  });
  if (!record) {
    return { success: false };
  }

  return { success: true, record };
};

exports.getAll = async () => {
  const records = await Record.findAll({
    include: ['client', 'service'],
  });

  return { success: true, records };
};
