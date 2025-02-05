import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBm5zWFVNgqemqrZcU7VNgSLLrVALM0h9M"); 
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const MockInterview = () => {
  const videoRef = useRef(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() => alert("Camera access denied!"));

    fetchJobDetails();
  }, []);

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(
        "https://d2fg664z-8000.inc1.devtunnels.ms/requirements/67a320914bc7ab37e9813a2b"
      );
      const { title, description } = response.data;
      setJobTitle(title);
      setJobDescription(description);
      generateQuestions(title, description);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  const generateQuestions = async (title, description) => {
    try {
      const prompt = `Generate 5 technical and behavioral interview questions for a job interview based on this job title and description:
      Job Title: ${title}
      Job Description: ${description}`;

      const result = await model.generateContent(prompt);
      const generatedText = result.response.text();

      const parsedQuestions = generatedText
        .split("\n")
        .filter((q) => q.trim() !== "");

      setQuestions(parsedQuestions);
    } catch (error) {
      console.error("Error generating interview questions:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="w-full md:w-1/2 bg-white p-6 flex flex-col justify-between shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 text-center md:text-left">
          AI Interviewer 🎤 - {jobTitle || "Loading..."}
        </h2>
        <p className="text-gray-600 text-sm italic">{jobDescription}</p>

        <div className="mt-4 flex-1 space-y-4 overflow-auto">
          {questions.slice(0, currentQuestion + 1).map((q, index) => (
            <div key={index} className="p-3 rounded-lg bg-blue-100 text-gray-800 w-3/4">
              {q}
            </div>
          ))}
        </div>

        <button
          onClick={() =>
            setCurrentQuestion((prev) => (prev < questions.length - 1 ? prev + 1 : prev))
          }
          className="mt-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full md:w-auto"
        >
          Next Question ➡️
        </button>
      </div>

      <div className="relative w-full md:w-1/2 flex items-center justify-center bg-gray-900">
        <video
          ref={videoRef}
          autoPlay
          className="absolute inset-0 w-full h-full object-cover z-10 md:relative md:w-3/4 md:h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default MockInterview;
