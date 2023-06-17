import { getData, postData } from "./index";

export const getUserData = async () => {
  const { success, user, message } = await getData("/user/details");

  return { success, user, message };
};

export const updateUserData = async (userId, data) => {
  const { success, message } = await postData("/user/update", { userId, ...data });

  return { success, message };
};
