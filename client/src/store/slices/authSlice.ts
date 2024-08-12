import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import httpClient from "../../utils/httpClient";

interface UserState {
  accessToken: string;
  user: any;
  token: string | null;
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
  count: number;
}

const initialState: UserState = {
  accessToken: "",
  user: null,
  token: localStorage.getItem('authToken'),
  status: "idle",
  error: null,
  count: 0,
};

interface RegisterUser {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginAction {
  username: string;
  password: string;
}

interface RegisterAction {
  username: string;
  password: string;
  email: string;
}

interface UserResponse {
  user: any;
  token: string;
}

export const loginUser = createAsyncThunk(
  "user/login",
  async (credential: LoginAction) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await httpClient.post(`http://localhost:3001/auth/login`, credential);
      return response.data;
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (credential: RegisterAction) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await httpClient.post(`http://localhost:3001/auth/register`, credential);
      return response.data;
  }
);


const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeState: (state) => {
      state.status = "idle";
    },

    logout(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
      state.token = null;
      localStorage.removeItem("authToken");
    },
  },

  extraReducers: (builder) => {
    builder

      // Register
       .addCase(registerUser.pending, (state) => {
         state.status = "loading";
       })

       .addCase(
         registerUser.fulfilled,
         (state, action: PayloadAction<UserResponse>) => {
           state.status = "success";
           state.user = action.payload.user;
         })

       .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
         state.status = "failed";
         state.error = action.payload;
       })

      //Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })

      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "success";
        state.user = action.payload.user;
        localStorage.setItem('authToken', action.payload.token);
      })

      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { changeState, logout} = userSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default userSlice.reducer;