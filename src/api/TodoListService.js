import {
  getUrlOnBackend,
  postDataToBackend,
  putUrlOnBackend,
  deleteDataToBackend,
} from "./ApiService";

import { LOCALURL } from "./env";
export const addTodosAPI = async (val) => {
  const response = await postDataToBackend(`${LOCALURL}/todo`, {
    value: val.text,
  });
  return response;
};

export const updateTodoById = async ({ id, value, done }) => {
  const response = await putUrlOnBackend(`${LOCALURL}/todo/${id}`, {
    value,
    done,
  });
  return response;
};
