import React, { useEffect, useRef, useState } from "react";

const MockInterview = () => {
  const videoRef = useRef(null);
  const [questions] = useState([
    "Tell me about yourself.",
    "What are your strengths and weaknesses?",
    "Why should we hire you?",
    "Where do you see yourself in 5 years?",
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() => alert("Camera access denied!"));
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left - AI Asking Questions */}
      <div className="w-1/2 bg-white p-6 flex flex-col justify-between shadow-md">
        <h2 className="text-lg font-semibold text-gray-800">AI Interviewer 🎤</h2>
        <div className="mt-4 flex-1 space-y-4 overflow-auto">
          {questions.slice(0, currentQuestion + 1).map((q, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-blue-100 text-gray-800 w-3/4"
            >
              {q}
            </div>
          ))}
        </div>
        <button
          onClick={() =>
            setCurrentQuestion((prev) =>
              prev < questions.length - 1 ? prev + 1 : prev
            )
          }
          className="mt-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Next Question ➡️
        </button>
      </div>

      {/* Right - User Camera */}
      <div className="w-1/2 flex items-center justify-center bg-gray-900">
        <video ref={videoRef} autoPlay className="rounded-lg w-3/4 shadow-lg" />
      </div>
    </div>
  );
};

export default MockInterview;
