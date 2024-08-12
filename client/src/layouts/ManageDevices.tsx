import React, { useEffect } from "react";
import DeviceCard from "../components/DeviceCard";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { getDevices } from "../store/slices/devieSlice";
import { IoLogOut } from "react-icons/io5";

const devices = [
  {
    id: 1,
    name: "Device 1",
    status: "Online",
    temperature: 25,
    speed: "1000 /rpm",
    lastUpdated: "2024-08-12",
  },
  {
    id: 2,
    name: "Device 2",
    status: "Offline",
    temperature: 30,
    speed: "1000 /rpm",
    lastUpdated: "2024-08-11",
  },
  {
    id: 3,
    name: "Device 3",
    status: "Maintenance",
    temperature: 35,
    speed: "1000 / rpm",
    lastUpdated: "2024-08-10",
  },
];

const DeviceManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { devices } = useSelector((state: RootState) => state.device);
  useEffect(() => {
    dispatch(getDevices());
  }, []);

  // console.log("Deive Data : ", devices.getDevices)
  return (
    <div className="backdrop-blur-sm flex h-screen">
      <div className="container mx-auto p-4 ">
        <div className="mb-4 flex justify-between">
          <p className="text-3xl font-bold text-white ">Device Management</p>
          <IoLogOut className="text-3xl font-bold cursor-pointer text-red-700" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {devices.map((device: any) => (
            <DeviceCard
              key={device.id}
              deviceName={device.name}
              temperature={device.temperature}
              speed={device.speed}
              status={device.status}
              lastUpdated={device.lastUpdated}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeviceManagement;
