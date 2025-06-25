import React, { useState, useEffect } from 'react';
import api from '../../Api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [custumer, setCustumer] = useState([]);
  const navigate = useNavigate()

  const fetchCustumers = async () => {
    try {
      const token = localStorage.getItem('emplytoken');
      const res = await api.get('/api/custumer/getcustumers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCustumer(res.data.custumers);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    fetchCustumers();
  }, []);


  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Custumer List</h1>
        <button
          onClick={() => navigate('/admin/add-custumer')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Custumer
        </button>
      </div>
      <div className="p-6 bg-white rounded shadow">
        {custumer.length === 0 ? (
          <p>No custumers found.</p>
        ) : (
          <table className="w-full border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3 border">Custumer ID</th>
                <th className="py-2 px-3 border">Account No</th>
                <th className="py-2 px-3 border">Name</th>
                <th className="py-2 px-3 border">Email</th>
                <th className="py-2 px-3 border">Status</th>

              </tr>
            </thead>
            <tbody>
              {custumer.map(cus => (
                <tr key={cus._id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate(`/admin/cus-details/${cus.custumerId}`)}>
                  <td className="py-2 px-3 border">{cus.custumerId}</td>
                  <td className="py-2 px-3 border">{cus.accountno}</td>
                  <td className="py-2 px-3 border">{cus.name}</td>
                  <td className="py-2 px-3 border">{cus.email}</td>
                  <td className='py-2 px-3 border'>{cus.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </>
  );
};

export default EmployeeList;
