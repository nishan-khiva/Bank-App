// src/pages/admin/Dashboard.jsx
import React from 'react';

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-red-700">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white shadow-md p-4 rounded">Total Users</div>
        <div className="bg-white shadow-md p-4 rounded">Total Branches</div>
        <div className="bg-white shadow-md p-4 rounded">System Logs</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
