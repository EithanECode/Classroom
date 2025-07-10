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
  Calendar as CalendarIcon,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Video,
  FileText,
  Users,
  Plus,
  Filter,
  Search,
  BookMarked,
  AlertCircle,
  CheckCircle2,
  Play
} from 'lucide-react';
import Sidebar, { SidebarItem } from '../../../components/Sidebar';

// Mock data for calendar events
const calendarEvents = [
  {
    id: 1,
    title: 'Clase de Programación',
    course: 'Introducción a la Programación',
    professor: 'Dr. Carlos Mendoza',
    type: 'class',
    date: '2024-01-15',
    startTime: '10:00',
    endTime: '11:30',
    location: 'Aula Virtual 1',
    color: 'bg-blue-500',
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'Entrega Proyecto Final',
    course: 'Desarrollo Web Frontend',
    professor: 'Ing. Miguel Torres',
    type: 'assignment',
    date: '2024-01-15',
    startTime: '23:59',
    endTime: '23:59',
    location: 'Plataforma Online',
    color: 'bg-red-500',
    status: 'pending'
  },
  {
    id: 3,
    title: 'Examen Parcial',
    course: 'Matemáticas Avanzadas',
    professor: 'Dra. Ana García',
    type: 'exam',
    date: '2024-01-16',
    startTime: '14:00',
    endTime: '16:00',
    location: 'Aula 205',
    color: 'bg-orange-500',
    status: 'upcoming'
  },
  {
    id: 4,
    title: 'Laboratorio de Química',
    course: 'Química Orgánica',
    professor: 'Dr. Roberto Silva',
    type: 'lab',
    date: '2024-01-17',
    startTime: '09:00',
    endTime: '12:00',
    location: 'Laboratorio 3',
    color: 'bg-green-500',
    status: 'upcoming'
  },
  {
    id: 5,
    title: 'Presentación Grupal',
    course: 'Diseño Gráfico Digital',
    professor: 'Lic. Sofia Ramírez',
    type: 'presentation',
    date: '2024-01-18',
    startTime: '15:30',
    endTime: '17:00',
    location: 'Aula de Diseño',
    color: 'bg-purple-500',
    status: 'upcoming'
  },
  {
    id: 6,
    title: 'Quiz Semanal',
    course: 'Bases de Datos',
    professor: 'Ing. Laura Vega',
    type: 'quiz',
    date: '2024-01-19',
    startTime: '11:00',
    endTime: '11:30',
    location: 'Plataforma Online',
    color: 'bg-indigo-500',
    status: 'upcoming'
  },
  {
    id: 7,
    title: 'Tutoría Individual',
    course: 'Algoritmos y Estructuras de Datos',
    professor: 'Dr. Fernando López',
    type: 'tutoring',
    date: '2024-01-20',
    startTime: '16:00',
    endTime: '17:00',
    location: 'Oficina 301',
    color: 'bg-cyan-500',
    status: 'upcoming'
  },
  {
    id: 8,
    title: 'Clase de Fotografía',
    course: 'Fotografía Digital',
    professor: 'Mtro. Diego Herrera',
    type: 'class',
    date: '2024-01-22',
    startTime: '13:00',
    endTime: '15:00',
    location: 'Estudio Fotográfico',
    color: 'bg-yellow-500',
    status: 'upcoming'
  }
];

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', icon: BookOpen, active: false },
  { name: 'Mis Cursos', icon: BookMarked, active: false },
  { name: 'Calendario', icon: CalendarIcon, active: true },
  { name: 'Tareas', icon: ClipboardList, active: false },
  { name: 'Calificaciones', icon: GraduationCap, active: false },
  { name: 'Chat', icon: MessageCircle, active: false },
  { name: 'Configuración', icon: Settings, active: false }
];

const eventTypes = {
  class: { icon: Video, label: 'Clase', color: 'text-blue-600' },
  assignment: { icon: FileText, label: 'Tarea', color: 'text-red-600' },
  exam: { icon: AlertCircle, label: 'Examen', color: 'text-orange-600' },
  lab: { icon: Users, label: 'Laboratorio', color: 'text-green-600' },
  presentation: { icon: Play, label: 'Presentación', color: 'text-purple-600' },
  quiz: { icon: CheckCircle2, label: 'Quiz', color: 'text-indigo-600' },
  tutoring: { icon: MessageCircle, label: 'Tutoría', color: 'text-cyan-600' }
};

