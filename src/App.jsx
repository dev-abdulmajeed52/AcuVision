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

const App = () => {
  return (
    <>
      <BrowserRouter>
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
          <Route path='/company/*' element={
            <ProtectedRoute>
              <DashboardLayout/>
            </ProtectedRoute>
            } >
            <Route index element={<CompanyHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
