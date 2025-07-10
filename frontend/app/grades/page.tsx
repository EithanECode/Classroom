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
  CalendarIcon,
  Menu,
  X,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Star,
  BookMarked,
  SortAsc,
  SortDesc,
  TrendingUp,
  Award,
  Target,
  BarChart3,
  FileText,
  CheckCircle,
  Clock,
  MessageSquare,
  Trophy,
  Percent,
  Calendar
} from 'lucide-react';

// Mock data for grades
const grades = [
  {
    id: 1,
    assignmentName: 'Proyecto Final - Sistema de Gestión',
    course: 'Introducción a la Programación',
    professor: 'Dr. Carlos Mendoza',
    grade: 92,
    maxPoints: 100,
    percentage: 92,
    letterGrade: 'A-',
    status: 'graded',
    submissionDate: '2024-01-17',
    gradedDate: '2024-01-20',
    feedback: 'Excelente implementación del sistema. El código está bien estructurado y documentado. Considera optimizar las consultas a la base de datos para mejorar el rendimiento.',
    weight: 25,
    category: 'project'
  },
  {
    id: 2,
    assignmentName: 'Examen Parcial - Cálculo Integral',
    course: 'Matemáticas Avanzadas',
    professor: 'Dra. Ana García',
    grade: 85,
    maxPoints: 100,
    percentage: 85,
    letterGrade: 'B+',
    status: 'graded',
    submissionDate: '2024-01-15',
    gradedDate: '2024-01-18',
    feedback: 'Buen dominio de los conceptos fundamentales. Algunos errores menores en la aplicación de técnicas de integración por partes.',
    weight: 30,
    category: 'exam'
  },
  {
    id: 3,
    assignmentName: 'Landing Page Responsive',
    course: 'Desarrollo Web Frontend',
    professor: 'Ing. Miguel Torres',
    grade: 96,
    maxPoints: 100,
    percentage: 96,
    letterGrade: 'A+',
    status: 'graded',
    submissionDate: '2024-01-22',
    gradedDate: '2024-01-25',
    feedback: 'Trabajo excepcional. El diseño es moderno y la implementación técnica es impecable. Excelente uso de CSS Grid y Flexbox.',
    weight: 20,
    category: 'project'
  },
  {
    id: 4,
    assignmentName: 'Reporte de Laboratorio - Síntesis',
    course: 'Química Orgánica',
    professor: 'Dr. Roberto Silva',
    grade: 78,
    maxPoints: 100,
    percentage: 78,
    letterGrade: 'C+',
    status: 'graded',
    submissionDate: '2024-01-14',
    gradedDate: '2024-01-16',
    feedback: 'El procedimiento está bien documentado, pero falta profundidad en el análisis de resultados. Revisar la sección de conclusiones.',
    weight: 15,
    category: 'lab'
  },
  {
    id: 5,
    assignmentName: 'Portfolio Digital',
    course: 'Diseño Gráfico Digital',
    professor: 'Lic. Sofia Ramírez',
    grade: 94,
    maxPoints: 100,
    percentage: 94,
    letterGrade: 'A',
    status: 'graded',
    submissionDate: '2024-01-28',
    gradedDate: '2024-01-30',
    feedback: 'Portfolio muy creativo y profesional. Excelente uso del color y tipografía. La presentación es impecable.',
    weight: 25,
    category: 'portfolio'
  },
  {
    id: 6,
    assignmentName: 'Diseño de Base de Datos',
    course: 'Bases de Datos',
    professor: 'Ing. Laura Vega',
    grade: 88,
    maxPoints: 100,
    percentage: 88,
    letterGrade: 'B+',
    status: 'graded',
    submissionDate: '2024-01-20',
    gradedDate: '2024-01-22',
    feedback: 'Buen diseño de la estructura de datos. El diagrama ER está bien elaborado. Mejorar la normalización en algunas tablas.',
    weight: 30,
    category: 'project'
  },
  {
    id: 7,
    assignmentName: 'Quiz Semanal - Algoritmos',
    course: 'Algoritmos y Estructuras de Datos',
    professor: 'Dr. Fernando López',
    grade: 90,
    maxPoints: 100,
    percentage: 90,
    letterGrade: 'A-',
    status: 'graded',
    submissionDate: '2024-01-19',
    gradedDate: '2024-01-19',
    feedback: 'Muy buen entendimiento de los algoritmos de ordenamiento. Respuestas claras y precisas.',
    weight: 10,
    category: 'quiz'
  },
  {
    id: 8,
    assignmentName: 'Ensayo - Teoría Fotográfica',
    course: 'Fotografía Digital',
    professor: 'Mtro. Diego Herrera',
    grade: null,
    maxPoints: 100,
    percentage: null,
    letterGrade: null,
    status: 'pending',
    submissionDate: '2024-01-26',
    gradedDate: null,
    feedback: null,
    weight: 20,
    category: 'essay'
  },
  {
    id: 9,
    assignmentName: 'Composición Musical',
    course: 'Teoría Musical',
    professor: 'Mtra. Carmen Flores',
    grade: null,
    maxPoints: 100,
    percentage: null,
    letterGrade: null,
    status: 'pending',
    submissionDate: '2024-02-01',
    gradedDate: null,
    feedback: null,
    weight: 35,
    category: 'creative'
  },
  {
    id: 10,
    assignmentName: 'Plan de Negocios',
    course: 'Administración de Empresas',
    professor: 'MBA. Patricia Ruiz',
    grade: 87,
    maxPoints: 100,
    percentage: 87,
    letterGrade: 'B+',
    status: 'graded',
    submissionDate: '2024-01-24',
    gradedDate: '2024-01-26',
    feedback: 'Plan bien estructurado con análisis financiero sólido. Considerar ampliar la sección de análisis de mercado.',
    weight: 40,
    category: 'project'
  }
];

