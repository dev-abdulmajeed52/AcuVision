import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false); // State to track if component has loaded

  // Trigger animation after component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <header>
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
          <div
            className={`mx-auto max-w-3xl text-center transition-all duration-700 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">
              Find Your Dream Job with AI-Driven Interviews
            </h1>
            <p className="mb-6 text-sm text-gray-500 sm:text-xl lg:mb-8">
              Revolutionize your job search with our AI-powered platform! Get matched with top employers, prepare with AI-driven mock interviews, and land your perfect job faster than ever.
            </p>
            <Link
              to="/IAM"
              className="mr-6 inline-block items-center rounded-md bg-[#6366f1] px-8 py-4 text-center font-semibold text-white lg:mr-8 transition-transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          <ul className="mt-16 grid gap-8 sm:mt-24 sm:grid-cols-3 sm:gap-12 md:grid-cols-5 md:gap-4">
            {[
              "Microsoft",
              "PayPal",
              "Group",
              "Chase",
              "Walmart",
            ].map((company, index) => (
              <li
                key={company}
                className={`flex justify-center opacity-0 ${
                  isLoaded ? 'animate-fade-in-up opacity-100' : ''
                }`}
                style={{ animationDelay: `${index * 200}ms` }} // Staggered delay
              >
                <img
                  src={`https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2F${company}%20Logo.svg?alt=media&token=...`}
                  alt=""
                  className="inline-block h-9 transition-opacity hover:opacity-75"
                />
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Hero;