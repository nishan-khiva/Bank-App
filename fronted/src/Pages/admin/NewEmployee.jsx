import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });
  const [message, setMessage] = useState('');

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('emplytoken');
      const res = await axios.get('http://localhost:4000/api/emply/getemply', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Fetched employees:', res.data);
      setEmployees(res.data.employees);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/emply/register',{
        ...formData
      }, {
        headers: {    
          Authorization: `Bearer ${localStorage.getItem('emplytoken')}`
        }
      });
      setMessage('Employee registered successfully!');
      setFormData({ name: '', email: '', password: '', role: '' });
      setShowForm(false);
      fetchEmployees();
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setMessage('Failed to register employee.');
    }
  };

  return (
    <div className=" p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Employee List</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Employee
        </button>
      </div>

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table className="w-full border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3 border">Employee ID</th>
              <th className="py-2 px-3 border">Name</th>
              <th className="py-2 px-3 border">Email</th>
              <th className="py-2 px-3 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp._id}>
                <td className="py-2 px-3 border">{emp.employeeId}</td>
                <td className="py-2 px-3 border">{emp.name}</td>
                <td className="py-2 px-3 border">{emp.email}</td>
                <td className="py-2 px-3 border capitalize">{emp.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Register New Employee</h2>
            {message && (
              <div className="mb-4 text-sm text-green-600">{message}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="cashier">Cashier</option>
                <option value="customer">Customer</option>
              </select>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
