import React, { useState } from "react";
import { Link } from "react-router-dom";

const BeforeStart = () => {
  const [micTested, setMicTested] = useState(false);
  const [audioTested, setAudioTested] = useState(false);

  const testMicrophone = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => setMicTested(true))
      .catch(() => alert("Microphone access denied!"));
  };

  const playTestSound = () => {
    const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
    audio.play();
    setAudioTested(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Setup Check</h1>

      <div className="bg-white shadow-md rounded-lg p-5 w-full max-w-sm space-y-4">
        <h2 className="text-lg font-medium text-gray-700">Checklist</h2>
        <ul className="text-gray-600 text-sm space-y-2">
          <li>✅ Quiet surroundings</li>
          <li>✅ Clean background</li>
          <li>✅ Good lighting</li>
          <li>✅ Mic & speakers tested</li>
        </ul>

        <button
          onClick={testMicrophone}
          className={`w-full p-3 rounded-lg text-white text-sm font-medium transition ${
            micTested ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {micTested ? "Mic Working ✅" : "Test Mic 🎤"}
        </button>

        <button
          onClick={playTestSound}
          className={`w-full p-3 rounded-lg text-white text-sm font-medium transition ${
            audioTested ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {audioTested ? "Sound Working ✅" : "Test Sound 🔊"}
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-4">Once ready, you can start your interview.</p>
      <Link to={'/mockinterview'} className="p-8 mt-6 bg-indigo-300 rounded-full">
          Start Interview 
      </Link>
    </div>
  );
};

export default BeforeStart;
