import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {!isScrolled ? (
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white shadow-lg rounded-lg w-[90%] max-w-3xl transition-all duration-700 ease-in-out"
        >
          <div className="flex items-center justify-between py-4 px-6">
            <div className="text-lg font-bold">
              <a href="#" className="hover:text-gray-400">
                AcuVision
              </a>
            </div>

            <div className="flex items-center space-x-6">
              <a href="#home" className="hover:text-gray-400">
                Home
              </a>
              <a href="#about" className="hover:text-gray-400">
                About
              </a>
              <Link
                to="/register"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Join
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white shadow-lg rounded-full w-16 h-16 flex items-center justify-center cursor-pointer transition-all duration-700 ease-in-out"
          onClick={() => setIsScrolled(false)}
        >
          <span className="text-lg font-bold">Vision</span>
        </div>
      )}
    </>
  );
};

export default NavSection;
