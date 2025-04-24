import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { FaUserCircle, FaClock } from 'react-icons/fa';

const Interview = () => {
  const { jobId } = useParams();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [sessionExpired, setSessionExpired] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const chatContainerRef = useRef(null);
  const timerRef = useRef(null);

  // Session timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  // Format time to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchInterview = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const response = await api.post(
          '/applicant/chat-interview',
          { jobId, message: 'lets start' },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setInterview(response.data);
      } catch (error) {
        console.error('Error starting interview:', error);
        setError('Failed to start interview. Please try again.');
        if (error.response?.data?.msg === 'Active interview session not found or expired') {
          setSessionExpired(true);
          clearInterval(timerRef.current);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [jobId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [interview?.chatHistory]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || loading || sessionExpired) return;

    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(
        '/applicant/interview/continue',
        { jobId, message: message.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const tempMessage = {
        role: 'applicant',
        message: message.trim(),
        _id: Date.now().toString(),
      };

      setInterview(prev => ({
        ...prev,
        chatHistory: [...(prev?.chatHistory || []), tempMessage]
      }));

      await new Promise(resolve => setTimeout(resolve, 100));

      setInterview(prev => ({
        ...response.data,
        chatHistory: [
          ...(prev?.chatHistory.filter(msg => msg._id !== tempMessage._id) || []),
          ...(response.data?.chatHistory || [])
        ]
      }));

      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setInterview(prev => ({
        ...prev,
        chatHistory: prev?.chatHistory?.filter(msg => msg._id !== tempMessage._id) || []
      }));

      if (error.response?.data?.msg === 'Active interview session not found or expired') {
        setSessionExpired(true);
        setError('Session expired. Please refresh the page to start a new interview.');
        clearInterval(timerRef.current);
      } else {
        setError(error.response?.data?.message || 'Failed to send message. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatMessage = (msg) => {
    return msg.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Interview Session</h1>
          {interview?.jobDetails && (
            <p className="text-sm text-gray-600 mt-1">{interview.jobDetails.title}</p>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <FaClock className="text-lg" />
            <span className="text-sm font-medium">Session: {formatTime(sessionTime)}</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <FaUserCircle className="text-3xl text-gray-700 hover:text-gray-900 transition-colors" />
            </button>
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-xl rounded-xl p-5 z-10">
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">Interview Details</h3>
                {interview?.jobDetails && (
                  <div className="text-sm text-gray-600 space-y-3">
                    <p><span className="font-medium">Position:</span> {interview.jobDetails.title}</p>
                    <p><span className="font-medium">Description:</span> {interview.jobDetails.description}</p>
                    <div>
                      <p className="font-medium">Requirements:</p>
                      <ul className="list-disc list-inside pl-2 space-y-1">
                        {interview.jobDetails.requirements?.map((req, index) => (
                          <li key={index} className="text-gray-600">{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Status messages */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
          {error}
        </div>
      )}
      {loading && (
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded-lg">
          Processing...
        </div>
      )}
      {sessionExpired && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-lg">
          This interview session has ended. Please refresh the page to start a new one.
        </div>
      )}

      {/* Chat container */}
      <div
        ref={chatContainerRef}
        className="border border-gray-200 rounded-xl h-[65vh] overflow-y-auto p-6 bg-white shadow-sm mb-6"
      >
        {interview?.chatHistory?.length > 0 ? (
          interview.chatHistory.map((chat) => (
            <div
              key={chat._id}
              className={`flex ${chat.role === 'applicant' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-2xl ${chat.role === 'applicant'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
                  }`}
              >
                <p className="font-semibold text-xs mb-2 opacity-80">
                  {chat.role === 'applicant' ? 'You' : 'Interviewer'}
                </p>
                <p className="whitespace-pre-wrap text-sm">{formatMessage(chat.message)}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-400 text-lg">The interview is starting...</p>
          </div>
        )}
      </div>

      {/* Message input */}
      <form onSubmit={handleSendMessage} className="sticky bottom-0 bg-white pt-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={sessionExpired ? 'Session has ended' : 'Type your response...'}
            disabled={loading || sessionExpired}
            className="flex-1 p-4 border border-gray-200 rounded-xl resize-none min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-sm"
            rows={4}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={loading || sessionExpired || !message.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl disabled:bg-gray-400 transition-colors font-medium"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
        {!sessionExpired && (
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        )}
      </form>
    </div>
  );
};

export default Interview;