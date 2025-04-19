import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <>
      <section>
        <div className="px-5 py-16 md:px-10 md:py-20">
          <div className="mx-auto w-full max-w-7xl bg-[#f0f2ff] px-4 py-32 text-center">
            <h2 className="mx-auto mb-6 max-w-3xl flex-col text-3xl font-bold md:mb-10 md:text-5xl lg:mb-12">
              Prepare for Your AI-Driven Interview
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-sm text-gray-500 sm:text-base md:mb-12">
              Master AI-driven interviews with mock sessions designed to give you an edge. Improve your responses and confidently face the future of hiring.
            </p>
            <Link to='/before'
              className="mb-4 inline-block items-center bg-[#6366f1] px-6 py-3 text-center font-semibold text-white"
            >
              Start Mock Interview
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CallToAction;
