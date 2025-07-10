"use client";

import { useState } from "react";
import Sidebar, { SidebarItem } from "../../../components/Sidebar";
import Navbar from '../../../components/Navbar';
import {
    BookOpen,
    BookMarked,
    Calendar,
    ClipboardList,
    GraduationCap,
    MessageCircle,
    Settings,
    User,
    Users,
    Send,
    Paperclip,
    Info,
    Video,
} from "lucide-react";

// Mock data para la lista de chats
const chatList = [
    {
        id: 1,
        name: "Matemáticas Avanzadas - Salón",
        type: "group",
        unread: 2,
        lastMessage: "¿Alguien entendió el ejercicio 5?",
        lastTime: "13:45",
    },
    {
        id: 2,
        name: "Profesor Juan Pérez",
        type: "private",
        unread: 0,
        lastMessage: "Recuerda entregar la tarea mañana.",
        lastTime: "12:10",
    },
    {
        id: 3,
        name: "Introducción a la Programación - Salón",
        type: "group",
        unread: 5,
        lastMessage: "Clase grabada disponible en la plataforma.",
        lastTime: "11:30",
    },
    {
        id: 4,
        name: "Profesora María González",
        type: "private",
        unread: 1,
        lastMessage: "¿Tienes dudas sobre el proyecto?",
        lastTime: "09:20",
    },
];

interface ChatMessage {
    sender: string;
    content: string;
    time: string;
    isMe: boolean;
};

// Mock data para mensajes de la conversación activa
const chatMessages: Record<number, ChatMessage[]> = {
    1: [
        {
            sender: "Estudiante (Tú)",
            content: "¿Alguien puede explicar el ejercicio 3?",
            time: "13:40",
            isMe: true,
        },
        {
            sender: "Ana López",
            content: "Creo que hay que usar integración por partes.",
            time: "13:41",
            isMe: false,
        },
        {
            sender: "Estudiante (Tú)",
            content: "¡Gracias!",
            time: "13:42",
            isMe: true,
        },
        {
            sender: "Carlos Ruiz",
            content: "¿Y el ejercicio 5?",
            time: "13:44",
            isMe: false,
        },
        {
            sender: "Estudiante (Tú)",
            content: "Ese no lo entendí tampoco...",
            time: "13:45",
            isMe: true,
        },
    ],
    2: [
        {
            sender: "Profesor Juan Pérez",
            content: "Recuerda entregar la tarea mañana.",
            time: "12:10",
            isMe: false,
        },
        {
            sender: "Estudiante (Tú)",
            content: "¡Gracias, profe!",
            time: "12:11",
            isMe: true,
        },
    ],
    3: [
        {
            sender: "Estudiante (Tú)",
            content: "¿Dónde está la grabación de la clase?",
            time: "11:25",
            isMe: true,
        },
        {
            sender: "Admin Plataforma",
            content: "Clase grabada disponible en la plataforma.",
            time: "11:30",
            isMe: false,
        },
    ],
    4: [
        {
            sender: "Profesora María González",
            content: "¿Tienes dudas sobre el proyecto?",
            time: "09:20",
            isMe: false,
        },
        {
            sender: "Estudiante (Tú)",
            content: "Sí, ¿puede explicarme la rúbrica?",
            time: "09:21",
            isMe: true,
        },
    ],
};

const sidebarItems: SidebarItem[] = [
    { name: "Dashboard", icon: BookOpen, active: false },
    { name: "Mis Cursos", icon: BookMarked, active: false },
    { name: "Calendario", icon: Calendar, active: false },
    { name: "Tareas", icon: ClipboardList, active: false },
    { name: "Calificaciones", icon: GraduationCap, active: false },
    { name: "Chat", icon: MessageCircle, active: true },
    { name: "Configuración", icon: Settings, active: false },
];

