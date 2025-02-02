import React from 'react';

const WhyChooseAI = () => {
  return (
    <section>
      <div className="px-5 py-16 md:px-10 md:py-20 bg-[#f0f2ff]">
        <div className="mx-auto w-full max-w-7xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">Why Choose AI-Driven Interviews?</h2>
          <p className="mb-8 max-w-xl mx-auto text-sm text-gray-500 sm:text-base">
            AI-driven interviews offer numerous advantages to both employers and candidates, improving the recruitment process from start to finish.
          </p>
          <div className="grid gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <h3 className="font-bold text-xl mb-4">Increased Efficiency</h3>
              <p className="text-gray-500">AI interviews can assess multiple candidates at once, allowing faster screening and reducing time-to-hire.</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-bold text-xl mb-4">Fair and Unbiased</h3>
              <p className="text-gray-500">AI eliminates human bias, offering a more objective evaluation based on data rather than subjective impressions.</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-bold text-xl mb-4">Scalability</h3>
              <p className="text-gray-500">AI-driven interviews can scale to meet the demands of hiring campaigns, easily handling large volumes of candidates.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAI;
