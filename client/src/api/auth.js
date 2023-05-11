import { postData } from "./index";

// TODO: rewrite this functions

const signUp = async (data) => {
  const { success, token, code, message } = await postData("/user/create", data);

  return { success, token, code, message };
};

const signIn = async (data) => {
  const { success, token, message } = await postData("/user/auth", data);

  return { success, token, message };
};

export { signUp, signIn };
