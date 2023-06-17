import { getData, postData } from "./index";

export const getRequests = async () => {
  try {
    const { success, requests, message } = await getData("/request/all");

    return { success, requests, message };
  } catch (error) {
    return console.log(error);
  }
};

export const createRequest = async (data) => {
  try {
    const { success, request, message } = await postData("/request/create", data);

    return { success, request, message };
  } catch (error) {
    return console.log(error);
  }
};

export const updateRequest = async (requestId) => {
  try {
    await postData("/request/update", { requestId });
  } catch (error) {
    console.log(error);
  }
};
