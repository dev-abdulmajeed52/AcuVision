import React, { useState } from 'react';

const Faq = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      title: "What are AI-driven interviews?",
      content:
        "AI-driven interviews use artificial intelligence to assess candidates during the hiring process. These interviews may involve chatbots, video analysis, or voice recognition technology to evaluate responses and body language.",
    },
    {
      title: "How do AI interviews differ from traditional interviews?",
      content:
        "AI interviews typically rely on algorithms to evaluate candidates' responses, skills, and behavior, whereas traditional interviews are conducted by human interviewers. AI interviews can be faster, more objective, and provide insights that may be overlooked in human-led interviews.",
    },
    {
      title: "Are AI-driven interviews fair to all candidates?",
      content:
        "AI-driven interviews aim to reduce bias by focusing on data-driven analysis. However, concerns about the fairness of AI algorithms do exist, and it's important for companies to ensure transparency, regular audits, and human oversight in the process.",
    },
    {
      title: "How can I prepare for an AI-driven interview?",
      content:
        "To prepare for an AI-driven interview, focus on clearly articulating your responses, staying calm, and practicing common interview questions. Ensure that your tech setup is ready for video or voice-based AI tools, and be mindful of non-verbal cues during video interviews.",
    },
    {
      title: "What technologies are used in AI-driven interviews?",
      content:
        "AI-driven interviews use technologies like natural language processing (NLP), machine learning, and computer vision. These technologies analyze spoken and written responses, assess facial expressions, and even evaluate emotional tone to provide an objective assessment of a candidate's suitability.",
    },
  ];

  return (
    <>
      <section>
        <div className="py-16 md:py-20 mx-auto w-full max-w-7xl px-5 md:px-10">
          <div className="flex flex-col items-start lg:flex-row lg:space-x-20">
            <div className="lg:flex-[1_1_500px] w-full flex-none">
              <div className="max-w-3xl mb-8 md:mb-12 lg:mb-16">
                <h2 className="font-bold text-3xl md:text-5xl">AI-Driven Interview FAQs</h2>
                <div className="mt-4 max-w-lg">
                  <p className="text-gray-500 text-sm sm:text-base">
                    AI-driven interviews are becoming an integral part of modern hiring processes. Here are some frequently asked questions about them.
                  </p>
                </div>
              </div>
              <div className="mb-6 h-full w-full overflow-auto bg-[#f0f2ff] p-8 rounded-md">
                <div className="flex flex-row gap-4">
                  <img
                    src="/svg/logo.svg"
                    alt="Placeholder"
                    className="inline-block h-12 w-12 object-cover rounded-full"
                  />
                  <div className="flex flex-col gap-1.5">
                    <h5 className="text-xl font-bold">Still have questions?</h5>
                    <div className="max-w-sm">
                      <p className="text-gray-500 text-sm sm:text-base">
                        Can’t find the answer you’re looking for? Please chat to our support team for more help.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-6 mt-8 h-[0.5px] w-full bg-[#f0f2ff]"></div>
                <a
                  href="#"
                  className="inline-block items-center rounded-md bg-black px-6 py-3 text-center font-semibold text-white"
                >
                  Get In Touch
                </a>
              </div>
            </div>
            <div className="lg:flex-[1_1_500px] w-full flex-none">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="mb-6 w-full overflow-hidden bg-[#f0f2ff] p-8 rounded-md"
                >
                  <div
                    className="flex cursor-pointer items-start justify-between"
                    onClick={() => toggleFAQ(index)}
                  >
                    <p className="text-xl font-bold">{faq.title}</p>
                    <div className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center">
                      <div
                        className={`absolute h-5 w-0.5 bg-black transition-transform duration-300 ${openFAQ === index ? "rotate-90" : ""}`}
                      ></div>

                      <div className="h-0.5 w-5 bg-black"></div>
                    </div>
                  </div>
                  {openFAQ === index && (
                    <div className="w-full overflow-hidden mb-4 max-w-2xl lg:max-w-4xl">
                      <p className="text-sm sm:text-base">{faq.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
