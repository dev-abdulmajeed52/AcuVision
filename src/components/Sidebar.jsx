import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-[#f0f2ff] text-black flex flex-col p-4 z-40">,
    <img src='/svg/logo.svg' className='w-16'/>
      <h2 className="text-2xl font-bold mb-6">ACU VISION</h2>
      <nav>
        <Link to="/" className="block py-2 px-4 rounded hover:bg-[#6366f1]">Home</Link>
        
        <div>
          <button
            onClick={() => toggleDropdown('users')}
            className='block w-full text-left py-2 px-4 rounded hover:bg-[#6366f1]'
          >
            Applicants Status
          </button>
          {openDropdown === 'users' && (
            <div className="pl-6">
              <Link to="/rs" className="block py-2 px-4 rounded hover:bg-[#6366f1]">Applicant Interset</Link>
              <Link to="/user" className="block py-2 px-4 rounded hover:bg-[#6366f1]">Approved</Link>
              <Link to="/rs" className="block py-2 px-4 rounded hover:bg-[#6366f1]">Rejected</Link>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => toggleDropdown('subscriptions')}
            className="block w-full text-left py-2 px-4 rounded hover:bg-[#6366f1]"
          >
            Create Job Post
          </button>
          {openDropdown === 'subscriptions' && (
            <div className="pl-6">
              <Link to="/company/create_job_post" className="block py-2 px-4 rounded hover:bg-[#6366f1]">Job Post</Link>
              <Link to="/subscription" className="block py-2 px-4 rounded hover:bg-[#6366f1]">Subscriptions</Link>
            </div>
          )}
        </div>

        <Link to="/profile" className="block py-2 px-4 rounded hover:bg-[#6366f1]">Other Applicant</Link>
        <Link to="/settings" className="block py-2 px-4 rounded hover:bg-[#6366f1]">Settings</Link>
      </nav>
    </div>
  );
};

export default Sidebar;