import React from 'react';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('name');
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div className="fixed top-0 left-64 right-0 bg-white shadow p-4 flex justify-between items-center z-50">
      <div>
        {userName && <p className="text-sm text-gray-500">Welcome, {userName}</p>}
      </div>
      <button onClick={handleLogout} className="bg-[#6366f1] text-white py-2 px-4 rounded">
        Logout
      </button>
    </div>
  );
};

export default Topbar;