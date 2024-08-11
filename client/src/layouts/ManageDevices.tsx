import React from 'react';
import DeviceCard from '../components/DeviceCard';

const devices = [
  { id: 1, name: 'Device 1', status: 'Online', temperature: 25, speed: "1000 /rpm", lastUpdated: '2024-08-12' },
  { id: 2, name: 'Device 2', status: 'Offline', temperature: 30, speed: "1000 /rpm", lastUpdated: '2024-08-11' },
  { id: 3, name: 'Device 3', status: 'Maintenance',temperature: 35,speed: "1000 / rpm",  lastUpdated: '2024-08-10' },
];

const DeviceManagement: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Device Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {devices.map(device => (
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
  );
};

export default DeviceManagement;
