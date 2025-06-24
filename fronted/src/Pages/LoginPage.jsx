import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = () => {
  const [loginType, setLoginType] = useState('employee'); 
  const [custumerId, setCustumerId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint =
      loginType === 'customer'
        ? 'http://localhost:4000/api/custumer/login'
        : 'http://localhost:4000/api/emply/login';

    try {
      const res = await axios.post(endpoint, {
        [loginType === 'employee' ? 'employeeId' : 'custumerId']: loginType === 'employee' ? employeeId : custumerId,
        password,
      });

      console.log(res.data);

      if (loginType === 'customer') {
        const { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/customer-dashboard');
      } else {
        // For employee
        const { token, employee } = res.data;
        localStorage.setItem('emplytoken', token);
        localStorage.setItem('role', employee.role);
        localStorage.setItem('employeeName', employee.name);

        if (employee.role === 'admin') {
          navigate('/admin');
        } else if (employee.role === 'manager') {
          navigate('/manager');
        } else if (employee.role === 'cashier') {
          navigate('/cashier-dashboard');
        } else {
          navigate('/customer-dashboard');
        }
      }

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">

      {/* Branding Section */}
      <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-6 sm:px-10 lg:px-20 py-10 lg:w-1/2 w-full">
        <img src="/banklogo.jpg" alt="Bank Logo" className="w-[500px] h-[500px] mb-4" />
      </div>

      {/* Login Form Section */}
      <div className="flex flex-col justify-center items-center px-4 sm:px-6 lg:px-10 py-10 lg:w-1/2 w-full">
        <div className="bg-[#dee7f0] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 sm:p-8 lg:p-10 w-full max-w-md border border-[#e5e7eb]">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4 text-center">
            Welcome to <span className="text-red-800">S</span>afe Bank
          </h1>
          <p className="text-sm sm:text-md text-blue-600 mb-6 text-center">
            Please log in to continue
          </p>

          {/* Login Type Toggle */}
          <div className="flex justify-center mb-4 space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="loginType"
                value="customer"
                checked={loginType === 'customer'}
                onChange={() => setLoginType('customer')}
                className="mr-2"
              />
              Customer
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="loginType"
                value="employee"
                checked={loginType === 'employee'}
                onChange={() => setLoginType('employee')}
                className="mr-2"
              />
              Employee
            </label>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

            {/* Consumer ID */}
            <input
              type="text"
              placeholder={loginType === 'employee' ? 'Employee ID' : 'Customer ID'}
              value={loginType === 'employee' ? employeeId : custumerId}
              onChange={(e) =>
                loginType === 'employee'
                  ? setEmployeeId(e.target.value)
                  : setCustumerId(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
              required
            />

            {/* Submit */}
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>

            {/* Error Message */}
            {error && (
              <p className="text-red-600 text-sm text-center mt-2">{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
