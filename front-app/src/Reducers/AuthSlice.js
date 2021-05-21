import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../Utils/setAuthToken";

export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const res = await axios.get("/api/auth");
  return res.data;
});

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

export const login = createAsyncThunk("auth/login", async (data) => {
  const res = await axios.post("/api/auth", data, config);
  return res.data;
});

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: null,
  loading: true,
  user: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        localStorage.setItem(action.payload);
      });
  },
});

export const selectAuth = (state) => state.auth;
export default AuthSlice.reducer;
