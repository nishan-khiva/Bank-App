import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Approvels from './Approvels';

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState(" ");
  const navigate = useNavigate();
  return (
    <div className=" flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-blue-100 text-white p-6 space-y-1">
        <h1 className="text-xl font-bold  text-blue-700 ">Manager Dashboard</h1>
        {["Pending Approvals", "Cashier Overview", "Branch Performance", "High Value Transactions"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="w-full text-left px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition mt-2"
          >
            {tab === "Pending Approvals" && "Pending Approvals"}
            {tab === "Cashier Overview" && "Cashier Overview"}
            {tab === "Branch Performance" && "Branch Performance"}
            {tab === "High Value Transactions" && "High Value Transactions"}
          </button>
        ))}
        <button
          onClick={() => {
            localStorage.removeItem('emplytoken');
            localStorage.removeItem('role');
            navigate('/login');
          }}
          className="w-full text-left px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition mt-2"
        >
          Log out
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-4">
          {activeTab === "Pending Approvals" && <Approvels />}
      </div>
    </div>
  );
};

export default ManagerDashboard;