export default function StudentCalendarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const studentName = 'María González';

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

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

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date: string) => {
    return calendarEvents.filter(event => event.date === date);
  };

  const getSelectedDateEvents = () => {
    const dateStr = formatDate(selectedDate);
    return calendarEvents.filter(event => {
      const matchesDate = event.date === dateStr;
      const matchesSearch = searchTerm === '' ||
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.professor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || event.type === filterType;

      return matchesDate && matchesSearch && matchesFilter;
    });
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    const todayStr = formatDate(today);

    return calendarEvents
      .filter(event => event.date >= todayStr)
      .sort((a, b) => {
        if (a.date === b.date) {
          return a.startTime.localeCompare(b.startTime);
        }
        return a.date.localeCompare(b.date);
      })
      .slice(0, 5);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();
    const todayStr = formatDate(today);

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12 md:h-16"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateStr = formatDate(date);
      const dayEvents = getEventsForDate(dateStr);
      const isToday = dateStr === todayStr;
      const isSelected = dateStr === formatDate(selectedDate);

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-12 md:h-16 p-1 border border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${isToday ? 'bg-universidad-azul/10 border-universidad-azul' : ''
            } ${isSelected ? 'bg-universidad-azul/20 border-universidad-azul border-2' : ''}`}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-universidad-azul font-bold' : 'text-gray-700'
            }`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event, index) => (
              <div
                key={index}
                className={`w-full h-1 md:h-2 rounded-full ${event.color} opacity-80`}
              ></div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500 font-medium">
                +{dayEvents.length - 2}
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
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
        <Sidebar items={sidebarItems} />

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Calendario de Actividades</h1>
              <p className="text-gray-600">Gestiona tu horario académico y mantente al día con tus actividades</p>
            </div>

            {/* Calendar Controls */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                {/* Calendar Navigation */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigateMonth('prev')}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft size={20} className="text-gray-600" />
                    </button>
                    <h2 className="text-xl font-semibold text-gray-900 min-w-[200px] text-center">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <button
                      onClick={() => navigateMonth('next')}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight size={20} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-100 rounded-lg p-1 flex">
                    {['month', 'week', 'day'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setViewMode(mode as 'month' | 'week' | 'day')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors capitalize ${viewMode === mode
                          ? 'bg-white text-universidad-azul shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                          }`}
                      >
                        {mode === 'month' ? 'Mes' : mode === 'week' ? 'Semana' : 'Día'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calendar Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Calendar Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="grid grid-cols-7 gap-1">
                      {dayNames.map(day => (
                        <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="p-6">
                    <div className="grid grid-cols-7 gap-1">
                      {renderCalendar()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Events Section */}
              <div className="space-y-6">
                {/* Search and Filter */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Buscar Eventos</h3>

                  {/* Search Bar */}
                  <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Buscar eventos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-universidad-azul focus:border-transparent"
                    />
                  </div>

                  {/* Filter */}
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-universidad-azul focus:border-transparent"
                  >
                    <option value="all">Todos los tipos</option>
                    <option value="class">Clases</option>
                    <option value="assignment">Tareas</option>
                    <option value="exam">Exámenes</option>
                    <option value="lab">Laboratorios</option>
                    <option value="presentation">Presentaciones</option>
                    <option value="quiz">Quizzes</option>
                    <option value="tutoring">Tutorías</option>
                  </select>
                </div>

                {/* Selected Date Events */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Eventos del {selectedDate.toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h3>

                  <div className="space-y-3">
                    {getSelectedDateEvents().length > 0 ? (
                      getSelectedDateEvents().map((event) => {
                        const EventIcon = eventTypes[event.type as keyof typeof eventTypes].icon;
                        return (
                          <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg ${event.color}`}>
                                <EventIcon size={16} className="text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-gray-900 mb-1">{event.title}</h4>
                                <p className="text-xs text-gray-600 mb-2">{event.course}</p>
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <Clock size={12} />
                                    <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <MapPin size={12} />
                                    <span>{event.location}</span>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Prof. {event.professor}</p>
                              </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${eventTypes[event.type as keyof typeof eventTypes].color} bg-gray-100`}>
                                {eventTypes[event.type as keyof typeof eventTypes].label}
                              </span>
                              <button className="text-universidad-azul hover:text-blue-700 text-xs font-medium">
                                Ver detalles
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-8">
                        <CalendarIcon size={32} className="text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">No hay eventos para esta fecha</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Próximos Eventos</h3>
                    <button className="text-universidad-azul hover:text-blue-700 font-medium text-sm">Ver todos</button>
                  </div>

                  <div className="space-y-3">
                    {getUpcomingEvents().map((event) => {
                      const EventIcon = eventTypes[event.type as keyof typeof eventTypes].icon;
                      const eventDate = new Date(event.date);
                      return (
                        <div key={event.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                            <p className="text-xs text-gray-500">
                              {eventDate.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })} • {formatTime(event.startTime)}
                            </p>
                          </div>
                          <EventIcon size={16} className={eventTypes[event.type as keyof typeof eventTypes].color} />
                        </div>
                      );
                    })}
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