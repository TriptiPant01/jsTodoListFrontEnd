import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setUserRegister } from "../api/RegisterService";
import { login } from "../api/LoginService";
import { STATUSES } from "./todoSlice";

const initialState = {
  token: null,
  isLoggedIn: false,
  userDetail: {},
  // status: STATUSES.IDLE,
  isUserRegister: false,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ fullname, email, password }, { rejectWithValue }) => {
    try {
      const res = await setUserRegister({ fullname, email, password });

      if (!res) {
        return rejectWithValue(res);
      } else {
        return res.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data.message);
      //   console.log(err);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password, avatarIcon }, { rejectWithValue }) => {
    try {
      const res = await login({ email, password, avatarIcon });

      if (!res) {
        return rejectWithValue(false);
      } else {
        return res.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
      //   console.log(err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.userDetail = {};
    },
    setLogin: (state, action) => {
      state.token = action.payload.token;
      state.userDetail = action.payload.userDetail;
    },
    // setRegisterTab: (state, action) => {
    //   state.selectedRegisterTab = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.isUserRegister = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        // console.log(action);
        state.status = STATUSES.ERROR;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action, "action");
        state.status = STATUSES.IDLE;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.userDetail = {
          fullname: action.payload.fullName,
          email: action.payload.email,
          profilePic: action.payload.profilePic,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setLogin, setLogout, setRegisterTab } = authSlice.actions;

export default authSlice.reducer;
