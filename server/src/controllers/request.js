const { Request } = require('../models');

exports.findRequests = async () => {
  try {
    const requests = await Request.findAll();
    return { success: true, requests };
  } catch (error) {
    console.error(new Error(error));
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.createRequest = async (body) => {
  try {
    await Request.create(body);

    return { success: true, message: 'Request successfully created' };
  } catch (error) {
    console.error(error);
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.updateRequest = async ({ id }) => {
  try {
    await Request.update({ is_answered: true }, { where: { id } });

    return { success: true, message: 'Статус обращения успешно обновлён' };
  } catch (error) {
    console.error(error);
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};
