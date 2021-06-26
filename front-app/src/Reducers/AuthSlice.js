import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../Utils/setAuthToken";

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/", data, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const res = await axios.get("/api/auth");
  return res.data;
});

export const checkDB = createAsyncThunk(
  "auth/checkDB",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/database/check", data, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const changeConnection = createAsyncThunk(
  "auth/changeConnection",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put("/api/users/", data, config);
      return res.data;
    } catch (errors) {
      return rejectWithValue(errors.response.data.errors);
    }
  }
);

export const addExpert = createAsyncThunk(
  "auth/addExpert",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/users", data, config);
      return res.data;
    } catch (errors) {
      return rejectWithValue(errors.response.data.errors);
    }
  }
);

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: null,
  loading: true,
  user: null,
  errors: [],
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
    removeAlert: (state) => {
      state.errors = [];
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
        setAuthToken(action.payload.token);
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(checkDB.fulfilled, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(changeConnection.fulfilled, (state, action) => {
        state.user = action.payload;
        state.errors = [{ msg: "Подключение обновлено", variant: "success" }];
      })
      .addCase(changeConnection.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(addExpert.fulfilled, (state, action) => {
        state.errors = action.payload;
      });
  },
});

export const { logOut, removeAlert } = AuthSlice.actions;

export const selectAuth = (state) => state.auth;

export const clearErrors = () => (dispatch) => {
  setTimeout(() => {
    console.log("Hello WORLD");
    dispatch(removeAlert());
  }, 5000);
};

export default AuthSlice.reducer;
