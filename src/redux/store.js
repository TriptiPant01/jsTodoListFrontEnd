import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    todo: todoReducer,
    auth: authSlice,
  },
});

export default store;
