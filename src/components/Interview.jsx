import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const Interview = () => {
  const { jobId } = useParams();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    handleStartInterview();
  }, [jobId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [interview?.chatHistory]);

  const handleStartInterview = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(
        '/applicant/chat-interview',
        {
          jobId: jobId,
          message: 'lets start',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInterview(response.data);
    } catch (error) {
      console.error('Error starting interview:', error);
      setError('An error occurred while starting the interview.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
  
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(
        `/applicant/chat-interview/${interview._id}/message`,
        {
          message: message.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInterview(response.data);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setError('An error occurred while sending the message.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">
        Interview for: {interview?.jobDetails?.title || 'Loading...'}
      </h2>

      {error && <div className="text-red-600 mb-2">{error}</div>}
      {loading && <div className="text-blue-600 mb-2">Loading...</div>}

      {interview?.jobDetails && (
        <div className="bg-gray-100 p-4 rounded mb-6">
          <h3 className="text-xl font-semibold mb-2">Job Details</h3>
          <p className="mb-2">{interview.jobDetails.description}</p>
          <ul className="list-disc list-inside space-y-1">
            {interview.jobDetails.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      <div
        ref={chatContainerRef}
        className="border border-gray-300 rounded h-96 overflow-y-auto p-4 mb-4 bg-white space-y-3"
      >
        {interview?.chatHistory?.length > 0 ? (
          interview.chatHistory.map((chat) => (
            <div
              key={chat._id}
              className={`p-3 rounded w-fit max-w-full ${
                chat.role === 'applicant'
                  ? 'ml-auto bg-blue-100 text-right'
                  : 'mr-auto bg-gray-200 text-left'
              }`}
            >
              <p className="font-semibold">
                {chat.role === 'applicant' ? 'You' : 'AI'}:
              </p>
              <p>{chat.message}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet.</p>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="flex flex-col sm:flex-row gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
          className="flex-1 p-2 border rounded resize-none min-h-[60px]"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Interview;
