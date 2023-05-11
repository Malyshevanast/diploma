import { getData } from "./index";

export const getUserData = async () => {
  const { success, user, message } = await getData("/user/details");

  return { success, user, message };
};
