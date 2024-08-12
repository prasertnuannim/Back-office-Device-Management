import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import httpClient from "../../utils/httpClient";

interface DeviceState {
    devices: any;
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
}

const initialState: DeviceState = {
    devices: [],
    status: "idle",
    error: null
}

export const getDevices = createAsyncThunk(
    "device/getDevices",
    async () => {
        const response = await httpClient.get('http://localhost:3001/device/list');
        console.log("geteDevices", response.data);
        return response.data;
    }
);      

const deviceSlice = createSlice({
    name: "device",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDevices.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getDevices.fulfilled, (state, action) => {
                state.status = "success";
                state.devices = action.payload;
            })
            .addCase(getDevices.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const deviceSelector = (state: RootState) => state.device;
export default deviceSlice.reducer  