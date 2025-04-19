import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const DashboardLayout = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');
    if (!isAuthenticated) navigate('/login');
  }, [navigate]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-64">
        <Topbar />
        <main className="flex-1 p-4 mt-16 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
