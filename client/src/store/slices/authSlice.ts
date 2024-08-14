import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import httpClient from "../../utils/httpClient";

interface UserState {
  accessToken: string;
  user: any;
  token: string | null;
  status: "idle" | "loading" | "success" | "failed";
  statusRegister: "idle" | "loading" | "success" | "failed";
  statusLogin: "idle" | "loading" | "success" | "failed";
  error: string | null;
  count: number;
}

const initialState: UserState = {
  accessToken: "",
  user: null,
  token: localStorage.getItem("authToken"),
  status: "idle",
  statusRegister  : "idle",
  statusLogin : "idle",
  error: null,
  count: 0,
};

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
    const response = await httpClient.post(
      `http://localhost:3001/auth/login`,
      credential
    );
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (credential: RegisterAction) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await httpClient.post(
      `http://localhost:3001/auth/register`,
      credential
    );
    return response.data;
  }
);

export const removeToken = createAsyncThunk("user/removeToken", async () => {
  const response = await httpClient.delete(
    `http://localhost:3001/auth/deleteToken`
  );
  console.log("de;ete token : ", response.data);
  return response.data;
});

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.statusLogin = "idle";
      state.status = "idle";
      state.error = null;
      state.token = null;
      // removeToken();
      //   Cookies.remove("token", { path: "" });
    },
  },

  extraReducers: (builder) => {
    builder

      // Register
      .addCase(registerUser.pending, (state) => {
        state.statusRegister = "loading";
      })

      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<UserResponse>) => {
          state.statusRegister = "success";
          state.user = action.payload.user;
        }
      )

      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.statusRegister = "failed";
        state.error = action.payload;
      })

      //Login
      .addCase(loginUser.pending, (state) => {
        state.statusLogin = "loading";
      })

      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.statusLogin = "success";
        state.user = action.payload.user;
        // let expireTime = new Date(new Date().getTime() + 60 * 60 * 1000);
        // Cookies.set("token", action.payload.token, {
        //   expires: expireTime,
        //   secure: true,
        // });
      })

      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.statusLogin = "failed";
        state.error = action.payload;
      })

      .addCase(removeToken.pending, (state) => {
        state.status = "loading";
      })

      .addCase(removeToken.fulfilled, (state) => {
        // state.status = "success";
        state.statusLogin = "idle";
        ///state.status = "idle";
      })
      .addCase(removeToken.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { logout } = userSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default userSlice.reducer;
