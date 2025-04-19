import React from 'react';

const HowItWorks = () => {
  return (
    <section>
      <div className="px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto w-full max-w-7xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">How AI-Driven Interviews Work</h2>
          <p className="mb-8 max-w-xl mx-auto text-sm text-gray-500 sm:text-base">
            Understand the AI-driven interview process, designed to provide objective assessments and improve the hiring experience.
          </p>
          <div className="grid gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <h3 className="font-bold text-xl mb-4">Step 1: Pre-Interview Setup</h3>
              <p className="text-gray-500">Prepare by answering basic screening questions. The system will analyze your responses based on keywords and sentiment.</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-bold text-xl mb-4">Step 2: AI-Driven Assessment</h3>
              <p className="text-gray-500">AI evaluates your tone, speech patterns, and content based on predefined criteria, while video analysis captures your facial expressions.</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-bold text-xl mb-4">Step 3: Receive Feedback</h3>
              <p className="text-gray-500">Once completed, you’ll receive detailed feedback and suggestions for improvement, giving you the edge in future interviews.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
