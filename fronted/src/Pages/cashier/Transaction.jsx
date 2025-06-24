import { useEffect, useState } from "react";
import axios from "axios";

const TransactionHistory = ({ accountno }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHistory = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`http://localhost:4000/api/history/${accountno}`);
      console.log("Transaction history response:", res);

      const data = res.data ?? [];  // ✅ Corrected here
      console.log("Transaction data:", data);

      if (Array.isArray(data)) {
        setTransactions(data);
      } else {
        setTransactions([]);
        setError("Invalid transaction data format.");
      }
    } catch (err) {
      console.error("Error fetching transaction history:", err);
      setError("Failed to fetch transaction history.");
      setTransactions([]);
    }
    setLoading(false);
  };


  useEffect(() => {
    if (accountno) {
      fetchHistory();
    }
  }, [accountno]);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">📜 Transaction History</h2>

      {loading ? (
        <p>Loading transactions...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : transactions.length >= 0 ? (
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Type</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Description</th>
              <th className="p-2">Balance</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn._id} className="border-t">
                <td className="p-2">{txn.type}</td>
                <td className={`p-2 font-medium ${txn.type === "deposit" ? "text-green-600" : txn.type === "withdrawal" ? "text-red-600" : "text-gray-700"
                  }`}>₹{txn.amount}</td>
                <td className="p-2">{txn.description}</td>
                <td className="p-2">₹{txn.avlbalance}</td>
                <td className="p-2">{new Date(txn.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found</p>
      )}
    </div>
  );
};

export default TransactionHistory;
