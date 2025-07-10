'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Bell,
    User,
    LogOut,
    BookOpen,
    ClipboardList,
    GraduationCap,
    MessageCircle,
    Settings,
    Globe,
    Monitor,
    Calculator,
    FlaskConical,
    Palette,
    Menu,
    X,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Plus,
    Clock,
    Users,
    TrendingUp,
    Award,
    Target,
    BookMarked
} from 'lucide-react';
import Sidebar, { SidebarItem } from '../components/Sidebar';

// Mock data for enrolled courses
const enrolledCourses = [
    {
        id: 1,
        name: 'Introducción a la Programación',
        description: 'Fundamentos de programación con Python y conceptos básicos de algoritmos.',
        icon: Monitor,
        color: 'from-blue-400 to-blue-600',
        progress: 75,
        nextClass: 'Hoy 2:00 PM',
        students: 234
    },
    {
        id: 2,
        name: 'Matemáticas Avanzadas',
        description: 'Cálculo diferencial e integral aplicado a problemas reales.',
        icon: Calculator,
        color: 'from-green-400 to-green-600',
        progress: 60,
        nextClass: 'Mañana 10:00 AM',
        students: 189
    },
    {
        id: 3,
        name: 'Desarrollo Web Frontend',
        description: 'HTML, CSS, JavaScript y frameworks modernos como React.',
        icon: Globe,
        color: 'from-purple-400 to-purple-600',
        progress: 85,
        nextClass: 'Viernes 3:30 PM',
        students: 156
    },
    {
        id: 4,
        name: 'Química Orgánica',
        description: 'Estudio de compuestos orgánicos y sus reacciones principales.',
        icon: FlaskConical,
        color: 'from-red-400 to-red-600',
        progress: 45,
        nextClass: 'Lunes 9:00 AM',
        students: 98
    },
    {
        id: 5,
        name: 'Diseño Gráfico Digital',
        description: 'Principios de diseño visual y herramientas digitales profesionales.',
        icon: Palette,
        color: 'from-pink-400 to-pink-600',
        progress: 90,
        nextClass: 'Miércoles 1:00 PM',
        students: 145
    },
    {
        id: 6,
        name: 'Bases de Datos',
        description: 'Diseño, implementación y administración de sistemas de bases de datos.',
        icon: BookOpen,
        color: 'from-indigo-400 to-indigo-600',
        progress: 55,
        nextClass: 'Jueves 11:00 AM',
        students: 203
    }
];

// Definir los ítems del sidebar
const sidebarItems: SidebarItem[] = [
    { name: 'Dashboard', icon: BookOpen, active: true },
    { name: 'Mis Cursos', icon: BookMarked, active: false },
    { name: 'Calendario', icon: Calendar, active: false },
    { name: 'Tareas', icon: ClipboardList, active: false },
    { name: 'Calificaciones', icon: GraduationCap, active: false },
    { name: 'Chat', icon: MessageCircle, active: false },
    { name: 'Configuración', icon: Settings, active: false }
];

const upcomingEvents = [
    { id: 1, title: 'Examen de Programación', time: '10:00 AM', date: '15 May', color: 'bg-blue-500' },
    { id: 2, title: 'Entrega Proyecto Web', time: '11:59 PM', date: '18 May', color: 'bg-purple-500' },
    { id: 3, title: 'Presentación Diseño', time: '2:00 PM', date: '20 May', color: 'bg-pink-500' },
    { id: 4, title: 'Quiz Matemáticas', time: '9:00 AM', date: '22 May', color: 'bg-green-500' }
];

