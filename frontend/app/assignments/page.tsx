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
  Menu,
  X,
  Search,
  Filter,
  ChevronDown,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  Upload,
  Eye,
  Star,
  Calendar as CalendarIcon,
  BookMarked,
  SortAsc,
  SortDesc,
  Target,
  Award,
  TrendingUp,
  Users
} from 'lucide-react';

// Mock data for assignments
const assignments = [
  {
    id: 1,
    title: 'Proyecto Final - Sistema de Gestión',
    course: 'Introducción a la Programación',
    professor: 'Dr. Carlos Mendoza',
    dueDate: '2024-01-20',
    dueTime: '23:59',
    status: 'pending',
    priority: 'high',
    description: 'Desarrollar un sistema completo de gestión utilizando Python y bases de datos.',
    points: 100,
    submittedDate: null,
    grade: null,
    feedback: null,
    attachments: ['requirements.pdf', 'database_schema.sql'],
    estimatedTime: '15-20 horas',
    category: 'project'
  },
  {
    id: 2,
    title: 'Ensayo sobre Cálculo Integral',
    course: 'Matemáticas Avanzadas',
    professor: 'Dra. Ana García',
    dueDate: '2024-01-18',
    dueTime: '14:00',
    status: 'submitted',
    priority: 'medium',
    description: 'Análisis teórico y práctico de las aplicaciones del cálculo integral en problemas reales.',
    points: 50,
    submittedDate: '2024-01-17',
    grade: null,
    feedback: null,
    attachments: ['essay_template.docx'],
    estimatedTime: '8-10 horas',
    category: 'essay'
  },
  {
    id: 3,
    title: 'Desarrollo de Landing Page',
    course: 'Desarrollo Web Frontend',
    professor: 'Ing. Miguel Torres',
    dueDate: '2024-01-25',
    dueTime: '18:00',
    status: 'pending',
    priority: 'high',
    description: 'Crear una landing page responsive utilizando HTML5, CSS3 y JavaScript vanilla.',
    points: 80,
    submittedDate: null,
    grade: null,
    feedback: null,
    attachments: ['design_mockup.figma', 'assets.zip'],
    estimatedTime: '12-15 horas',
    category: 'project'
  },
  {
    id: 4,
    title: 'Reporte de Laboratorio - Síntesis Orgánica',
    course: 'Química Orgánica',
    professor: 'Dr. Roberto Silva',
    dueDate: '2024-01-16',
    dueTime: '12:00',
    status: 'graded',
    priority: 'medium',
    description: 'Documentar el proceso de síntesis de compuestos orgánicos realizado en laboratorio.',
    points: 40,
    submittedDate: '2024-01-15',
    grade: 85,
    feedback: 'Excelente trabajo en la documentación del proceso. Mejorar la sección de conclusiones.',
    attachments: ['lab_template.docx'],
    estimatedTime: '4-6 horas',
    category: 'report'
  },
  {
    id: 5,
    title: 'Portfolio de Diseño Digital',
    course: 'Diseño Gráfico Digital',
    professor: 'Lic. Sofia Ramírez',
    dueDate: '2024-01-30',
    dueTime: '20:00',
    status: 'pending',
    priority: 'low',
    description: 'Compilar un portfolio digital con los mejores trabajos realizados durante el semestre.',
    points: 60,
    submittedDate: null,
    grade: null,
    feedback: null,
    attachments: ['portfolio_guidelines.pdf'],
    estimatedTime: '10-12 horas',
    category: 'portfolio'
  },
  {
    id: 6,
    title: 'Diseño de Base de Datos',
    course: 'Bases de Datos',
    professor: 'Ing. Laura Vega',
    dueDate: '2024-01-22',
    dueTime: '16:30',
    status: 'pending',
    priority: 'high',
    description: 'Diseñar e implementar una base de datos normalizada para un sistema de biblioteca.',
    points: 90,
    submittedDate: null,
    grade: null,
    feedback: null,
    attachments: ['database_requirements.pdf', 'er_diagram_template.drawio'],
    estimatedTime: '18-20 horas',
    category: 'project'
  },
  {
    id: 7,
    title: 'Análisis de Algoritmos de Ordenamiento',
    course: 'Algoritmos y Estructuras de Datos',
    professor: 'Dr. Fernando López',
    dueDate: '2024-01-14',
    dueTime: '23:59',
    status: 'graded',
    priority: 'medium',
    description: 'Implementar y analizar la complejidad de diferentes algoritmos de ordenamiento.',
    points: 70,
    submittedDate: '2024-01-13',
    grade: 92,
    feedback: 'Excelente análisis de complejidad. Implementación muy limpia y bien documentada.',
    attachments: ['algorithms_template.py'],
    estimatedTime: '8-10 horas',
    category: 'coding'
  },
  {
    id: 8,
    title: 'Sesión Fotográfica Temática',
    course: 'Fotografía Digital',
    professor: 'Mtro. Diego Herrera',
    dueDate: '2024-01-28',
    dueTime: '15:00',
    status: 'pending',
    priority: 'medium',
    description: 'Realizar una sesión fotográfica con tema libre aplicando técnicas de iluminación avanzada.',
    points: 55,
    submittedDate: null,
    grade: null,
    feedback: null,
    attachments: ['lighting_guide.pdf'],
    estimatedTime: '6-8 horas',
    category: 'creative'
  },
  {
    id: 9,
    title: 'Composición Musical Original',
    course: 'Teoría Musical',
    professor: 'Mtra. Carmen Flores',
    dueDate: '2024-02-05',
    dueTime: '17:00',
    status: 'pending',
    priority: 'low',
    description: 'Componer una pieza musical original de 3-4 minutos aplicando conceptos de armonía moderna.',
    points: 75,
    submittedDate: null,
    grade: null,
    feedback: null,
    attachments: ['composition_guidelines.pdf', 'score_template.mus'],
    estimatedTime: '20-25 horas',
    category: 'creative'
  },
  {
    id: 10,
    title: 'Plan de Negocios',
    course: 'Administración de Empresas',
    professor: 'MBA. Patricia Ruiz',
    dueDate: '2024-01-26',
    dueTime: '19:00',
    status: 'submitted',
    priority: 'high',
    description: 'Desarrollar un plan de negocios completo para una startup tecnológica.',
    points: 100,
    submittedDate: '2024-01-25',
    grade: null,
    feedback: null,
    attachments: ['business_plan_template.docx', 'financial_model.xlsx'],
    estimatedTime: '25-30 horas',
    category: 'project'
  }
];

