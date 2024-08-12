import React, { useEffect } from "react";
import { useAppDispatch } from "../store/store";
import { getDevices, removeDevice } from "../store/slices/devieSlice";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  itemName: string;
  id: number;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onDelete, itemName, id }) => {
  const dispatch = useAppDispatch();
  if (!isOpen) return null;

  const handleDelete = () => {
    dispatch(removeDevice(id));
    onClose();
    setTimeout(() => {
      dispatch(getDevices());
    }, 100);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Delete {itemName}?</h2>
        <p className="mb-6">Are you sure you want to delete {itemName}? This action cannot be undone.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
