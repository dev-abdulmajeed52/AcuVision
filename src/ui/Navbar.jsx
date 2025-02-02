import React, { useState, useEffect } from "react";

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
      className={`fixed top-0 z-30 w-full transition-all duration-300 ${
        isScrolled ? "backdrop-blur-lg bg-white/80 shadow-md" : "bg-[#f0f2ff]"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-16 items-center justify-between gap-3 rounded-2xl px-8">
          
          <div className="flex flex-1 items-center space-x-3">
            <div className="text-black text-lg font-bold">
              <img src="/svg/logo.svg" alt="Logo" />
            </div>
            <span className="text-black">AcuVision</span>
          </div>

          <div>
            <a
              href="#home"
              className="btn-sm py-[5px] px-4 text-black hover:bg-[length:100%_150%]"
            >
              Home
            </a>
            
            <a
              href="#prep"
              className="btn-sm py-[5px] px-4 text-black hover:bg-[length:100%_150%]"
            >
              PrepTips
            </a>
            
            <a
              href="#mock"
              className="btn-sm py-[5px] px-4 text-black hover:bg-[length:100%_150%]"
            >
              Mock
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
