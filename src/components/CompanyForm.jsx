import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  CitySelect,
  CountrySelect,
  PhonecodeSelect
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    country: '',
    city: '',
    address: '',
    industry: '',
    hrName: '',
    hrEmail: '',
    hrPhone: '',
    companyEmail: '',
    companyPhone: '',
    website: ''
  });

  const industries = [
    { id: 1, name: 'Software Development' },
    { id: 2, name: 'Healthcare' },
    { id: 3, name: 'Finance' },
    { id: 4, name: 'Education' },
    { id: 5, name: 'Manufacturing' },
    { id: 6, name: 'Retail' },
    { id: 7, name: 'Construction' },
    { id: 8, name: 'Telecommunications' },
    { id: 9, name: 'Real Estate' },
    { id: 10, name: 'Marketing & Advertising' }
  ];

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/register-company', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Server response:', response.data);
      setMessage('Company registered successfully!');
      setError('');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      console.error('Error response:', err.response || err);
      setError(err.response?.data?.message || 'Something went wrong');
      setMessage('');
    }
  };

  const inputStyle =
    'w-full p-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-500 text-black';

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
      }}
    >
      <div className="relative w-full max-w-3xl bg-white p-8">
        <div className="absolute top-4 right-4 text-black font-semibold text-lg">{name}</div>

        <h2 className="text-3xl font-bold text-center text-black mb-6">Register Company</h2>

        {message && <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">{message}</div>}
        {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              className={inputStyle}
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className={inputStyle}
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className={inputStyle}
            />
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className={`${inputStyle} bg-black`}
            >
              <option value="">Select an industry</option>
              {industries.map((industry) => (
                <option key={industry.id} value={industry.name}>
                  {industry.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="hrName"
              value={formData.hrName}
              onChange={handleChange}
              placeholder="HR Name"
              className={inputStyle}
            />
            <input
              type="email"
              name="hrEmail"
              value={formData.hrEmail}
              onChange={handleChange}
              placeholder="HR Email"
              className={inputStyle}
            />
            <input
              type="text"
              name="hrPhone"
              value={formData.hrPhone}
              onChange={handleChange}
              placeholder="HR Phone"
              className={inputStyle}
            />
            <input
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              placeholder="Company Email"
              className={inputStyle}
            />
            <input
              type="text"
              name="companyPhone"
              value={formData.companyPhone}
              onChange={handleChange}
              placeholder="Company Phone"
              className={inputStyle}
            />
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Company Phone"
              className={inputStyle}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyForm;
