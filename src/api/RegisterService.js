import { postDataToBackend } from "./ApiService";

import { LOCALURL } from "./env";
export const setUserRegister = async ({ fullname, email, password }) => {
  try {
    const data = { fullname, email, password };

    const response = await postDataToBackend(`${LOCALURL}/register`, data);
    return response;
  } catch (err) {
    console.log(err);
  }
};