// Mock data for course averages
const courseAverages = [
  { course: 'Introducción a la Programación', average: 92, letterGrade: 'A-', color: 'from-blue-400 to-blue-600' },
  { course: 'Matemáticas Avanzadas', average: 85, letterGrade: 'B+', color: 'from-green-400 to-green-600' },
  { course: 'Desarrollo Web Frontend', average: 96, letterGrade: 'A+', color: 'from-purple-400 to-purple-600' },
  { course: 'Química Orgánica', average: 78, letterGrade: 'C+', color: 'from-red-400 to-red-600' },
  { course: 'Diseño Gráfico Digital', average: 94, letterGrade: 'A', color: 'from-pink-400 to-pink-600' },
  { course: 'Bases de Datos', average: 88, letterGrade: 'B+', color: 'from-indigo-400 to-indigo-600' },
  { course: 'Algoritmos y Estructuras de Datos', average: 90, letterGrade: 'A-', color: 'from-cyan-400 to-cyan-600' },
  { course: 'Fotografía Digital', average: 82, letterGrade: 'B', color: 'from-orange-400 to-orange-600' },
  { course: 'Administración de Empresas', average: 87, letterGrade: 'B+', color: 'from-teal-400 to-teal-600' }
];

const sidebarItems = [
  { name: 'Dashboard', icon: BookOpen, active: false },
  { name: 'Mis Cursos', icon: BookMarked, active: false },
  { name: 'Calendario', icon: CalendarIcon, active: false },
  { name: 'Tareas', icon: ClipboardList, active: false },
  { name: 'Calificaciones', icon: GraduationCap, active: true },
  { name: 'Chat', icon: MessageCircle, active: false },
  { name: 'Configuración', icon: Settings, active: false }
];

const statusOptions = [
  { value: 'all', label: 'Todas las calificaciones' },
  { value: 'graded', label: 'Calificadas' },
  { value: 'pending', label: 'Pendientes' }
];

const courseOptions = [
  'Todos los cursos',
  'Introducción a la Programación',
  'Matemáticas Avanzadas',
  'Desarrollo Web Frontend',
  'Química Orgánica',
  'Diseño Gráfico Digital',
  'Bases de Datos',
  'Algoritmos y Estructuras de Datos',
  'Fotografía Digital',
  'Teoría Musical',
  'Administración de Empresas'
];

