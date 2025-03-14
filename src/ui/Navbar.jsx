import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, CircleUserRound  } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const checkAuthorization = () => {
      const token = localStorage.getItem("token");
      setIsAuthorized(!!token); // If token exists, user is 
    };

    checkAuthorization();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed bottom-4 left-4 right-4 md:left-64 md:right-64 z-20 w-auto transition-all duration-300 ${
        isScrolled ? "backdrop-blur-lg bg-white/80 shadow-lg" : "bg-[#f0f2ff] shadow-md"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="relative flex h-16 items-center justify-between gap-4 px-6">
          <div className="flex flex-1 items-center space-x-3">
            <button
              className="block md:hidden text-black focus:outline-none"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <img src="/svg/logo.svg" alt="Acuvision" className="h-8" />
            <span className="text-black text-lg font-semibold tracking-wide">AcuVision</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-5">
            <a href="#home" className="text-black text-sm font-medium hover:text-[#6366f1]">
              Home
            </a>
            <a href="#prep" className="text-black text-sm font-medium hover:text-[#6366f1]">
              PrepTips
            </a>
            <a href="#mock" className="text-black text-sm font-medium hover:text-[#6366f1]">
              Mock
            </a>
          </nav>

          {/* Right Side - Auth Buttons or Profile Icon */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthorized ? (
              <button
                onClick={() => console.log("Profile icon clicked")} // Hook up profile menu later
                className="text-black hover:text-[#6366f1] focus:outline-none"
              >
                <User className="h-6 w-6" />
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#6366f1] rounded-lg hover:bg-[#4f46e5] hover:shadow-md"
                >
                  Login
                </Link>
                <Link
                  to="/iam"
                  className="px-4 py-2 text-sm font-medium text-[#6366f1] border border-[#6366f1] rounded-lg hover:bg-[#6366f1] hover:text-white hover:shadow-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div
            className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg p-6 transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
            <nav className="mt-10 flex flex-col space-y-4">
              <a href="#home" className="text-black text-sm font-medium hover:text-[#6366f1]">
                Home
              </a>
              <a href="#prep" className="text-black text-sm font-medium hover:text-[#6366f1]">
                PrepTips
              </a>
              <a href="#mock" className="text-black text-sm font-medium hover:text-[#6366f1]">
                Mock
              </a>
              {isAuthorized ? (
                <Link
                  to='/profile'
                  className="text-black hover:text-[#6366f1] focus:outline-none flex items-center space-x-2"
                >
                  <User className="h-6 w-6" />
                  <span>Profile</span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="mt-6 px-4 py-2 text-sm font-medium text-white bg-[#6366f1] rounded-lg hover:bg-[#4f46e5] hover:shadow-md"
                  >
                    Login
                  </Link>
                  <Link
                    to="/iam"
                    className="px-4 py-2 text-sm font-medium text-[#6366f1] border border-[#6366f1] rounded-lg hover:bg-[#6366f1] hover:text-white hover:shadow-md"
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
