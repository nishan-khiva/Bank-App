import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CusDetails = () => {
    const { id } = useParams();
    const [custumer, setCustumer] = useState(null);
    const navigate = useNavigate()

    const fetchCustumer = async () => {
        try {
            const token = localStorage.getItem('emplytoken');
            const res = await axios.get(`http://localhost:4000/api/custumer/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCustumer(res.data.custumer);
        } catch (err) {
            console.error('Error fetching custumer details:', err);
        }
    };

    useEffect(() => {
        fetchCustumer();
    }, [id]);

    if (!custumer) return <p className="p-4">Loading customer details...</p>;

    return (
        <div className=" w-full flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg  w-full border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-blue-800">Customer Profile Summary</h2>
                    <button
                        onClick={() => navigate('/admin/custumers')}
                        className="text-sm text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-600 hover:text-white transition"
                    >
                        Back
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 text-[15px] font-medium text-gray-800">
                    <div className="flex gap-2">
                        <span className="text-gray-500 text-sm">Customer ID</span>
                        <span className="text-blue-900">{custumer.custumerId}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-gray-500 text-sm">Account No</span>
                        <span className="text-blue-900">{custumer.accountno}</span>
                    </div>

                    <div className="flex gap-2">
                        <span className="text-gray-500 text-sm">Account Type</span>
                        <span className="text-blue-900">{custumer.accountType}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-gray-500 text-sm">Account Status</span>
                        <span className={`font-semibold ${custumer.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                            {custumer.status}
                        </span>
                    </div>

                    <div className="flex gap-2">
                        <span className="text-gray-500 text-sm">Name</span>
                        <span className="text-blue-900">{custumer.name}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-gray-500 text-sm">Father's Name</span>
                        <span className="text-blue-900">{custumer.fatherName}</span>
                    </div>

                    <div className="flex gap-2">
                        <span className="text-gray-500 text-sm">Email</span>
                        <span className="text-blue-900">{custumer.email}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-gray-500 text-sm">Phone</span>
                        <span className="text-blue-900">{custumer.phone}</span>
                    </div>

                    <div className="flgap-2">
                        <span className="text-gray-500 text-sm">DOB</span>
                        <span className="text-blue-900">{custumer.dob}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-gray-500 text-sm">Gender</span>
                        <span className="text-blue-900">{custumer.gender}</span>
                    </div>

                    <div className="flex gap-2">
                        <span className="text-gray-500 text-sm">Aadhaar No</span>
                        <span className="text-blue-900">{custumer.adhaarNo}</span>
                    </div>
                    <div className="flex gap-2 ">
                        <span className="text-gray-500 text-sm">PAN No</span>
                        <span className="text-blue-900">{custumer.panNo}</span>
                    </div>

                    <div className="flex gap-2">
                        <span className="text-gray-500 text-sm">Nominee</span>
                        <span className="text-blue-900">{custumer.nominee}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-gray-500 text-sm">Nominee Relation</span>
                        <span className="text-blue-900">{custumer.nomineeRelation}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-gray-500 text-sm block mb-1">Address</span>
                        <span className="text-blue-900 text-[15px] font-medium">{custumer.address}</span>
                    </div>
                </div>





            </div>
        </div>

    );
};

export default CusDetails;
