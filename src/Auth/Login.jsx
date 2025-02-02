import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported
import { API_ENDPOINT } from "../services/ApiEndPoint";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    setToken(null);
  
    if (!username || !password) {
      setError("Username and password are required.");
      setLoading(false);
      return;
    }
  
    try {
      const loginUrl = `${API_ENDPOINT.Login_User}?username=${encodeURIComponent(
        username
      )}&password=${encodeURIComponent(password)}`;
  
      console.log("Sending request to:", loginUrl);
  
      // Send the GET request
      const response = await axios.post(loginUrl, {
        headers: {
          Accept: "application/json",
        },
      });
  
      console.log("Response:", response);
  
      // Handle success
      setToken(response.data.token);
      setSuccess(true);
    } catch (error) {
      console.error("Error occurred:", error);
  
      // Extract and display detailed error information
      const errorMessage =
        error.response?.data?.message || "Invalid credentials or server error.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  

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
        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <input
              id="username"
              type="text"
              className="w-full px-1 py-2 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              id="password"
              type="password"
              className="w-full px-1 py-2 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white transition`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">Login successful!</p>}
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
