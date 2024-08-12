import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../store/store";
import { getDevices, updateDevice } from "../store/slices/devieSlice";

interface EditModalProps {

  isOpen: boolean;
  onClose: () => void;
  item: {
    id: number;
    name: string;
    status: string;
    temperature: number;
    speed: number;
  };
}

const EditModal: React.FC<EditModalProps> = ({

  isOpen,
  onClose,
  item,
}) => {
  const [editDevice, setEditDevice] = useState({
    id: item.id,
    status: item.status,
    temperature: item.temperature,
    speed: item.speed,
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    setEditDevice({
      id: item.id,
      status: item.status,
      temperature: item.temperature,
      speed: item.speed,
    });
  }, [item]);
  
  const handleSave = () => {
    dispatch(updateDevice({...editDevice }));
    setTimeout(() => {
      dispatch(getDevices());
    }, 100);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="flex text-xl font-semibold mb-4 justify-center">Edit Device {item.name}</h2>

        <p className="text-sm text-gray-300">Edit Status</p>
        <input
          type="text"
          value={editDevice.status}
          onChange={(e) =>
            setEditDevice({ ...editDevice, status: e.target.value })
          }
          className="border rounded p-2 w-full mb-4"
        />

        <p className="text-sm text-gray-300">Edit Temperature (°C)</p>
        <input
          type="number"
          value={editDevice.temperature}
          onChange={(e) =>
            setEditDevice({ ...editDevice, temperature: Number(e.target.value) })
          }
          className="border rounded p-2 w-full mb-4"
        />

        <p className="text-sm text-gray-300">Edit Speed (rpm)</p>
        <input
          type="number"
          value={editDevice.speed}
          onChange={(e) =>
            setEditDevice({ ...editDevice, speed: Number(e.target.value) })
          }
          className="border rounded p-2 w-full mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
