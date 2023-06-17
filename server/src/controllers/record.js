const { Record } = require('../models');

exports.createRecord = async (data) => {
  const record = await Record.create({
    ...data,
  });

  return { success: true, record };
};

exports.updateRecord = async (id, data) => {
  await Record.update(data, { where: { id } });

  return { success: true };
};

exports.deleteRecord = async (id) => {
  await Record.destroy({ where: { id } });

  return { success: true };
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
