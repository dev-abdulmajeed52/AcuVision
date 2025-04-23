import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Role = () => {
  const [selectedRole, setSelectedRole] = useState('applicant');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const roles = ['applicant', 'company'];

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    localStorage.setItem('selectedRole', role);
    setIsOpen(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#f0f2ff]">
      <div
        className={`flex items-center space-x-6 bg-[#6366f1] p-6 transition-all duration-500 ease-out ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-2xl font-semibold text-white">I Am</div>
        <div className="relative">
          <div 
            className="pb-1 border-b-2 border-white cursor-pointer text-white min-w-[120px]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex justify-between items-center">
              <span>{selectedRole}</span>
              <svg
                className={`w-4 h-4 ml-2 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {isOpen && (
            <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg z-10">
              {roles.map((role) => (
                <div
                  key={role}
                  onClick={() => handleRoleSelect(role)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                >
                  {role}
                </div>
              ))}
            </div>
          )}
        </div>
        <Link to="/register" className="bg-[#f0f2ff] text-black px-6 py-3 hover:bg-[#6366f1] hover:text-white transition duration-300">
          Go
        </Link>
      </div>
    </div>
  );
};

export default Role;
