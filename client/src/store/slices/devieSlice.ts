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

interface AddAction {
    name: string;
    status: string;
    temperature: number;
    speed: number;
  }

  interface UpdateAction {
    id: number;
    status: string;
    temperature: number;
    speed: number;
  }

export const getDevices = createAsyncThunk(
    "device/getDevices",
    async () => {
        const response = await httpClient.get('http://localhost:3001/device/list');
        return response.data;
    }
);      

export const addDevice = createAsyncThunk(
    "device/addDevice",
    async (addDerive: AddAction) => {
      const response = await httpClient.post(`http://localhost:3001/device/add`, addDerive);
      return response.data;
    }
  );

  export const updateDevice = createAsyncThunk(
    "device/updateDevice",
    async (updateDevice: UpdateAction) => {
      const response = await httpClient.put(`http://localhost:3001/device/update/${updateDevice.id}`, updateDevice);
      return response.data;
    }
  );
  
  export const removeDevice = createAsyncThunk(
    "device/removeDevice",
    async (id: number) => {
      const response = await httpClient.delete(`http://localhost:3001/device/remove/${id}`);
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
            .addCase(getDevices.rejected, (state,action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to fetch devices";
            })

            .addCase(addDevice.pending, (state) => {
                state.status = "loading";
            })  

            .addCase(addDevice.fulfilled, (state, action) => {
                state.status = "success";
                state.devices = action.payload;
            })
            .addCase(addDevice.rejected, (state) => {
                state.status = "failed";
            })  

            .addCase(updateDevice.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateDevice.fulfilled, (state, action) => {
                state.status = "success";
                state.devices = action.payload;
            })
            .addCase(updateDevice.rejected, (state) => {
                state.status = "failed";
            })  

            .addCase(removeDevice.pending, (state) => {
                state.status = "loading";
            })
            .addCase(removeDevice.fulfilled, (state, action) => {
                state.status = "success";
                state.devices = action.payload;
            })
            .addCase(removeDevice.rejected, (state) => {
                state.status = "failed";
            })

    },
});

export const deviceSelector = (state: RootState) => state.device;
export default deviceSlice.reducer  