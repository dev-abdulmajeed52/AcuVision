import React, { useState, useEffect, useRef } from 'react';
import { XCircle, Loader } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages(prev => [...prev, { text: message, sender: 'user' }]);
      setMessage('');
      
      setIsTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'Thanks for your message! How can I help?', sender: 'bot' }]);
        setIsTyping(false);
      }, 1500);
    }
  };

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <>
      {/* Chat Open Button */}
      <div 
        className="fixed bottom-6 right-6 cursor-pointer z-50 transition-transform duration-200 hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative">
          <div className={`absolute inset-0 animate-ping bg-indigo-500/30 rounded-full ${isOpen ? 'animate-none' : ''}`} />
          <div className="p-4 rounded-full shadow-lg bg-[#f0f2ff]">
            <img src="/svg/logo.svg" alt="Chat" className="h-10 w-10" />
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
        <div className={`bg-white rounded-2xl shadow-2xl w-[450px] h-[550px] flex flex-col transition-transform duration-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Header */}
          <div className="bg-[#f0f2ff] p-4 rounded-t-2xl flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <img src="/svg/logo.svg" alt="Logo" className="h-8 w-8" />
              <h2 className="text-black font-semibold text-lg">ACU Assistant</h2>
            </div>
            <button
              className="text-gray-600 hover:text-red-500 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <XCircle size={24} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-hidden p-4 space-y-3">
            <div className="overflow-y-auto h-full pr-2 scrollbar-none">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} transition-opacity duration-300 animate-fade-in`}>
                  <div className={`max-w-[70%] rounded-lg p-3 shadow-md ${
                    msg.sender === 'user' 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[70%] rounded-lg p-3 bg-gray-100 text-gray-800 shadow-md flex items-center space-x-2">
                    <Loader size={18} className="animate-spin text-indigo-500" />
                    <span>Typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>
          </div>

          {/* Input Box */}
          <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-200 shadow-md"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
