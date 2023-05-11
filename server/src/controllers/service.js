const { Service } = require('../models');

exports.createService = async (data) => {
  const service = await Service.create({
    ...data,
  });

  return { success: true, service };
};

exports.updateService = async (service, data) => {
  await service.update(data);

  return { success: true, service };
};

exports.deleteService = async (user) => {
  await user.destroy();
};

exports.getAll = async () => {
  const services = await Service.findAll({
    include: 'record',
  });

  return { success: true, services };
};

exports.getOne = async (param) => {
  const service = await Service.findOne({
    where: { param },
    include: 'record',
  });
  if (!service) {
    return { success: false };
  }

  return { success: true, service };
};
