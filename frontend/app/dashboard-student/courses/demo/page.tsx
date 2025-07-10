"use client";

import { useState } from "react";
import Navbar from "../../../../components/Navbar";
import Sidebar from "../../../../components/Sidebar";
import CourseTabs from "../../../../components/CourseTabs";
import {
    BookOpen,
    BookMarked,
    Calendar,
    ClipboardList,
    GraduationCap,
    MessageCircle,
    Settings
} from 'lucide-react';

// Mock data del curso
const course = {
    name: "Introducción a la Programación",
    professors: ["Dr. Juan Pérez", "Lic. Ana García"],
    description: "Aprende los fundamentos de la programación con Python y conceptos básicos de algoritmos.",
    progress: 65,
    color: "from-universidad-azul to-blue-600",
};

const sidebarItems = [
    { name: "Dashboard", icon: BookOpen, active: false },
    { name: "Mis Cursos", icon: BookMarked, active: true },
    { name: "Calendario", icon: Calendar, active: false },
    { name: "Tareas", icon: ClipboardList, active: false },
    { name: "Calificaciones", icon: GraduationCap, active: false },
    { name: "Chat", icon: MessageCircle, active: false },
    { name: "Configuración", icon: Settings, active: false },
];

export default function CourseDemoPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Navbar studentName="María González" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex">
                {/* Sidebar */}
                <div className="hidden md:block">
                    <Sidebar items={sidebarItems} />
                </div>
                {/* Sidebar mobile */}
                <div className={`fixed inset-0 z-20 md:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)} />
                <div className={`fixed top-0 left-0 z-30 w-64 h-full bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <Sidebar items={sidebarItems} />
                </div>
                {/* Main Content */}
                <main className="flex-1 p-4 md:p-8">
                    {/* Encabezado del Curso */}
                    <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-8">
                        <h1 className="text-3xl font-bold text-universidad-azul dark:text-blue-400 mb-2">{course.name}</h1>
                        <h2 className="text-lg text-gray-700 dark:text-gray-300 mb-1">Profesores: {course.professors.join(', ')}</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{course.description}</p>
                        {/* Barra de progreso */}
                        <div className="mb-2">
                            <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-gray-600 dark:text-gray-400">Progreso del curso</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div className={`h-2 rounded-full bg-gradient-to-r ${course.color}`} style={{ width: `${course.progress}%` }}></div>
                            </div>
                        </div>
                    </section>
                    {/* Tabs y contenido dinámico */}
                    <CourseTabs />
                </main>
            </div>
        </div>
    );
} 