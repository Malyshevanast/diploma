import { getData, postData } from "./index";

const getRecords = async () => {
  const { success, records, message } = await getData("/record/all");

  return { success, records, message };
};

const createRecord = async (data) => {
  const { success, code, message } = await postData("/record/create", data);

  return { success, code, message };
};

export { getRecords, createRecord };
