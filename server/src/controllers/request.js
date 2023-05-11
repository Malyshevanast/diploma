const { Request } = require('../models');

exports.createRequest = async (body) => {
  try {
    await Request.create(body);

    return { success: true, message: 'Request successfully created' };
  } catch (error) {
    console.error(error);
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};

exports.findRequests = async () => {
  try {
    const requests = await Request.findAll();
    return { success: true, requests };
  } catch (error) {
    console.error(new Error(error));
    return { status: 500, success: false, message: 'Controller exception', error };
  }
};
