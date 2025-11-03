import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';

const ChatBot: React.FC<{onClose: () => void}> = ({onClose}) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize the chat session
    if (!process.env.API_KEY) {
        console.error("API Key not found.");
        setMessages([{role: 'model', text: "I'm sorry, my connection to Gemini is not configured. (API key is missing)."}]);
        return;
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        history: [], // Start with a fresh history
    });
     setMessages([{role: 'model', text: "Hi! I'm the AlphaHunter assistant. How can I help you with your trading analysis today?"}]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || !chatRef.current) return;

    const userMessage = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const result = await chatRef.current.sendMessage({ message: currentInput });
      const botMessage = { role: 'model' as const, text: result.text };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Gemini API error:", error);
      const errorMessage = { role: 'model' as const, text: "Sorry, I encountered an error. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 sm:right-6 lg:right-8 w-11/12 max-w-sm h-[60vh] max-h-[500px] bg-slate-800 rounded-lg shadow-2xl border border-slate-700 flex flex-col z-50 animate-fade-in-up">
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
      <header className="bg-slate-700/50 p-3 flex justify-between items-center rounded-t-lg flex-shrink-0">
        <h3 className="text-white font-semibold text-lg">AlphaHunter AI Assistant</h3>
        <button onClick={onClose} className="text-gray-300 hover:text-white">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      </header>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-slate-700 text-gray-200'}`}>
                <p className="text-sm break-words">{msg.text}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
               <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-slate-700 text-gray-200">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                </div>
               </div>
            </div>
          )}
           <div ref={messagesEndRef} />
        </div>
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your trades..."
            className="flex-1 bg-slate-900 border border-slate-600 rounded-full py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            aria-label="Send message"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
