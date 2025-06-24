import React, { useState } from 'react';
import axios from 'axios';

const AddCustumer = () => {
    const [photoPreview, setPhotoPreview] = useState(null);
    const [signaturePreview, setSignaturePreview] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [signature, setSignature] = useState(null);

    const [formData, setFormData] = useState({
        adhaarNo: '',
        name: '',
        password: '',
        fatherName: '',
        email: '',
        phone: '',
        panNo: '',
        accountType: '',
        nominee: '',
        nomineeRelation: '',
        address: '',
        dob: '',
        gender: '',
    });

    const [message, setMessage] = useState('');

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSignatureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSignature(file);
            setSignaturePreview(URL.createObjectURL(file));
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();

            // Append all form fields
            for (let key in formData) {
                data.append(key, formData[key]);
            }

            // Append files
            if (photo) data.append('photo', photo);
            if (signature) data.append('signature', signature);

            await axios.post('http://localhost:4000/api/custumer/register', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('emplytoken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage('Customer registered successfully!');
            setFormData({
                adhaarNo: '',
                name: '',
                password: '',
                fatherName: '',
                email: '',
                phone: '',
                panNo: '',
                accountType: '',
                nominee: '',
                nomineeRelation: '',
                address: '',
                dob: '',
                gender: '',
            });
            setPhoto(null);
            setSignature(null);
            setPhotoPreview(null);
            setSignaturePreview(null);
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            setMessage('Failed to register Customer.');
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-3xl font-bold mb-8 text-blue-700">Add Customer (Create New Account)</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Aadhaar */}
                    <Input label="Aadhaar No" name="adhaarNo" value={formData.adhaarNo} onChange={handleChange} />

                    {/* Name */}
                    <Input label="Name" name="name" value={formData.name} onChange={handleChange} />

                    {/* Father Name */}
                    <Input label="Father Name" name="fatherName" value={formData.fatherName} onChange={handleChange} />

                    {/* DOB */}
                    <Input label="Date of Birth" name="dob" value={formData.dob} onChange={handleChange} type="date" />

                    {/* Gender */}
                    <Select
                        label="Gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        options={["male", "female", "other"]}
                    />

                    {/* Email */}
                    <Input label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />

                    {/* Phone */}
                    <Input label="Phone No" name="phone" value={formData.phone} onChange={handleChange} />

                    {/* PAN */}
                    <Input label="PAN No" name="panNo" value={formData.panNo} onChange={handleChange} />

                    {/* Account Type */}
                    <Select
                        label="Account Type"
                        name="accountType"
                        value={formData.accountType}
                        onChange={handleChange}
                        options={["savings", "current"]}
                    />

                    {/* Nominee */}
                    <Input label="Nominee Name" name="nominee" value={formData.nominee} onChange={handleChange} />

                    {/* Nominee Relation */}
                    <Input label="Nominee Relation" name="nomineeRelation" value={formData.nomineeRelation} onChange={handleChange} />

                    {/* Password */}
                    <Input label="Password" name="password" value={formData.password} onChange={handleChange} type="password" />

                    {/* Address */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea
                            name="address"
                            rows={3}
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                            placeholder="Enter Your Address"
                        />
                    </div>

                    {/* Signature Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Signature</label>
                        <input type="file" accept="image/*" onChange={handleSignatureChange} className="w-full px-4 py-2 border rounded" />
                        {signaturePreview && (
                            <img src={signaturePreview} alt="Signature Preview" className="mt-2 h-24 border rounded shadow" />
                        )}
                    </div>

                    {/* Photo Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
                        <input type="file" accept="image/*" onChange={handlePhotoChange} className="w-full px-4 py-2 border rounded" />
                        {photoPreview && (
                            <img src={photoPreview} alt="Photo Preview" className="mt-2 h-24 w-24 object-cover border rounded-full shadow" />
                        )}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-200"
                    >
                        Add Customer
                    </button>
                </div>

                {message && <p className="mt-4 text-center text-green-600 font-medium">{message}</p>}
            </form>
        </div>
    );
};

// Reusable Input Component
const Input = ({ label, name, value, onChange, type = "text" }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded"
            placeholder={`Enter ${label}`}
        />
    </div>
);

// Reusable Select Component
const Select = ({ label, name, value, onChange, options }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded"
        >
            <option value="">Select {label}</option>
            {options.map(opt => (
                <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
            ))}
        </select>
    </div>
);

export default AddCustumer;
