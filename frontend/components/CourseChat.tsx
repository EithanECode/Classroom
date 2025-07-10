"use client";

import { useState } from 'react';
import { Send } from 'lucide-react';

const mockMessages = [
    { id: 1, sender: 'Ana', content: '¡Hola a todos!', isMe: false },
    { id: 2, sender: 'Tú', content: '¡Hola! ¿Listos para la clase?', isMe: true },
    { id: 3, sender: 'Carlos', content: 'Sí, esperando al profe.', isMe: false },
];

export default function CourseChat() {
    const [messages, setMessages] = useState(mockMessages);
    const [input, setInput] = useState('');

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            setMessages([...messages, { id: messages.length + 1, sender: 'Tú', content: input, isMe: true }]);
            setInput('');
        }
    };

    return (
        <div className="flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-96">
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`px-4 py-2 rounded-2xl text-sm max-w-xs md:max-w-md break-words shadow-sm
              ${msg.isMe
                                ? 'bg-gradient-to-r from-universidad-azul to-blue-600 text-white rounded-br-none'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none border border-gray-100 dark:border-gray-700'
                            }`}>
                            <span className="font-semibold text-xs block mb-1">{msg.sender}</span>
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSend} className="flex items-center gap-2 p-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-xl">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-universidad-azul focus:border-transparent"
                />
                <button type="submit" className="p-2 rounded-full bg-universidad-azul dark:bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    <Send className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
} 