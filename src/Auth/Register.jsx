import React from "react";

const Register = () => {
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
        <form className="space-y-6">
          <div>
            <input
              type="text"
              className="w-full px-1 py-2 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
              placeholder="Full Name"
            />
          </div>
          <div>
            <input
              type="email"
              className="w-full px-1 py-2 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              className="w-full px-1 py-2 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
              placeholder="Password"
            />
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
