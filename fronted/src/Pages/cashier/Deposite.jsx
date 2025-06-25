import { useState } from "react";
import api from "../../Api/axiosInstance"
const DepositForm = ({ accountno, reload }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleDeposit = async () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      await api.post("/api/deposit", {
        accountno,
        amount,
        description,
      });
      alert("Deposit successful!");
      reload();
      setAmount("");
      setDescription("");
    } catch (err) {
      alert("Deposit failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-bold">Deposit</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button onClick={handleDeposit} className="bg-green-600 text-white p-2 w-full">
        Deposit
      </button>
    </div>
  );
};

export default DepositForm;
