// src/pages/admin/DashboardLayout.jsx
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const SidebarLink = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-2 mt-1 rounded hover:bg-blue-200`
    }
  >
    {label}
  </NavLink>
);

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('emplytoken');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-blue-100 p-4 text-blue-800 font-semibold">
        <h2 className="text-xl font-extrabold mb-4 text-blue-700">Admin Panel</h2>
        <SidebarLink to="/admin" label="Dashboard" />
        <SidebarLink to="/admin/custumers" label="Custumers" />
        <SidebarLink to="/admin/reports" label="Reports" />
        <SidebarLink to="/admin/emply" label=" Employee" />
        <SidebarLink to="/admin/settings" label="Personal Settings" />
        <button onClick={handleLogout} className="ml-4 mt-4">Logout</button>
      </aside>
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
