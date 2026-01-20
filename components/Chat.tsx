
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Message } from '../types';
import { getAiReply } from '../services/geminiService';

const Chat: React.FC = () => {
  const { orderId } = useParams();
  const [messages, setMessages] = useState<Message[]>([
    { id: 'm1', senderId: 'ai', text: `Hi! I'm your project assistant for order #${orderId?.substr(0, 6)}. How can I help?`, timestamp: new Date().toISOString() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      text: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const replyText = await getAiReply(input);
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      senderId: 'ai',
      text: replyText,
      timestamp: new Date().toISOString()
    };

    setIsTyping(false);
    setMessages(prev => [...prev, aiMsg]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-160px)] flex flex-col">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-all">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div>
            <h1 className="text-xl font-black text-slate-900">Project Chat</h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Order #{orderId?.substr(0, 8)}</p>
          </div>
        </div>
        <div className="flex -space-x-2">
           <img src="https://picsum.photos/seed/u1/40/40" className="w-10 h-10 rounded-full border-2 border-white ring-2 ring-slate-50" />
           <div className="w-10 h-10 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">AI</div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-grow bg-white rounded-3xl border border-slate-100 shadow-inner p-6 overflow-y-auto space-y-6 mb-4 no-scrollbar">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.senderId === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 text-sm font-medium ${
              msg.senderId === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-100' 
                : 'bg-slate-100 text-slate-700 rounded-tl-none'
            }`}>
              {msg.text}
              <div className={`text-[10px] mt-2 opacity-60 ${msg.senderId === 'user' ? 'text-right' : 'text-left'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-slate-50 text-slate-400 p-4 rounded-2xl flex gap-1">
               <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
               <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-75"></div>
               <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-150"></div>
             </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="relative">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your order status or brief..."
          className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 pr-16 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-xl shadow-slate-100"
        />
        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-all">
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default Chat;
