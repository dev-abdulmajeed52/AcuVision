import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './Auth/Login';
import Register from './Auth/Register';
import PrepTips from './ui/PrepTips';
import CallToAction from './ui/CallToAction';
import Role from './Auth/Role';
import MockInterview from './pages/MockInterview';
import BeforeStart from './pages/BeforeStart';
import CompanyForm from './components/CompanyForm';
import DashboardLayout from './company/DashboardLayout';
import CompanyHome from './company/CompanyHome';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import CandidateProfileForm from './components/CandidateProfileForm';
import Jobs from './pages/Jobs';
import Interview from './components/Interview';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Create_Post from './company/Create_Post';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/iam" element={<Role />} />
          <Route path="/before" element={<BeforeStart />} />
          <Route path='/mockinterview' element={<MockInterview />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/companyform" element={<CompanyForm />} />
          <Route path="/candidateData" element={<CandidateProfileForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path="/interview/:jobId" element={<Interview />} />
          <Route path='/company/*' element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          } >
            <Route index element={<CompanyHome />} />
            <Route path="create_job_post" element={<Create_Post />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
