import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed bottom-4 left-64 right-64 z-16 w-auto transition-all duration-300 ${
        isScrolled ? "backdrop-blur-lg bg-white/80 shadow-lg" : "bg-[#f0f2ff] shadow-md"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="relative flex h-16 items-center justify-between gap-4 px-6">
          
          <div className="flex flex-1 items-center space-x-3">
            <img src="/svg/logo.svg" alt="Acuvision" className="h-8" />
            <span className="text-black text-lg font-semibold tracking-wide">AcuVision</span>
          </div>

          <nav className="flex items-center space-x-5">
            <a
              href="#home"
              className="text-black text-sm font-medium transition-all duration-200 hover:text-[#6366f1]"
            >
              Home
            </a>
            <a
              href="#prep"
              className="text-black text-sm font-medium transition-all duration-200 hover:text-[#6366f1]"
            >
              PrepTips
            </a>
            <a
              href="#mock"
              className="text-black text-sm font-medium transition-all duration-200 hover:text-[#6366f1]"
            >
              Mock
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-[#6366f1] rounded-lg transition-all duration-200 hover:bg-[#4f46e5] hover:shadow-md"
            >
              Login
            </Link>
            <Link
              to="/iam"
              className="px-4 py-2 text-sm font-medium text-[#6366f1] border border-[#6366f1] rounded-lg transition-all duration-200 hover:bg-[#6366f1] hover:text-white hover:shadow-md"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