const sidebarItems = [
  { name: 'Dashboard', icon: BookOpen, active: false },
  { name: 'Mis Cursos', icon: BookMarked, active: false },
  { name: 'Calendario', icon: CalendarIcon, active: false },
  { name: 'Tareas', icon: ClipboardList, active: true },
  { name: 'Calificaciones', icon: GraduationCap, active: false },
  { name: 'Chat', icon: MessageCircle, active: false },
  { name: 'Configuración', icon: Settings, active: false }
];

const statusOptions = [
  { value: 'all', label: 'Todas las tareas' },
  { value: 'pending', label: 'Pendientes' },
  { value: 'submitted', label: 'Entregadas' },
  { value: 'graded', label: 'Calificadas' }
];

const priorityOptions = [
  { value: 'all', label: 'Todas las prioridades' },
  { value: 'high', label: 'Alta prioridad' },
  { value: 'medium', label: 'Prioridad media' },
  { value: 'low', label: 'Baja prioridad' }
];

const sortOptions = [
  { value: 'dueDate', label: 'Fecha de entrega' },
  { value: 'course', label: 'Curso' },
  { value: 'priority', label: 'Prioridad' },
  { value: 'status', label: 'Estado' },
  { value: 'grade', label: 'Calificación' }
];

export default function StudentAssignmentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const studentName = 'María González';

  const filteredAndSortedAssignments = assignments
    .filter(assignment => {
      const matchesSearch = searchTerm === '' ||
        assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.professor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || assignment.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'dueDate':
          aValue = new Date(a.dueDate).getTime();
          bValue = new Date(b.dueDate).getTime();
          break;
        case 'course':
          aValue = a.course.toLowerCase();
          bValue = b.course.toLowerCase();
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          aValue = priorityOrder[a.priority as keyof typeof priorityOrder];
          bValue = priorityOrder[b.priority as keyof typeof priorityOrder];
          break;
        case 'status':
          const statusOrder = { pending: 1, submitted: 2, graded: 3 };
          aValue = statusOrder[a.status as keyof typeof statusOrder];
          bValue = statusOrder[b.status as keyof typeof statusOrder];
          break;
        case 'grade':
          aValue = a.grade || 0;
          bValue = b.grade || 0;
          break;
        default:
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
            <Clock size={12} />
            <span>Pendiente</span>
          </div>
        );
      case 'submitted':
        return (
          <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            <Upload size={12} />
            <span>Entregada</span>
          </div>
        );
      case 'graded':
        return (
          <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            <CheckCircle size={12} />
            <span>Calificada</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return (
          <div className="flex items-center space-x-1 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
            <AlertTriangle size={12} />
            <span>Alta</span>
          </div>
        );
      case 'medium':
        return (
          <div className="flex items-center space-x-1 bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
            <Target size={12} />
            <span>Media</span>
          </div>
        );
      case 'low':
        return (
          <div className="flex items-center space-x-1 bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
            <span>Baja</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getActionButton = (assignment: any) => {
    switch (assignment.status) {
      case 'pending':
        return (
          <button className="bg-gradient-to-r from-universidad-azul to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm flex items-center space-x-2">
            <Upload size={16} />
            <span>Entregar Tarea</span>
          </button>
        );
      case 'submitted':
        return (
          <button className="bg-blue-100 text-blue-800 hover:bg-blue-200 font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm flex items-center space-x-2">
            <Eye size={16} />
            <span>Ver Entrega</span>
          </button>
        );
      case 'graded':
        return (
          <button className="bg-green-100 text-green-800 hover:bg-green-200 font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm flex items-center space-x-2">
            <Star size={16} />
            <span>Ver Calificación</span>
          </button>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getAssignmentStats = () => {
    const pending = assignments.filter(a => a.status === 'pending').length;
    const submitted = assignments.filter(a => a.status === 'submitted').length;
    const graded = assignments.filter(a => a.status === 'graded').length;
    const avgGrade = assignments
      .filter(a => a.grade !== null)
      .reduce((sum, a) => sum + (a.grade || 0), 0) / graded || 0;

    return { pending, submitted, graded, avgGrade };
  };

  const stats = getAssignmentStats();

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
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-30 w-64 bg-white shadow-lg h-screen transition-transform duration-300 ease-in-out border-r border-gray-200`}>
          <div className="p-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.name}
                  href={
                    item.name === 'Dashboard' ? '/' :
                      item.name === 'Mis Cursos' ? '/courses' :
                        item.name === 'Calendario' ? '/calendar' :
                          item.name === 'Tareas' ? '/assignments' :
                            item.name === 'Calificaciones' ? '/grades' :
                              item.name === 'Chat' ? '/chat' :
                                item.name === 'Configuración' ? '/configuracion' : '#'
                  }
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${item.active
                      ? 'bg-gradient-to-r from-universidad-azul to-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Tareas</h1>
              <p className="text-gray-600">Gestiona todas tus tareas y mantente al día con las entregas</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                    <p className="text-sm text-gray-600 mt-1">Pendientes</p>
                  </div>
                  <div className="p-3 rounded-xl bg-yellow-100">
                    <Clock size={24} className="text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{stats.submitted}</p>
                    <p className="text-sm text-gray-600 mt-1">Entregadas</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-100">
                    <Upload size={24} className="text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{stats.graded}</p>
                    <p className="text-sm text-gray-600 mt-1">Calificadas</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-100">
                    <CheckCircle size={24} className="text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{stats.avgGrade.toFixed(1)}</p>
                    <p className="text-sm text-gray-600 mt-1">Promedio</p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-100">
                    <TrendingUp size={24} className="text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar tareas, cursos, profesores..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-universidad-azul focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
                >
                  <Filter size={20} className="text-gray-600" />
                  <span className="font-medium text-gray-700">Filtros</span>
                  <ChevronDown size={16} className={`text-gray-600 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Filters */}
              {showFilters && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Status Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-universidad-azul focus:border-transparent"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Priority Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
                      <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-universidad-azul focus:border-transparent"
                      >
                        {priorityOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Sort Options */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
                      <div className="flex space-x-2">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-universidad-azul focus:border-transparent"
                        >
                          {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                          className="px-3 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                        >
                          {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-gray-600">
                Mostrando <span className="font-semibold text-gray-900">{filteredAndSortedAssignments.length}</span> de <span className="font-semibold text-gray-900">{assignments.length}</span> tareas
              </p>
            </div>

            {/* Assignments List */}
            <div className="space-y-4">
              {filteredAndSortedAssignments.map((assignment) => {
                const daysUntilDue = getDaysUntilDue(assignment.dueDate);
                const isOverdue = daysUntilDue < 0 && assignment.status === 'pending';
                const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0 && assignment.status === 'pending';

                return (
                  <div key={assignment.id} className={`bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-all duration-300 ${isOverdue ? 'border-red-200 bg-red-50/30' :
                      isDueSoon ? 'border-yellow-200 bg-yellow-50/30' :
                        'border-gray-100'
                    }`}>
                    <div className="p-6">
                      {/* Assignment Header */}
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0 mb-4">
                        <div className="flex-1">
                          <div className="flex items-start space-x-3 mb-3">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-universidad-azul to-blue-600">
                              <FileText size={20} className="text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">{assignment.title}</h3>
                              <p className="text-sm text-gray-600 mb-2">{assignment.course}</p>
                              <p className="text-sm text-gray-500">Profesor: {assignment.professor}</p>
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{assignment.description}</p>
                        </div>

                        <div className="flex flex-col items-end space-y-2">
                          {getStatusBadge(assignment.status)}
                          {getPriorityBadge(assignment.priority)}
                        </div>
                      </div>

                      {/* Assignment Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <CalendarIcon size={16} />
                          <div>
                            <p className="font-medium">Fecha límite</p>
                            <p className={`${isOverdue ? 'text-red-600 font-semibold' : isDueSoon ? 'text-yellow-600 font-semibold' : ''}`}>
                              {formatDate(assignment.dueDate)} • {formatTime(assignment.dueTime)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Award size={16} />
                          <div>
                            <p className="font-medium">Puntos</p>
                            <p>{assignment.points} pts</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock size={16} />
                          <div>
                            <p className="font-medium">Tiempo estimado</p>
                            <p>{assignment.estimatedTime}</p>
                          </div>
                        </div>

                        {assignment.grade !== null && (
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Star size={16} />
                            <div>
                              <p className="font-medium">Calificación</p>
                              <p className="text-green-600 font-semibold">{assignment.grade}/{assignment.points}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Due Date Warning */}
                      {isOverdue && (
                        <div className="bg-red-100 border border-red-200 rounded-lg p-3 mb-4">
                          <div className="flex items-center space-x-2 text-red-800">
                            <AlertTriangle size={16} />
                            <span className="text-sm font-medium">
                              Tarea vencida hace {Math.abs(daysUntilDue)} día{Math.abs(daysUntilDue) !== 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>
                      )}

                      {isDueSoon && (
                        <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-3 mb-4">
                          <div className="flex items-center space-x-2 text-yellow-800">
                            <Clock size={16} />
                            <span className="text-sm font-medium">
                              Vence en {daysUntilDue} día{daysUntilDue !== 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Feedback */}
                      {assignment.feedback && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <h4 className="text-sm font-semibold text-blue-900 mb-2">Retroalimentación del profesor:</h4>
                          <p className="text-sm text-blue-800">{assignment.feedback}</p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {assignment.attachments.length > 0 && (
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <FileText size={14} />
                              <span>{assignment.attachments.length} archivo{assignment.attachments.length !== 1 ? 's' : ''}</span>
                            </div>
                          )}

                          {assignment.submittedDate && (
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <CheckCircle size={14} />
                              <span>Entregada el {formatDate(assignment.submittedDate)}</span>
                            </div>
                          )}
                        </div>

                        {getActionButton(assignment)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredAndSortedAssignments.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClipboardList size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron tareas</h3>
                <p className="text-gray-600 mb-4">Intenta ajustar tus filtros de búsqueda</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setPriorityFilter('all');
                  }}
                  className="bg-gradient-to-r from-universidad-azul to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}