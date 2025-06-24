import { useState } from "react";
import axios from "axios";

const WithdrawForm = ({ accountno, reload }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleWithdraw = async () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/withdraw", {
        accountno,
        amount,
        description,
      });

      if (res.data.message) alert(res.data.message);
      reload();
      setAmount("");
      setDescription("");
    } catch (err) {
      alert("Withdraw failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-bold">Withdraw</h2>
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
      <button onClick={handleWithdraw} className="bg-red-600 text-white p-2 w-full">
        Withdraw
      </button>
    </div>
  );
};

export default WithdrawForm;
