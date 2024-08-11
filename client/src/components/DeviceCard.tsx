import React from "react";

interface DeviceCardProps {
  deviceName: string;
  status: string;
  temperature: number;
  speed: string;
  lastUpdated: string;
}

const DeviceCard: React.FC<DeviceCardProps> = ({
  deviceName,
  status,
  temperature,
  speed,
  lastUpdated,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between">
      <h2 className="text-xl font-bold mb-2">{deviceName}</h2>
      <p className="text-sm text-gray-600">Status: {status}</p>
      <p className="text-sm text-gray-600">Temperature: {temperature}</p>
      <p className="text-sm text-gray-600">Speed: {speed}</p>
      <p className="text-sm text-gray-600">Last Updated: {lastUpdated}</p>
      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Manage
        </button>
      </div>
    </div>
  );
};

export default DeviceCard;
