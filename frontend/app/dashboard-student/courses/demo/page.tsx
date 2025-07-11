"use client";

import { useState } from "react";
import Navbar from "../../../../components/Navbar";
import CourseSidebar from '../../../../components/CourseSidebar';
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
            <div className="flex flex-row min-h-[calc(100vh-4rem)]">
                {/* Panel principal a la izquierda */}
                <main className="flex-1 p-4 md:p-8 flex flex-col gap-8">
                    {/* Panel principal */}
                    <section className="flex items-center justify-center h-[40rem] bg-gradient-to-br from-universidad-azul/10 to-yellow-200/10 dark:from-blue-900/20 dark:to-yellow-400/10 rounded-xl border-2 border-dashed border-universidad-azul/30 dark:border-blue-400/30">
                        <span className="text-xl text-universidad-azul dark:text-blue-400 font-semibold">Aquí se mostrará el video, PDF o material de la clase seleccionada</span>
                    </section>
                    {/* Información del curso debajo */}
                    <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
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
                </main>
                {/* Sidebar contextual a la derecha */}
                <CourseSidebar />
            </div>
        </div>
    );
} 