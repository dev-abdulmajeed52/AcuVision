import React from 'react';

const AIFeatures = () => {
  return (
    <section>
      <div className="px-5 py-16 md:px-10 md:py-20 bg-gray-100">
        <div className="mx-auto w-full max-w-7xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">AI Features Used in Our Interviews</h2>
          <p className="mb-8 max-w-xl mx-auto text-sm text-gray-500 sm:text-base">
            Our AI-driven interviews use state-of-the-art technologies to provide a comprehensive evaluation of your performance.
          </p>
          <div className="grid gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <h3 className="font-bold text-xl mb-4">Sentiment Analysis</h3>
              <p className="text-gray-500">AI analyzes your tone and word choice to gauge the sentiment behind your answers, providing a deeper insight into your communication style.</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-bold text-xl mb-4">Facial Expression Recognition</h3>
              <p className="text-gray-500">AI uses facial recognition to assess your body language, including eye contact, facial expressions, and gestures during the interview.</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-bold text-xl mb-4">Voice Analysis</h3>
              <p className="text-gray-500">The AI evaluates your speech patterns, including pitch, speed, and clarity, to assess how well you communicate under pressure.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;
