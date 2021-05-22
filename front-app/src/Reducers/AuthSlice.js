import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../Utils/setAuthToken";

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

export const mess = () => {
  console.log("Hello from mess func");
};

export const login = createAsyncThunk("auth/login", async (data) => {
  const res = await axios.post("/api/auth/", data, config);
  loadUser();
  mess();
  return res.data;
});

export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const res = await axios.get("/api/auth");
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
  reducers: {
    logOut: (state) => {
      state.token = "";
      state.isAuth = null;
      state.loading = true;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      });
  },
});

export const { logOut } = AuthSlice.actions;

export const selectAuth = (state) => state.auth;

export default AuthSlice.reducer;
