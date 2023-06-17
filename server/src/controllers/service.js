const { Service } = require('../models');

exports.createService = async (data) => {
  const service = await Service.create({
    ...data,
  });

  return { success: true, service };
};

exports.updateService = async (id, data) => {
  try {
    await Service.update(data, { where: { id } });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

exports.deleteService = async (service) => {
  try {
    await service.destroy();
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

exports.getAll = async () => {
  const services = await Service.findAll({
    include: 'record',
  });

  return { success: true, services };
};

exports.getOne = async (id) => {
  try {
    const service = await Service.findOne({
      where: { id },
      include: 'record',
    });

    if (!service) {
      return { success: false };
    }

    return { success: true, service };
  } catch (error) {
    return console.log(error);
  }
};
