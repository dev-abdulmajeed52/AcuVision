import React, { useState } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
      setTimeout(() => {
        setMessages(prev => [...prev, 'Thanks for your message! How can I help?']);
      }, 1000);
    }
  };

  return (
    <>
      <div 
        className="fixed bottom-5 right-5 cursor-pointer z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative">
          <div className={`absolute inset-0 animate-ping bg-indigo-500/30 rounded-full ${isOpen ? 'animate-none' : ''}`} />
          <div className={`p-4 rounded-full shadow-lg bg-[#f0f2ff] ${!isOpen ? 'animate-jump' : ''}`}>
            <img 
              src="/svg/logo.svg" 
              alt="Chat" 
              className="h-10 w-10"
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-[400px] h-[500px] flex flex-col">
            <div className="bg-[#f0f2ff] p-4 rounded-t-xl flex items-center space-x-3">
              <img 
                src="/svg/logo.svg" 
                alt="Logo" 
                className="h-8 w-8"
              />
              <h2 className="text-black font-semibold text-lg">ACU Assistant</h2>
              <button
                className="text-black flex-1"
                onClick={() => setIsOpen(false)}
              >
                X
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] rounded-lg p-3 ${
                    index % 2 === 0 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {msg}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
