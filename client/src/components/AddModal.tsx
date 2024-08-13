import React, { useState } from "react";
import { useAppDispatch } from "../store/store";
import { addDevice, getDevices } from "../store/slices/devieSlice";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  //onAdd: (newItem: { id: number; name: string }) => void;
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<any>("idle");
  const [temperature, setTemperature] = useState<any>(33);
  const [speed, setSpeed] = useState<any>(0);
  const [none, setNone] = useState<any>(false);
  const dispatch = useAppDispatch();
  const handleSave = () => {
    if (name.trim() === "") {
      setNone(true);
      return;
    }
    dispatch(addDevice({ name, status, temperature, speed }));
    onClose();
    setName("");
    setTimeout(() => {
      dispatch(getDevices());
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Add New Device</h2>
        {none && <p className="text-red-500 3">Please enter device name</p>}
        {!none && <p>Enter device name</p>}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 w-full mb-4"
        />

        <p>Status</p>
        <input
          type="string"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded p-2 w-full mb-4"
        />

        <p>Temperature (°C)</p>
        <input
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          className="border rounded p-2 w-full mb-4"
        />
        <p>Speed (rpm)</p>
        <input
          type="number"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          className="border rounded p-2 w-full mb-4"
        />

        <div className="flex justify-end">
          <button
            onClick={() => {
              setNone(false);
              onClose();
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
