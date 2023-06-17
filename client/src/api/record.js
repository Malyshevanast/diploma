import { getData, postData } from "./index";

const getRecords = async () => {
  try {
    const { success, records, message } = await getData("/record/all");

    return { success, records, message };
  } catch (error) {
    return console.log(error);
  }
};

const createRecord = async (data) => {
  try {
    const { success, code, message } = await postData("/record/create", data);

    return { success, code, message };
  } catch (error) {
    return console.log(error);
  }
};

const updateRecord = async (recordId, data) => {
  try {
    const { success, code, message } = await postData("/record/update", { recordId, ...data });

    return { success, code, message };
  } catch (error) {
    return console.log(error);
  }
};

const deleteRecord = async (recordId) => {
  try {
    await postData("/record/delete", { recordId });
  } catch (error) {
    console.log(error);
  }
};

export { getRecords, createRecord, updateRecord, deleteRecord };
