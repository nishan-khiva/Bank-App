// src/pages/manager/Dashboard.jsx
import React from 'react';

const ManagerDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow-md p-4 rounded">Pending Approvals</div>
        <div className="bg-white shadow-md p-4 rounded">Branch Performance</div>
        <div className="bg-white shadow-md p-4 rounded">Cashier Overview</div>
        <div className="bg-white shadow-md p-4 rounded">High Value Transactions</div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
