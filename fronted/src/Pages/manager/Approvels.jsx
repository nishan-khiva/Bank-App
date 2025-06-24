import React, { useState } from 'react'

const AccountApprovals = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      customerName: "Ravi Kumar",
      accountType: "Savings",
      appliedOn: "2025-06-20",
      status: "Pending"
    },
    {
      id: 2,
      customerName: "Neha Singh",
      accountType: "Current",
      appliedOn: "2025-06-21",
      status: "Pending"
    }
  ])

  const handleApprove = (id) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status: "Approved" } : req
      )
    )
  }

  const handleReject = (id) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status: "Rejected" } : req
      )
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">New Account Approvals</h2>

      {requests.map(req => (
        <div key={req.id} className="bg-white p-4 shadow rounded mb-4 flex justify-between items-center border">
          <div>
            <h3 className="text-lg font-semibold">{req.customerName}</h3>
            <p className="text-sm">Account Type: {req.accountType}</p>
            <p className="text-sm text-gray-500">Applied on: {req.appliedOn}</p>
            <p className={`text-sm mt-1 font-medium ${
              req.status === 'Approved' ? 'text-green-600' :
              req.status === 'Rejected' ? 'text-red-600' :
              'text-yellow-600'
            }`}>
              Status: {req.status}
            </p>
          </div>

          {req.status === "Pending" && (
            <div className="flex gap-2">
              <button
                onClick={() => handleApprove(req.id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(req.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default AccountApprovals
