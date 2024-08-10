import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import httpClient from "../../utils/httpClient";

interface UserState {
  accessToken: string;
  user: any;
  token: string | null;
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  count: number;
}

const initialState: UserState = {
  accessToken: "",
  user: null,
  token: null,
  status: "idle",
  error: null,
  isAuthenticated: false,
  isAuthenticating: true,
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
      state.token = null;
      state.status = "idle";
      state.error = null;
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
           state.token = action.payload.token;
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
        state.token = action.payload.token;
      })

      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { changeState, logout } = userSlice.actions;
export const authSelector = (state: RootState) => state.auth;
