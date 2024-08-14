import React, { useEffect, useState } from "react";
import DeviceCard from "../components/DeviceCard";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";

import { IoLogOut } from "react-icons/io5";
import AddModal from "../components/AddModal";
import { useNavigate } from "react-router-dom";
import { getDevices } from "../store/slices/devieSlice";
import { logout, removeToken } from "../store/slices/authSlice";
import Tooltip from "../components/Tooltip";

interface Device {
  id: number;
  name: string;
  temperature?: number;
  speed?: number;
  status?: string;
  lastUpdated?: string;
}

const DeviceManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { devices } = useSelector((state: RootState) => state.device);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [currentAdd, setCurrentAdd] = useState<Device | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDevices());
  }, []);

  const openAddModal = (item: Device) => {
    setCurrentAdd(item);
    setAddModalOpen(true);
  };

  const logOut = () => {
    dispatch(removeToken());
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className=" flex h-screen bg-gray-300">
      <div className="container mx-auto p-4">
        <div className="mb-4 flex justify-between">
          <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-700 via-sky-700 to-green-700">
            Device Management
          </p>
          <div className="flex flex-row justify-center items-center">
            <p
              onClick={() => openAddModal({ id: 1, name: "Item 1" })}
              className="text-md font-bold text-green-700 pr-3 cursor-pointer"
            >
              Add Device
            </p>
            <Tooltip content="Logout" className="w-[80px] top-30">
            <IoLogOut
              className="text-3xl font-bold cursor-pointer text-red-700"
              onClick={logOut}
            />
            </Tooltip>
          </div>
        </div>
        <div className="h-[3px] w-full mb-4 rounded-md bg-white" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.isArray(devices) &&
            devices.map((device) => (
              <DeviceCard
                id={device.id}
                deviceName={device.name}
                temperature={device.temperature}
                speed={device.speed}
                status={device.status}
                lastUpdated={device.updateAt}
              />
            ))}

          {currentAdd && (
            <AddModal
              isOpen={isAddModalOpen}
              onClose={() => setAddModalOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceManagement;
