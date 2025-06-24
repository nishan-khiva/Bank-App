import { useState } from "react";
import CustomerSearchForm from "./CusSearchForm";
import DepositForm from "./Deposite";
import WithdrawForm from "./Withraw";
import TransactionHistory from "./Transaction";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CashierDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [activeTab, setActiveTab] = useState("search");
  const navigate = useNavigate();



  const reloadCustomer = async () => {
    if (!customer?.accountno) return;
    try {
      const res = await axios.get(`http://localhost:4000/api/custumer/accountno/${customer.accountno}`);
      if (res.data?.custumer) {
        setCustomer(res.data.custumer);
      } else {
        console.warn("Invalid customer data while reloading");
      }
    } catch (error) {
      console.error("Reload failed:", error);
    }
  };
const employeeName = localStorage.getItem('employeeName');
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-blue-100 text-white p-6 space-y-1">
        <h2 className="text-2xl font-bold  text-blue-700">💼 Cashier</h2>
        <p className="text-lg text-black">Welcome, {employeeName.toUpperCase()}</p><hr className="text-black"/>

        {["search", "deposit", "withdraw", "transactions"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="w-full text-left px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition mt-2"
          >
            {tab === "search" && "🔍 Search"}
            {tab === "deposit" && "💰 Deposit"}
            {tab === "withdraw" && "💸 Withdraw"}
            {tab === "transactions" && "📄 Transactions"}
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
      <div className="flex-1 p-6 bg-gray-100">
        {activeTab === "search" && <CustomerSearchForm onCustomerFound={setCustomer} />}

        {customer && (
          <>
            <div className="p-4 border rounded-xl shadow-md bg-white mb-6 mt-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-blue-700 mb-1">👤 Customer Name: {customer.name}</h3>
                  <p className="text-gray-600">🏦 <strong>Account No:</strong> {customer.accountno}</p>
                  <p className="text-gray-600">💰 <strong>Current Balance:</strong> ₹{customer.avlbalance ?? 0}</p>
                </div>

                {/* Signature */}
                {customer.signature && (
                  <div className="mt-4 sm:mt-0">
                    <img
                      src={`http://localhost:4000/${customer.signature}`}
                      alt="Customer Signature"
                      className="h-28 object-contain border border-gray-300 shadow p-2 bg-white"
                    />
                    <p className="text-center mt-1 text-sm text-gray-500">Signature</p>
                  </div>
                )}

                {/* Photo */}
                {customer.photo && (
                  <div className="mt-4 sm:mt-0">
                    <img
                      src={`http://localhost:4000/${customer.photo}`}
                      alt="Customer Photo"
                      className="h-28 w-28 object-cover rounded-full border-2 border-gray-300 shadow"
                    />
                    <p className="text-center mt-1 text-sm text-gray-500">Photo</p>
                  </div>
                )}
              </div>

              {activeTab === "search" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                  <p>📞 <strong>Mobile:</strong> {customer.phone}</p>
                  <p>📧 <strong>Email:</strong> {customer.email}</p>
                  <p> 📌 <strong>Status:</strong>{' '}
                    <span className={customer.status === 'Active' ? 'text-red-600 font-semibold' : 'text-green-700 font-semibold'}>
                      {customer.status.toUpperCase()}
                    </span>
                  </p>

                  <p>🆔 <strong>Aadhar No:</strong> {customer.adhaarNo}</p>
                  <p>🎂 <strong>DOB:</strong> {customer.dob}</p>
                  <p>💳 <strong>PAN No:</strong> {customer.panNo}</p>
                  <p>🏦 <strong>Account Type:</strong> {customer.accountType}</p>
                  <p>🏠 <strong>Address:</strong> {customer.address}</p>
                  <p>🧑‍🤝‍🧑 <strong>Nominee:</strong> {customer.nominee}</p>
                  <p>🔗 <strong>Nominee Relation:</strong> {customer.nomineeRelation}</p>

                </div>
              )}
            </div>


            {activeTab === "deposit" && (
              <DepositForm accountno={customer.accountno} reload={reloadCustomer} />
            )}
            {activeTab === "withdraw" && (
              <WithdrawForm accountno={customer.accountno} reload={reloadCustomer} />
            )}
            {activeTab === "transactions" && (
              <TransactionHistory accountno={customer.accountno} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CashierDashboard;
