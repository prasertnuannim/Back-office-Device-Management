import React from 'react';
import { Link } from 'react-router-dom';

const ManageDevices = () => {
  const drives = [
    { id: 1, name: 'Drive 1', status: 'Active' },
    { id: 2, name: 'Drive 2', status: 'Inactive' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 bg-white">Manage Drives</h1>
      <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Drive
      </Link>
      <div className="mt-4">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drives.map((drive) => (
              <tr key={drive.id}>
                <td className="border px-4 py-2">{drive.name}</td>
                <td className="border px-4 py-2">{drive.status}</td>
                <td className="border px-4 py-2">
                  <Link
                    to={`/edit/${drive.id}`}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(drive.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const handleDelete = (id:any) => {
  console.log(`Delete drive with id ${id}`);
};

export default ManageDevices;
