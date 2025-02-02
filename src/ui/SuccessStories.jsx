import React from 'react';

const SuccessStories = () => {
  return (
    <section>
      <div className="px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto w-full max-w-7xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">Success Stories: Candidates Who Succeeded</h2>
          <p className="mb-8 max-w-xl mx-auto text-sm text-gray-500 sm:text-base">
            Hear from candidates who’ve aced AI-driven interviews and landed their dream jobs with the help of our platform.
          </p>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="font-semibold text-xl mb-4">John D.</h3>
              <p className="text-gray-500">"AI-driven mock interviews helped me become more confident and prepared. The feedback I received was invaluable!"</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="font-semibold text-xl mb-4">Sarah L.</h3>
              <p className="text-gray-500">"I was able to improve my communication skills and secure a position at a leading tech company thanks to AI feedback."</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="font-semibold text-xl mb-4">Mike H.</h3>
              <p className="text-gray-500">"The AI-driven interview process allowed me to understand exactly where I could improve, which led to my job offer."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
