import { getData, postData } from "./index";

const getServices = async () => {
  const { success, services, message } = await getData("/service/all");

  return { success, services, message };
};

const createService = async () => {
  const { success, service, message } = await postData("/service/create");

  return { success, service, message };
};

export { getServices, createService };
