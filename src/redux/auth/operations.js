import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.herokuapp.com/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common["Authorization"] = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", newUser);

      setAuthHeader(response.data.token);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (loginInfo, thunkAPI) => {
    try {
      const response = await axios.post("/users/login", loginInfo);

      setAuthHeader(response.data.token);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const reduxState = thunkAPI.getState();
    const savedToken = reduxState.auth.token;
    setAuthHeader(savedToken);
    try {
      const response = await axios.get("/users/current");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.token;
      return savedToken !== null;
    },
  }
);

export const changeUser = createAsyncThunk(
  "auth/change",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.patch(`/contacts/${userId}`);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
    }
  }
);

// email: "john100@gmail.com";
// name: "john";
// password: "johnjohn";

// email: "maria100@mail.com";
// password:  "mariamaria";
