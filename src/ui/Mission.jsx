import React from 'react';

const Mission = () => {
  return (
    <>
      <section>
        {/* Container */}
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
          {/* Title */}
          <h2 className="mb-8 text-3xl font-bold md:text-5xl lg:mb-14">
            Meet AI-Interview Pro
          </h2>
          <p className="mb-8 max-w-lg text-sm text-gray-500 sm:text-base lg:mb-24">
            AI-Interview Pro is revolutionizing the way candidates prepare for job interviews.  
            With real-time AI feedback and adaptive questioning, we empower individuals to master  
            their interview skills with confidence.
          </p>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <img
              src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="AI-driven interview"
              className="inline-block h-full w-full rounded-2xl object-cover"
            />
            <div className="flex flex-col gap-5 rounded-2xl border border-solid border-black p-10 sm:p-20">
              <h2 className="text-3xl font-bold md:text-5xl">Our Mission</h2>
              <p className="text-sm text-gray-500 sm:text-base">
                Our mission is to harness the power of AI-driven assessments to  
                personalize and optimize interview preparation. Whether you're  
                a job seeker or a hiring manager, our technology adapts to your needs,  
                providing real-time feedback, performance analysis, and tailored  
                interview simulations to ensure success.
                <br />
                <br />
                We believe in bridging the gap between candidates and recruiters by  
                leveraging AI for fair, efficient, and insightful interviews.  
                Your next big opportunity starts here.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Mission;
