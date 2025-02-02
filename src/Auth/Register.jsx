import React, { useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../services/ApiEndPoint";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("company"); // Default role is "company"
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

    if (!username || !password || !email) {
      setError("Username, email, and password are required.");
      setLoading(false);
      return;
    }

    try {
      const registerUrl = `${API_ENDPOINT.Register_user}`;

      const response = await axios.post(
        registerUrl,
        {
          username,
          email,
          password,
          role,
          is_active: true, // Set the active status to true
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response);

      // Handle success
      setToken(response.data.token);
      setSuccess(true);
    } catch (error) {
      console.error("Error occurred:", error);

      // Extract and display detailed error information
      const errorMessage =
        error.response?.data?.message || "Registration error or server issue.";
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
      {/* Fixed Register Card */}
      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg flex flex-col justify-center px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Register
        </h2>
        <form className="space-y-6" onSubmit={handleAuth}>
          <div>
            <input
              type="text"
              className="w-full px-1 py-2 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              className="w-full px-1 py-2 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              className="w-full px-1 py-2 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <select
              className="w-full px-1 py-2 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-indigo-500 text-gray-900"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="company">Company</option>
              <option value="candidate">Candidate</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Login
          </a>
        </p>
      </div>

      {/* Main Background Content */}
      <div className="mr-96 w-full h-full flex items-center justify-center px-6">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Join Our Community</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Discover new opportunities and connect with others by creating an
            account today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
