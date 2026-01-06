
import React from 'react';

const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/27724904296"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[60] flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_10px_25px_-5px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:bg-[#20ba5a] active:scale-95 group"
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-0"></span>
      <i className="fa-brands fa-whatsapp text-4xl relative z-10"></i>
      <span className="absolute right-20 bg-white text-gray-800 px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-xl pointer-events-none translate-x-4 group-hover:translate-x-0 border border-gray-100">
        Need help? Chat now
      </span>
    </a>
  );
};

export default WhatsAppButton;
