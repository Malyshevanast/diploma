import { getData, postData } from "./index";

const getServices = async () => {
  const { success, services, message } = await getData("/service/all");

  return { success, services, message };
};

const createService = async (data) => {
  const { success, service, message } = await postData("/service/create", data);

  return { success, service, message };
};

const updateService = async (serviceId, data) => {
  try {
    const { success, message } = await postData("/service/update", { serviceId, ...data });

    return { success, message };
  } catch (error) {
    return console.error(error);
  }
};

const deleteService = async (serviceId) => {
  try {
    const { status } = await postData("/service/delete", { serviceId });

    return { status };
  } catch (error) {
    return console.log(error);
  }
};

export { getServices, createService, updateService, deleteService };
