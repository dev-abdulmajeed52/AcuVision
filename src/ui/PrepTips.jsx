import React from 'react';

const PrepTips = () => {
  return (
    <section>
      <div className="px-5 py-16 md:px-10 md:py-20 bg-[#f0f2ff]">
        <div className="mx-auto w-full max-w-7xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">AI-Driven Interview Preparation Tips</h2>
          <p className="mb-8 max-w-xl mx-auto text-sm text-gray-500 sm:text-base">
            Enhance your performance in AI-driven interviews with these expert tips.
          </p>
          <ul className="list-disc mx-auto max-w-3xl text-left text-sm sm:text-base">
            <li>Prepare by practicing responses to common questions using clear and concise language.</li>
            <li>Stay mindful of your body language during video interviews—maintain good posture and make eye contact with the camera.</li>
            <li>Use a quiet, well-lit space for your interview to ensure optimal video and audio quality for the AI system.</li>
            <li>Focus on speaking naturally and confidently, avoiding overly rehearsed answers.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PrepTips;