const sortOptions = [
  { value: 'gradedDate', label: 'Fecha de calificación' },
  { value: 'course', label: 'Curso' },
  { value: 'grade', label: 'Calificación' },
  { value: 'assignmentName', label: 'Nombre de tarea' }
];

export default function StudentGradesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('Todos los cursos');
  const [sortBy, setSortBy] = useState('gradedDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<any>(null);
  const studentName = 'María González';

  const filteredAndSortedGrades = grades
    .filter(grade => {
      const matchesSearch = searchTerm === '' ||
        grade.assignmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grade.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grade.professor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || grade.status === statusFilter;
      const matchesCourse = courseFilter === 'Todos los cursos' || grade.course === courseFilter;

      return matchesSearch && matchesStatus && matchesCourse;
    })
    .sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'gradedDate':
          aValue = a.gradedDate ? new Date(a.gradedDate).getTime() : 0;
          bValue = b.gradedDate ? new Date(b.gradedDate).getTime() : 0;
          break;
        case 'course':
          aValue = a.course.toLowerCase();
          bValue = b.course.toLowerCase();
          break;
        case 'grade':
          aValue = a.grade || 0;
          bValue = b.grade || 0;
          break;
        case 'assignmentName':
          aValue = a.assignmentName.toLowerCase();
          bValue = b.assignmentName.toLowerCase();
          break;
        default:
          aValue = a.assignmentName.toLowerCase();
          bValue = b.assignmentName.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'graded':
        return (
          <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            <CheckCircle size={12} />
            <span>Calificada</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
            <Clock size={12} />
            <span>Pendiente</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getGradeColor = (percentage: number | null) => {
    if (percentage === null) return 'text-gray-500';
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getLetterGradeColor = (letterGrade: string | null) => {
    if (!letterGrade) return 'bg-gray-100 text-gray-600';
    if (letterGrade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (letterGrade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (letterGrade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateOverallAverage = () => {
    const gradedAssignments = grades.filter(g => g.grade !== null);
    if (gradedAssignments.length === 0) return 0;

    const total = gradedAssignments.reduce((sum, g) => sum + (g.grade || 0), 0);
    return Math.round(total / gradedAssignments.length * 10) / 10;
  };

  const getOverallLetterGrade = (average: number) => {
    if (average >= 97) return 'A+';
    if (average >= 93) return 'A';
    if (average >= 90) return 'A-';
    if (average >= 87) return 'B+';
    if (average >= 83) return 'B';
    if (average >= 80) return 'B-';
    if (average >= 77) return 'C+';
    if (average >= 73) return 'C';
    if (average >= 70) return 'C-';
    if (average >= 67) return 'D+';
    if (average >= 65) return 'D';
    return 'F';
  };

  const overallAverage = calculateOverallAverage();
  const overallLetterGrade = getOverallLetterGrade(overallAverage);

  const getGradeStats = () => {
    const gradedCount = grades.filter(g => g.status === 'graded').length;
    const pendingCount = grades.filter(g => g.status === 'pending').length;
    const highestGrade = Math.max(...grades.filter(g => g.grade !== null).map(g => g.grade || 0));
    const lowestGrade = Math.min(...grades.filter(g => g.grade !== null).map(g => g.grade || 0));

    return { gradedCount, pendingCount, highestGrade, lowestGrade };
  };

  const stats = getGradeStats();

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Calificaciones</h1>
              <p className="text-gray-600">Revisa tu rendimiento académico y retroalimentación de profesores</p>
            </div>

            {/* Overall Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-universidad-azul">{overallAverage}</p>
                    <p className="text-sm text-gray-600 mt-1">Promedio General</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-r from-universidad-azul to-blue-600">
                    <TrendingUp size={24} className="text-white" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLetterGradeColor(overallLetterGrade)}`}>
                    {overallLetterGrade}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{stats.gradedCount}</p>
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
                    <p className="text-2xl font-bold text-yellow-600">{stats.pendingCount}</p>
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
                    <p className="text-2xl font-bold text-green-600">{stats.highestGrade}</p>
                    <p className="text-sm text-gray-600 mt-1">Nota Más Alta</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-100">
                    <Trophy size={24} className="text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-red-600">{stats.lowestGrade}</p>
                    <p className="text-sm text-gray-600 mt-1">Nota Más Baja</p>
                  </div>
                  <div className="p-3 rounded-xl bg-red-100">
                    <Target size={24} className="text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Course Averages */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Promedio por Curso</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courseAverages.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{course.course}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-lg font-bold ${getGradeColor(course.average)}`}>
                          {course.average}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLetterGradeColor(course.letterGrade)}`}>
                          {course.letterGrade}
                        </span>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${course.color}`}></div>
                  </div>
                ))}
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
                    placeholder="Buscar calificaciones, cursos, profesores..."
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

                    {/* Course Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Curso</label>
                      <select
                        value={courseFilter}
                        onChange={(e) => setCourseFilter(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-universidad-azul focus:border-transparent"
                      >
                        {courseOptions.map((course) => (
                          <option key={course} value={course}>
                            {course}
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
                Mostrando <span className="font-semibold text-gray-900">{filteredAndSortedGrades.length}</span> de <span className="font-semibold text-gray-900">{grades.length}</span> calificaciones
              </p>
            </div>

            {/* Grades List */}
            <div className="space-y-4">
              {filteredAndSortedGrades.map((grade) => (
                <div key={grade.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="p-6">
                    {/* Grade Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0 mb-4">
                      <div className="flex-1">
                        <div className="flex items-start space-x-3 mb-3">
                          <div className="p-2 rounded-lg bg-gradient-to-r from-universidad-azul to-blue-600">
                            <FileText size={20} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{grade.assignmentName}</h3>
                            <p className="text-sm text-gray-600 mb-2">{grade.course}</p>
                            <p className="text-sm text-gray-500">Profesor: {grade.professor}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        {getStatusBadge(grade.status)}
                        {grade.letterGrade && (
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getLetterGradeColor(grade.letterGrade)}`}>
                            {grade.letterGrade}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Grade Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Percent size={16} />
                        <div>
                          <p className="font-medium">Calificación</p>
                          {grade.grade !== null ? (
                            <p className={`text-lg font-bold ${getGradeColor(grade.percentage)}`}>
                              {grade.grade}/{grade.maxPoints}
                            </p>
                          ) : (
                            <p className="text-gray-500">Pendiente</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <BarChart3 size={16} />
                        <div>
                          <p className="font-medium">Porcentaje</p>
                          {grade.percentage !== null ? (
                            <p className={`font-semibold ${getGradeColor(grade.percentage)}`}>
                              {grade.percentage}%
                            </p>
                          ) : (
                            <p className="text-gray-500">N/A</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        <div>
                          <p className="font-medium">Fecha de calificación</p>
                          <p>{formatDate(grade.gradedDate)}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Award size={16} />
                        <div>
                          <p className="font-medium">Peso</p>
                          <p>{grade.weight}% del curso</p>
                        </div>
                      </div>
                    </div>

                    {/* Feedback */}
                    {grade.feedback && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start space-x-2">
                          <MessageSquare size={16} className="text-blue-600 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-semibold text-blue-900 mb-2">Retroalimentación del profesor:</h4>
                            <p className="text-sm text-blue-800">{grade.feedback}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <User size={14} />
                          <span>Entregada el {formatDate(grade.submissionDate)}</span>
                        </div>
                      </div>

                      {grade.status === 'graded' && grade.feedback && (
                        <button
                          onClick={() => setSelectedGrade(grade)}
                          className="bg-blue-100 text-blue-800 hover:bg-blue-200 font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm flex items-center space-x-2"
                        >
                          <Eye size={16} />
                          <span>Ver Retroalimentación</span>
                        </button>
                      )}

                      {grade.status === 'pending' && (
                        <div className="bg-yellow-100 text-yellow-800 font-medium py-2 px-4 rounded-lg text-sm flex items-center space-x-2">
                          <Clock size={16} />
                          <span>Esperando calificación</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredAndSortedGrades.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron calificaciones</h3>
                <p className="text-gray-600 mb-4">Intenta ajustar tus filtros de búsqueda</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setCourseFilter('Todos los cursos');
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