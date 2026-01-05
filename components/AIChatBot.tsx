
import React, { useState, useRef, useEffect } from 'react';
import { getAIResponse } from '../services/geminiService';

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hello! I am your Monster Electrical Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    const botMsg = await getAIResponse(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: botMsg || 'Sorry, I missed that.' }]);
    setIsTyping(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 bg-yellow-500 text-black rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
      >
        <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-robot'} text-2xl`}></i>
      </button>

      {isOpen && (
        <div className="fixed bottom-40 right-6 z-50 w-80 md:w-96 bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden max-h-[500px]">
          <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Service Assistant
            </h3>
            <button onClick={() => setIsOpen(false)}><i className="fa-solid fa-minus"></i></button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm shadow-sm ${
                  m.role === 'user' ? 'bg-yellow-500 text-black rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-lg text-sm animate-pulse">
                  Assistant is thinking...
                </div>
              </div>
            )}
          </div>
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about solar or COC..."
              className="flex-1 bg-gray-100 border-none focus:ring-2 focus:ring-yellow-500 rounded-lg px-4 py-2 text-sm"
            />
            <button
              onClick={handleSend}
              className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatBot;
