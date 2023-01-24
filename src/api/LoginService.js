import { postDataToBackend } from "./ApiService";

import { LOCALURL } from "./env";
export const login = async ({ email, password }) => {
  try {
    const data = { email, password };

    const response = await postDataToBackend(`${LOCALURL}/login`, data);
    localStorage.setItem("token", response.data.token);
    console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
  }
};
