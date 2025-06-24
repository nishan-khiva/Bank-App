import { useState } from "react";
import axios from "axios";

const CustomerSearchForm = ({ onCustomerFound }) => {
  const [accountno, setAccountno] = useState("");

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/custumer/accountno/${accountno}`);
      onCustomerFound(res.data.custumer);
    } catch (err) {
      alert("Customer not found!");
    }
  };

  return (
    <div className=" ">
      <h2 className="text-lg font-bold">Search Customer</h2>
      <input
        type="number"
        placeholder="Enter Account Number"
        value={accountno}
        onChange={(e) => setAccountno(e.target.value)}
        className="border p-2 mt-2 rounded "
      />
      <button onClick={handleSearch} className="bg-blue-600 text-white p-2 mt-2 ml-2 rounded">
        Search
      </button>
    </div>
  );
};

export default CustomerSearchForm;
