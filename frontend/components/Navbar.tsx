import { Bell, User, Menu, X, GraduationCap } from 'lucide-react';
import React from 'react';

interface NavbarProps {
    studentName: string;
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ studentName, sidebarOpen, setSidebarOpen }) => (
    <nav className="bg-white border-b border-gray-200 shadow-sm w-full">
        <div className="flex justify-between items-center h-16 w-full px-4 sm:px-6 lg:px-8">
            {/* Título a la izquierda, pegado al borde */}
            <div className="flex items-center min-w-0">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors mr-2"
                >
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-universidad-azul to-blue-600 rounded-lg flex items-center justify-center">
                        <GraduationCap size={20} className="text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900 truncate">EduPlatform</span>
                </div>
            </div>
            {/* Mensaje e iconos a la derecha */}
            <div className="flex items-center space-x-6 ml-auto">
                <span className="text-sm font-medium text-gray-700 hidden md:inline">Buenos días, {studentName}</span>
                <div className="flex items-center space-x-3">
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                        <Bell size={20} className="text-gray-600" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                            3
                        </span>
                    </button>                    <div className="w-8 h-8 bg-gradient-to-r from-universidad-azul to-blue-600 rounded-full flex items-center justify-center">
                        <User size={16} className="text-white" />
                    </div>
                </div>
            </div>
        </div>
    </nav>
);

export default Navbar; 