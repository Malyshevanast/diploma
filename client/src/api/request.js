import { getData, postData } from "./index";

export const getRequests = async () => {
  const { success, requests, message } = await getData("/request/all");

  return { success, requests, message };
};

export const createRequest = async (data) => {
  const { success, request, message } = await postData("/request/create", data);

  return { success, request, message };
};