export default function StudentChatPage() {
    const [activeChatId, setActiveChatId] = useState(1);
    const [message, setMessage] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const activeChat = chatList.find((chat) => chat.id === activeChatId);
    const messages: ChatMessage[] = chatMessages[activeChatId] || [];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar studentName="Estudiante" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex">
                {/* Sidebar para desktop */}
                <div className="hidden md:block md:relative z-30 w-64 bg-white shadow-lg h-screen border-r border-gray-200">
                    <Sidebar items={sidebarItems} />
                </div>
                {/* Sidebar para mobile (panel deslizante animado) */}
                <div className={`fixed inset-0 z-20 md:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setSidebarOpen(false)}
                />
                <div className={`fixed top-0 left-0 z-30 w-64 h-full bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <Sidebar items={sidebarItems} />
                </div>
                {/* Main Content */}
                <main className="flex-1 flex flex-col md:flex-row p-0 md:p-8">
                    {/* Panel Izquierdo: Lista de Chats */}
                    <aside className="w-full md:w-80 bg-white border-r border-gray-100 flex-shrink-0 flex flex-col h-[70vh] md:h-[80vh] md:rounded-2xl md:shadow-md overflow-hidden">
                        <h1 className="text-2xl font-bold text-gray-900 px-6 py-4 border-b border-gray-100">Mis Chats</h1>
                        <div className="flex-1 overflow-y-auto">
                            {chatList.map((chat) => (
                                <button
                                    key={chat.id}
                                    onClick={() => setActiveChatId(chat.id)}
                                    className={`w-full flex items-center px-6 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors focus:outline-none ${activeChatId === chat.id ? "bg-blue-50" : ""
                                        }`}
                                >
                                    <div className="mr-4">
                                        {chat.type === "group" ? (
                                            <Users size={22} className="text-universidad-azul" />
                                        ) : (
                                            <User size={22} className="text-universidad-azul" />
                                        )}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="font-medium text-gray-900 truncate">{chat.name}</div>
                                        <div className="text-xs text-gray-500 truncate mt-1">{chat.lastMessage}</div>
                                    </div>
                                    <div className="flex flex-col items-end ml-4">
                                        <span className="text-xs text-gray-400 mb-1">{chat.lastTime}</span>
                                        {chat.unread > 0 && (
                                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold bg-yellow-400 text-white">
                                                {chat.unread}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </aside>
                    {/* Panel Derecho: Conversación Activa */}
                    <section className="flex-1 flex flex-col bg-white md:rounded-2xl md:shadow-md h-[70vh] md:h-[80vh] overflow-hidden">
                        {/* Encabezado de Conversación */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                            <div className="flex items-center space-x-3">
                                {activeChat?.type === "group" ? (
                                    <Users size={22} className="text-universidad-azul" />
                                ) : (
                                    <User size={22} className="text-universidad-azul" />
                                )}
                                <span className="font-semibold text-gray-900 text-lg truncate">
                                    {activeChat?.name}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Info size={20} className="text-gray-400 hover:text-universidad-azul cursor-pointer" />
                                <Video size={20} className="text-gray-400 hover:text-universidad-azul cursor-pointer" />
                            </div>
                        </div>
                        {/* Área de Mensajes */}
                        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gray-50">
                            {messages.map((msg: ChatMessage, idx: number) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow-sm text-sm break-words ${msg.isMe
                                            ? "bg-gradient-to-r from-universidad-azul to-blue-600 text-white rounded-br-none"
                                            : "bg-white text-gray-900 rounded-bl-none border border-gray-100"
                                            }`}
                                    >
                                        <div className="font-semibold mb-1 text-xs">
                                            {msg.sender}
                                        </div>
                                        <div>{msg.content}</div>
                                        <div className="text-xs text-gray-300 mt-1 text-right">
                                            {msg.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Campo de Entrada de Mensaje */}
                        <form
                            className="flex items-center gap-2 px-4 py-4 border-t border-gray-100 bg-white"
                            onSubmit={(e) => {
                                e.preventDefault();
                                // Aquí iría la lógica para enviar el mensaje
                                setMessage("");
                            }}
                        >
                            <button type="button" className="p-2 rounded-full hover:bg-gray-100">
                                <Paperclip size={20} className="text-gray-400" />
                            </button>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Escribe un mensaje..."
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-universidad-azul focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-universidad-azul to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all duration-200"
                            >
                                <Send size={18} className="mr-1" />
                                <span>Enviar</span>
                            </button>
                        </form>
                    </section>
                </main>
            </div>
        </div>
    );
} 