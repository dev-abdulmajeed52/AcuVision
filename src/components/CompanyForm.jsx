import React, { useEffect, useState } from 'react';

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    location: '',
    address: '',
    industry: '',
    hrName: '',
    hrEmail: '',
    hrPhone: '',
    companyEmail: '',
    companyPhone: '',
    website: ''
  });
  const [name, setName] = useState('');



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md">
      {Object.keys(formData).map((field) => (
        field !== 'isHrUser' ? (
          <div key={field} className="mb-4">
            <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            <input
              type={field.includes('Email') ? 'email' : 'text'}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : (
          <div key={field} className="mb-4 flex items-center">
            <input
              type="checkbox"
              id={field}
              name={field}
              checked={formData[field]}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor={field} className="ml-2 text-sm font-medium text-gray-700">Is HR a User?</label>
          </div>
        )
      ))}
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">Submit</button>
    </form>
  );
};

export default CompanyForm;
