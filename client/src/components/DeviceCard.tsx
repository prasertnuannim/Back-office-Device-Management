import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

interface DeviceCardProps {
  id: number;
  deviceName: string;
  status: string;
  temperature: number;
  speed: string;
  lastUpdated: string;
}

const DeviceCard: React.FC<DeviceCardProps> = ({
  id,
  deviceName,
  status,
  temperature,
  speed,
  lastUpdated,
}) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState<any>({id: 0, name: "",status: "", temperature: 0, speed: 0});
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentDelete, setCurrentDelete] = useState<any>(null);
  const openEditModal = (item: any) => {
   // setCurrentEdit(item);
   setCurrentEdit({id: id, name: deviceName, status: status, temperature: temperature, speed: speed});
    setEditModalOpen(true);
  };

//  const handleEdit = (updatedItem: any) => {};

  const openDeleteModal = (item: any) => {
    setCurrentDelete(item);
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (currentDelete) {
      setModalOpen(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between">
      <h2 className="text-xl font-bold mb-2 flex justify-center">
        {deviceName}
      </h2>
      <p className="text-sm text-gray-600">Status: {status}</p>
      <p className="text-sm text-gray-600">Temperature: {temperature}</p>
      <p className="text-sm text-gray-600">Speed: {speed}</p>
      <p className="text-sm text-gray-600">Last Updated: {lastUpdated}</p>
      <div className="mt-4 flex justify-end">
        <button
          className="bg-blue-700 text-white rounded p-2 mr-2"
          onClick={() => openEditModal(true)}
        >
          <CiEdit />
        </button>
        <button
          className="bg-red-700 text-white rounded p-2"
          onClick={() => openDeleteModal(true)}
        >
          <MdDelete />
        </button>

        {currentEdit && (
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            item={currentEdit}
           // onEdit={handleEdit}
         //   id={id}
          />
        )}

        {currentDelete && (
          <DeleteModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onDelete={handleDelete}
            itemName={deviceName}
            id={id}
          />
        )}
      </div>
    </div>
  );
};

export default DeviceCard;