const quickStats = [
    { label: 'Cursos Activos', value: '6', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
    { label: 'Promedio General', value: '8.7', icon: TrendingUp, color: 'from-green-500 to-green-600' },
    { label: 'Tareas Pendientes', value: '4', icon: Target, color: 'from-orange-500 to-orange-600' },
    { label: 'Certificados', value: '12', icon: Award, color: 'from-purple-500 to-purple-600' }
];

export default function StudentDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const studentName = 'María González';

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            if (direction === 'prev') {
                newDate.setMonth(prev.getMonth() - 1);
            } else {
                newDate.setMonth(prev.getMonth() + 1);
            }
            return newDate;
        });
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];
        const today = new Date();

        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-8"></div>);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = today.getDate() === day &&
                today.getMonth() === currentDate.getMonth() &&
                today.getFullYear() === currentDate.getFullYear();

            days.push(
                <div
                    key={day}
                    className={`h-8 w-8 flex items-center justify-center text-sm rounded-lg cursor-pointer transition-colors ${isToday
                        ? 'bg-universidad-azul text-white font-semibold'
                        : 'hover:bg-gray-100 text-gray-700'
                        }`}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation Bar */}
            <nav className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                            >
                                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-universidad-azul to-blue-600 rounded-lg flex items-center justify-center">
                                        <GraduationCap size={20} className="text-white" />
                                    </div>
                                    <span className="text-xl font-bold text-gray-900">EduPlatform</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6">
                            <span className="text-sm font-medium text-gray-700">Buenos días, {studentName}</span>
                            <div className="flex items-center space-x-3">
                                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                                    <Bell size={20} className="text-gray-600" />
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                        3
                                    </span>
                                </button>
                                <div className="w-8 h-8 bg-gradient-to-r from-universidad-azul to-blue-600 rounded-full flex items-center justify-center">
                                    <User size={16} className="text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex">
                {/* Sidebar */}
                <Sidebar
                    items={sidebarItems.map(item => ({
                        ...item,
                        href: item.name === 'Dashboard' ? '/' :
                            item.name === 'Mis Cursos' ? '/dashboard-student/courses' :
                                item.name === 'Calendario' ? '/dashboard-student/calendar' :
                                    item.name === 'Tareas' ? '/dashboard-student/assignments' :
                                        item.name === 'Calificaciones' ? '/dashboard-student/grades' :
                                            item.name === 'Chat' ? '/dashboard-student/chat' :
                                                item.name === 'Configuración' ? '/configuracion' : '#'
                    }))}
                />

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 p-6 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard del Estudiante</h1>
                            <p className="text-gray-600">Bienvenido de vuelta, continúa tu aprendizaje donde lo dejaste</p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {quickStats.map((stat, index) => (
                                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                            <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                                        </div>
                                        <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                                            <stat.icon size={24} className="text-white" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Courses Section */}
                            <div className="lg:col-span-2">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Mis Cursos</h2>
                                    <button className="text-universidad-azul hover:text-blue-700 font-medium">Ver todos</button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {enrolledCourses.slice(0, 4).map((course) => (
                                        <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                            <div className="p-6">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className={`p-3 rounded-xl bg-gradient-to-r ${course.color}`}>
                                                        <course.icon size={24} className="text-white" />
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="flex items-center space-x-1 text-gray-500 text-sm">
                                                            <Users size={14} />
                                                            <span>{course.students}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.name}</h3>
                                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                                                <div className="mb-4">
                                                    <div className="flex items-center justify-between text-sm mb-2">
                                                        <span className="text-gray-600">Progreso</span>
                                                        <span className="font-semibold text-gray-900">{course.progress}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className={`h-2 rounded-full bg-gradient-to-r ${course.color}`}
                                                            style={{ width: `${course.progress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-1 text-gray-500 text-sm">
                                                        <Clock size={14} />
                                                        <span>{course.nextClass}</span>
                                                    </div>
                                                    <button className="bg-gradient-to-r from-universidad-azul to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm">
                                                        Continuar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Calendar and Events Section */}
                            <div className="space-y-6">
                                {/* Calendar */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                        </h3>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => navigateMonth('prev')}
                                                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                                            >
                                                <ChevronLeft size={16} className="text-gray-600" />
                                            </button>
                                            <button
                                                onClick={() => navigateMonth('next')}
                                                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                                            >
                                                <ChevronRight size={16} className="text-gray-600" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-7 gap-1 mb-2">
                                        {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map(day => (
                                            <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-7 gap-1">
                                        {renderCalendar()}
                                    </div>

                                    <button className="w-full mt-4 bg-gradient-to-r from-universidad-azul to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2">
                                        <Plus size={16} />
                                        <span>Agregar evento</span>
                                    </button>
                                </div>

                                {/* Upcoming Events */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Próximos Eventos</h3>
                                        <button className="text-universidad-azul hover:text-blue-700 font-medium text-sm">Ver todos</button>
                                    </div>

                                    <div className="space-y-3">
                                        {upcomingEvents.map((event) => (
                                            <div key={event.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                                <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                                                    <p className="text-xs text-gray-500">{event.date} • {event.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}