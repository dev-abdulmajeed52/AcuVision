import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/');
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="relative w-full h-48 bg-blue-500 flex justify-center items-center">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white absolute bottom-[-40px]"
        />
      </div>
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          ☰
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="mt-20 p-4 text-center">
        <h1 className="text-2xl font-semibold">Welcome, {name || 'Guest'}!</h1>
      </div>
    </div>
  );
};

export default Profile;
