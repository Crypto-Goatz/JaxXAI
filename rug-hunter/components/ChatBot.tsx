import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { ChatBubbleIcon, XMarkIcon, PaperAirplaneIcon } from './icons';
import { chatWithBot } from '../services/geminiService';

const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { sender: 'bot', text: 'Hello! How can I help you analyze your strategy today?' }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const chatboxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!userInput.trim()) return;
        
        const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: userInput }];
        setMessages(newMessages);
        const currentInput = userInput;
        setUserInput('');
        setIsLoading(true);

        const botResponse = await chatWithBot(newMessages, currentInput);
        setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
        setIsLoading(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-gradient-to-br from-teal-400 to-pink-500 text-white rounded-full p-4 shadow-lg shadow-teal-500/30 hover:scale-110 transition-transform"
                aria-label="Toggle Chat"
            >
                {isOpen ? <XMarkIcon className="h-8 w-8" /> : <ChatBubbleIcon className="h-8 w-8" />}
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 w-full max-w-sm h-[60vh] bg-purple-900/50 backdrop-blur-xl border border-purple-700 rounded-xl shadow-2xl flex flex-col">
                    <header className="p-4 border-b border-purple-700">
                        <h3 className="font-bold text-white text-lg text-center">AI Strategy Assistant</h3>
                    </header>
                    <div ref={chatboxRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                                <p className={`max-w-[80%] py-2 px-4 rounded-2xl ${
                                    msg.sender === 'bot' ? 'bg-purple-800 text-white rounded-bl-none' : 'bg-teal-400 text-black rounded-br-none'
                                }`}>
                                    {msg.text}
                                </p>
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex justify-start">
                                <p className="bg-purple-800 text-white py-2 px-4 rounded-2xl rounded-bl-none">
                                    <span className="animate-pulse">...</span>
                                </p>
                            </div>
                         )}
                    </div>
                    <div className="p-4 border-t border-purple-700 flex items-center">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                            placeholder="Ask me anything..."
                            className="flex-1 bg-purple-800/70 border border-purple-600 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            disabled={isLoading}
                        />
                        <button onClick={handleSend} disabled={isLoading} className="ml-3 p-2 text-teal-400 disabled:text-gray-600">
                            <PaperAirplaneIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;