import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      {/* Fixed Login Card */}
      <div className="fixed top-0 left-0 h-full w-96 bg-white shadow-lg flex flex-col justify-center px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome Back
        </h2>
        <form className="space-y-6">
          <div>
            <input
              id="email"
              type="email"
              className="w-full px-1 py-2 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <input
              id="password"
              type="password"
              className="w-full px-1 py-2 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="hover:underline text-blue-600">
            Register
          </Link>
        </p>
      </div>

      {/* Main Background Content */}
      <div className="ml-96 w-full h-full flex items-center justify-center px-6">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Platform</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Explore amazing features and connect with people like never before.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
