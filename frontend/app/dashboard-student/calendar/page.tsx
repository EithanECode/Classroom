'use client';

import { useState, useEffect, useRef } from 'react';
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
import Navbar from '../../../components/Navbar';

// Mock data for calendar events
const calendarEvents = [
  {
    id: 1,
    title: 'Clase de Programación',
    course: 'Introducción a la Programación',
    professor: 'Dr. Carlos Mendoza',
    type: 'class',
    date: '2025-01-15',
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
    date: '2025-07-15',
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
    date: '2025-07-16',
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
    date: '2025-07-17',
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
    date: '2025-07-18',
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
    date: '2025-07-19',
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
    date: '2025-07-11',
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
    date: '2025-07-22',
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
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const dayViewRef = useRef<HTMLDivElement>(null);
  const studentName = 'María González';

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const dayNamesFull = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  // Actualizar la hora actual cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 60 segundos

    return () => clearInterval(interval);
  }, []);

  // Establecer fecha actual cuando se cambia el modo de vista
  useEffect(() => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  }, [viewMode]);

  // Auto-scroll a la hora actual cuando se cambia a vista de día
  useEffect(() => {
    if (viewMode === 'day' && dayViewRef.current) {
      const now = new Date();
      const currentHour = now.getHours();
      const hourElement = dayViewRef.current.querySelector(`[data-hour="${currentHour}"]`);
      if (hourElement) {
        setTimeout(() => {
          hourElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [viewMode, currentDate]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getFirstDayOfWeek = (date: Date) => {
    const sunday = new Date(date);
    sunday.setDate(date.getDate() - date.getDay());
    sunday.setHours(0, 0, 0, 0);
    return sunday;
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

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setDate(prev.getDate() - 7);
      } else {
        newDate.setDate(prev.getDate() + 7);
      }
      return newDate;
    });
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setDate(prev.getDate() - 1);
      } else {
        newDate.setDate(prev.getDate() + 1);
      }
      return newDate;
    });
    setSelectedDate(new Date(currentDate));
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date: string) => {
    return calendarEvents.filter(event => event.date === date);
  };

  const getEventsForHour = (date: string, hour: number) => {
    return calendarEvents.filter(event => {
      if (event.date !== date) return false;
      const [startHour] = event.startTime.split(':').map(Number);
      const [endHour] = event.endTime.split(':').map(Number);
      return hour >= startHour && hour < endHour;
    });
  };

  const getSelectedDateEvents = () => {
    // En vista de día, usar currentDate. En otras vistas, usar selectedDate
    const targetDate = viewMode === 'day' ? currentDate : selectedDate;
    const dateStr = formatDate(targetDate);
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

  const getWeekEvents = () => {
    // Obtener eventos de toda la semana actual
    const firstDay = getFirstDayOfWeek(currentDate);
    const weekEvents: typeof calendarEvents = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDay);
      date.setDate(firstDay.getDate() + i);
      const dateStr = formatDate(date);
      const dayEvents = calendarEvents.filter(event => {
        const matchesDate = event.date === dateStr;
        const matchesSearch = searchTerm === '' ||
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.professor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || event.type === filterType;

        return matchesDate && matchesSearch && matchesFilter;
      });
      weekEvents.push(...dayEvents);
    }
    
    return weekEvents.sort((a, b) => {
      if (a.date === b.date) {
        return a.startTime.localeCompare(b.startTime);
      }
      return a.date.localeCompare(b.date);
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

  const renderCalendarMonth = () => {
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
          className={`h-12 md:h-16 p-1 border border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
            isToday ? 'bg-universidad-azul/10 border-universidad-azul' : ''
          } ${isSelected ? 'bg-universidad-azul/20 border-universidad-azul border-2' : ''}`}
        >
          <div className={`text-sm font-medium mb-1 ${
            isToday ? 'text-universidad-azul font-bold' : 'text-gray-700'
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

  const renderCalendarWeek = () => {
    const firstDay = getFirstDayOfWeek(currentDate);
    const days = [];
    const today = new Date();
    const todayStr = formatDate(today);

    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDay);
      date.setDate(firstDay.getDate() + i);
      const dateStr = formatDate(date);
      const dayEvents = getEventsForDate(dateStr);
      const isToday = dateStr === todayStr;
      const isSelected = dateStr === formatDate(selectedDate);

      days.push(
        <div
          key={i}
          onClick={() => setSelectedDate(date)}
          className={`h-12 md:h-16 p-1 border border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
            isToday ? 'bg-universidad-azul/10 border-universidad-azul' : ''
          } ${isSelected ? 'bg-universidad-azul/20 border-universidad-azul border-2' : ''}`}
        >
          <div className={`text-sm font-medium mb-1 ${
            isToday ? 'text-universidad-azul font-bold' : 'text-gray-700'
          }`}>
            {date.getDate()}
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

  const renderCalendarDay = () => {
    const selectedDateStr = formatDate(currentDate);
    const today = new Date();
    const todayStr = formatDate(today);
    const isToday = selectedDateStr === todayStr;
    const hours = [];

    // Crear array de 24 horas
    for (let hour = 0; hour < 24; hour++) {
      const hourEvents = getEventsForHour(selectedDateStr, hour);
      const isCurrentHour = isToday && today.getHours() === hour;
      const timeString = hour === 0 ? '12:00 AM' : 
                        hour === 12 ? '12:00 PM' : 
                        hour < 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`;

      hours.push(
        <div
          key={hour}
          data-hour={hour}
          className={`flex border-b border-gray-100 min-h-[60px] ${
            isCurrentHour ? 'bg-universidad-azul/5' : ''
          }`}
        >
          {/* Columna de hora */}
          <div className="w-20 flex-shrink-0 p-2 text-right border-r border-gray-100">
            <span className={`text-sm font-medium ${
              isCurrentHour ? 'text-universidad-azul font-bold' : 'text-gray-600'
            }`}>
              {timeString}
            </span>
            {isCurrentHour && (
              <div className="text-xs text-universidad-azul font-medium mt-1">
                Ahora
              </div>
            )}
          </div>
          
          {/* Columna de eventos */}
          <div className="flex-1 p-2">
            {hourEvents.length > 0 ? (
              <div className="space-y-1">
                {hourEvents.map((event) => {
                  const EventIcon = eventTypes[event.type as keyof typeof eventTypes].icon;
                  return (
                    <div
                      key={event.id}
                      className={`p-2 rounded-lg border-l-4 ${event.color} bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
                      style={{ borderLeftColor: event.color.replace('bg-', '') }}
                    >
                      <div className="flex items-start space-x-2">
                        <div className={`p-1 rounded ${event.color}`}>
                          <EventIcon size={12} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 truncate">
                            {event.title}
                          </h4>
                          <p className="text-xs text-gray-600 mb-1">{event.course}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock size={10} />
                              <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin size={10} />
                              <span className="truncate">{event.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                {/* Espacio libre */}
              </div>
            )}
          </div>
        </div>
      );
    }

    return hours;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getNavigationTitle = () => {
    if (viewMode === 'month') {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else if (viewMode === 'week') {
      const firstDay = getFirstDayOfWeek(currentDate);
      const lastDay = new Date(firstDay);
      lastDay.setDate(firstDay.getDate() + 6);
      return `${firstDay.getDate()} - ${lastDay.getDate()} ${monthNames[lastDay.getMonth()]} ${lastDay.getFullYear()}`;
    } else {
      return `${dayNamesFull[currentDate.getDay()]}, ${currentDate.getDate()} de ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (viewMode === 'month') {
      navigateMonth(direction);
    } else if (viewMode === 'week') {
      navigateWeek(direction);
    } else {
      navigateDay(direction);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar studentName={studentName} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        {/* Sidebar para desktop */}
        <div className="hidden md:block">
          <Sidebar items={sidebarItems} />
        </div>
        {/* Sidebar para mobile (panel deslizante animado) */}
        <div className={`fixed inset-0 z-20 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
          onClick={() => setSidebarOpen(false)}
        />
        <div className={`fixed top-0 left-0 z-30 w-64 h-full bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <Sidebar items={sidebarItems} />
        </div>
        
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
                      onClick={() => handleNavigation('prev')}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft size={20} className="text-gray-600" />
                    </button>
                    <h2 className="text-xl font-semibold text-gray-900 min-w-[200px] text-center">
                      {getNavigationTitle()}
                    </h2>
                    <button
                      onClick={() => handleNavigation('next')}
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
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors capitalize ${
                          viewMode === mode
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
                  {viewMode === 'month' || viewMode === 'week' ? (
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <div className="grid grid-cols-7 gap-1">
                        {dayNames.map(day => (
                          <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                            {day}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {dayNamesFull[currentDate.getDay()]}, {currentDate.getDate()} de {monthNames[currentDate.getMonth()]}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Hora actual: {currentTime.toLocaleTimeString('es-ES', { 
                            hour: '2-digit', 
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Calendar Grid */}
                  <div className={`${viewMode === 'day' ? 'max-h-[600px] overflow-y-auto' : 'p-6'}`} ref={dayViewRef}>
                    {viewMode === 'month' ? (
                      <div className="grid grid-cols-7 gap-1">
                        {renderCalendarMonth()}
                      </div>
                    ) : viewMode === 'week' ? (
                      <div className="grid grid-cols-7 gap-1">
                        {renderCalendarWeek()}
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {renderCalendarDay()}
                      </div>
                    )}
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
                    {viewMode === 'day' ? (
                      `Eventos del ${currentDate.toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}`
                    ) : viewMode === 'week' ? (
                      `Eventos de la semana del ${getFirstDayOfWeek(currentDate).getDate()} al ${new Date(getFirstDayOfWeek(currentDate).getTime() + 6 * 24 * 60 * 60 * 1000).getDate()} de ${monthNames[currentDate.getMonth()]}`
                    ) : (
                      `Eventos del ${selectedDate.toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}`
                    )}
                  </h3>

                  <div className="space-y-3">
                    {(() => {
                      const events = viewMode === 'week' ? getWeekEvents() : getSelectedDateEvents();
                      return events.length > 0 ? (
                        events.map((event) => {
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
                                  {viewMode === 'week' && (
                                    <p className="text-xs text-gray-500 mt-1">
                                      📅 {new Date(event.date).toLocaleDateString('es-ES', { 
                                        weekday: 'short', 
                                        day: 'numeric' 
                                      })}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="mt-3 flex items-center justify-between">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  eventTypes[event.type as keyof typeof eventTypes].color
                                } bg-gray-100`}>
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
                          <p className="text-gray-500 text-sm">
                            {viewMode === 'week' ? 'No hay eventos para esta semana' : 'No hay eventos para esta fecha'}
                          </p>
                        </div>
                      );
                    })()}
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