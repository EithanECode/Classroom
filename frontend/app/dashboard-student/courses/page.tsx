'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, User, LogOut, BookOpen, ClipboardList, GraduationCap, MessageCircle, Settings, Globe, Monitor, Calculator, FlaskConical, Palette, Menu, X, Calendar, Glasses as MagnifyingGlass, Filter, Clock, Users, TrendingUp, Award, Target, BookMarked, Play, CheckCircle, Star, ChevronDown, Database, Code, Camera, Music, Briefcase, Heart, Zap } from 'lucide-react';
import Sidebar, { SidebarItem } from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';

// Mock data for all courses
const allCourses = [
  {
    id: 1,
    name: 'Introducción a la Programación',
    description: 'Fundamentos de programación con Python y conceptos básicos de algoritmos.',
    professor: 'Dr. Carlos Mendoza',
    icon: Monitor,
    color: 'from-blue-400 to-blue-600',
    progress: 75,
    lastActivity: 'Hace 2 días',
    status: 'active',
    students: 234,
    rating: 4.8,
    duration: '12 semanas',
    category: 'Programación'
  },
  {
    id: 2,
    name: 'Matemáticas Avanzadas',
    description: 'Cálculo diferencial e integral aplicado a problemas reales.',
    professor: 'Dra. Ana García',
    icon: Calculator,
    color: 'from-green-400 to-green-600',
    progress: 60,
    lastActivity: 'Hace 1 día',
    status: 'active',
    students: 189,
    rating: 4.6,
    duration: '16 semanas',
    category: 'Matemáticas'
  },
  {
    id: 3,
    name: 'Desarrollo Web Frontend',
    description: 'HTML, CSS, JavaScript y frameworks modernos como React.',
    professor: 'Ing. Miguel Torres',
    icon: Globe,
    color: 'from-purple-400 to-purple-600',
    progress: 85,
    lastActivity: 'Hoy',
    status: 'active',
    students: 156,
    rating: 4.9,
    duration: '10 semanas',
    category: 'Desarrollo Web'
  },
  {
    id: 4,
    name: 'Química Orgánica',
    description: 'Estudio de compuestos orgánicos y sus reacciones principales.',
    professor: 'Dr. Roberto Silva',
    icon: FlaskConical,
    color: 'from-red-400 to-red-600',
    progress: 45,
    lastActivity: 'Hace 3 días',
    status: 'active',
    students: 98,
    rating: 4.4,
    duration: '14 semanas',
    category: 'Ciencias'
  },
  {
    id: 5,
    name: 'Diseño Gráfico Digital',
    description: 'Principios de diseño visual y herramientas digitales profesionales.',
    professor: 'Lic. Sofia Ramírez',
    icon: Palette,
    color: 'from-pink-400 to-pink-600',
    progress: 90,
    lastActivity: 'Hace 1 día',
    status: 'active',
    students: 145,
    rating: 4.7,
    duration: '8 semanas',
    category: 'Diseño'
  },
  {
    id: 6,
    name: 'Bases de Datos',
    description: 'Diseño, implementación y administración de sistemas de bases de datos.',
    professor: 'Ing. Laura Vega',
    icon: Database,
    color: 'from-indigo-400 to-indigo-600',
    progress: 55,
    lastActivity: 'Hace 2 días',
    status: 'active',
    students: 203,
    rating: 4.5,
    duration: '12 semanas',
    category: 'Programación'
  },
  {
    id: 7,
    name: 'Algoritmos y Estructuras de Datos',
    description: 'Análisis de algoritmos y estructuras de datos fundamentales.',
    professor: 'Dr. Fernando López',
    icon: Code,
    color: 'from-cyan-400 to-cyan-600',
    progress: 100,
    lastActivity: 'Completado',
    status: 'completed',
    students: 167,
    rating: 4.8,
    duration: '14 semanas',
    category: 'Programación'
  },
  {
    id: 8,
    name: 'Fotografía Digital',
    description: 'Técnicas de fotografía digital y edición profesional.',
    professor: 'Mtro. Diego Herrera',
    icon: Camera,
    color: 'from-orange-400 to-orange-600',
    progress: 30,
    lastActivity: 'Hace 5 días',
    status: 'active',
    students: 89,
    rating: 4.6,
    duration: '10 semanas',
    category: 'Arte'
  },
  {
    id: 9,
    name: 'Teoría Musical',
    description: 'Fundamentos de teoría musical y composición.',
    professor: 'Mtra. Carmen Flores',
    icon: Music,
    color: 'from-yellow-400 to-yellow-600',
    progress: 0,
    lastActivity: 'Próximamente',
    status: 'upcoming',
    students: 45,
    rating: 4.3,
    duration: '12 semanas',
    category: 'Arte'
  },
  {
    id: 10,
    name: 'Administración de Empresas',
    description: 'Principios fundamentales de administración y gestión empresarial.',
    professor: 'MBA. Patricia Ruiz',
    icon: Briefcase,
    color: 'from-teal-400 to-teal-600',
    progress: 65,
    lastActivity: 'Hace 1 día',
    status: 'active',
    students: 178,
    rating: 4.4,
    duration: '16 semanas',
    category: 'Negocios'
  },
  {
    id: 11,
    name: 'Psicología General',
    description: 'Introducción a los conceptos fundamentales de la psicología.',
    professor: 'Dra. Isabel Morales',
    icon: Heart,
    color: 'from-rose-400 to-rose-600',
    progress: 40,
    lastActivity: 'Hace 4 días',
    status: 'active',
    students: 134,
    rating: 4.7,
    duration: '14 semanas',
    category: 'Ciencias Sociales'
  },
  {
    id: 12,
    name: 'Física Cuántica',
    description: 'Principios de mecánica cuántica y sus aplicaciones.',
    professor: 'Dr. Alejandro Paz',
    icon: Zap,
    color: 'from-violet-400 to-violet-600',
    progress: 20,
    lastActivity: 'Hace 6 días',
    status: 'active',
    students: 67,
    rating: 4.9,
    duration: '18 semanas',
    category: 'Ciencias'
  }
];

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', icon: BookOpen, active: false },
  { name: 'Mis Cursos', icon: BookMarked, active: true },
  { name: 'Calendario', icon: Calendar, active: false },
  { name: 'Tareas', icon: ClipboardList, active: false },
  { name: 'Calificaciones', icon: GraduationCap, active: false },
  { name: 'Chat', icon: MessageCircle, active: false },
  { name: 'Configuración', icon: Settings, active: false }
];

const filterOptions = [
  { value: 'all', label: 'Todos los cursos' },
  { value: 'active', label: 'Activos' },
  { value: 'completed', label: 'Completados' },
  { value: 'upcoming', label: 'Próximos' }
];

const categories = [
  'Todas las categorías',
  'Programación',
  'Matemáticas',
  'Desarrollo Web',
  'Ciencias',
  'Diseño',
  'Arte',
  'Negocios',
  'Ciencias Sociales'
];

export default function StudentCoursesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('Todas las categorías');
  const [showFilters, setShowFilters] = useState(false);
  const studentName = 'María González';

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.professor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;

    const matchesCategory = categoryFilter === 'Todas las categorías' || course.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: string, progress: number) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            <CheckCircle size={12} />
            <span>Completado</span>
          </div>
        );
      case 'upcoming':
        return (
          <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            <Clock size={12} />
            <span>Próximamente</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-1 bg-universidad-azul/10 text-universidad-azul px-2 py-1 rounded-full text-xs font-medium">
            <Play size={12} />
            <span>En progreso</span>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar studentName={studentName} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} hideGreetingOnMobile />

      <div className="flex">
        {/* Sidebar para desktop */}
        <div className="hidden md:block">
          <Sidebar items={sidebarItems} />
        </div>
        {/* Sidebar para mobile (panel deslizante) */}
        {sidebarOpen && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
            <div className="fixed top-0 left-0 z-30 w-64 h-full bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 md:hidden">
              <Sidebar items={sidebarItems} />
            </div>
          </>
        )}
        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Todos mis Cursos</h1>
              <p className="text-gray-600">Gestiona y accede a todos tus cursos inscritos</p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlass size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar cursos, profesores..."
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Status Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Estado del curso</label>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-universidad-azul focus:border-transparent"
                      >
                        {filterOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-universidad-azul focus:border-transparent"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-gray-600">
                Mostrando <span className="font-semibold text-gray-900">{filteredCourses.length}</span> de <span className="font-semibold text-gray-900">{allCourses.length}</span> cursos
              </p>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="p-6">
                    {/* Course Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${course.color}`}>
                        <course.icon size={24} className="text-white" />
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {getStatusBadge(course.status, course.progress)}
                        <div className="flex items-center space-x-1 text-yellow-500">
                          <Star size={14} fill="currentColor" />
                          <span className="text-sm font-medium text-gray-700">{course.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Course Info */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{course.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
                    <p className="text-sm text-gray-500 mb-4">Profesor: <span className="font-medium text-gray-700">{course.professor}</span></p>

                    {/* Progress Bar (only for active courses) */}
                    {course.status === 'active' && (
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
                    )}

                    {/* Course Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Users size={14} />
                        <span>{course.students} estudiantes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    {/* Last Activity */}
                    <p className="text-xs text-gray-500 mb-4">Última actividad: {course.lastActivity}</p>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      {/* Quick Actions */}
                      <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Tareas">
                          <ClipboardList size={16} className="text-gray-600" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Chat">
                          <MessageCircle size={16} className="text-gray-600" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Calificaciones">
                          <GraduationCap size={16} className="text-gray-600" />
                        </button>
                      </div>

                      {/* Main Action Button */}
                      <button
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${course.status === 'completed'
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : course.status === 'upcoming'
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            : 'bg-gradient-to-r from-universidad-azul to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                          }`}
                      >
                        {course.status === 'completed' ? 'Revisar' : course.status === 'upcoming' ? 'Ver detalles' : 'Continuar'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron cursos</h3>
                <p className="text-gray-600 mb-4">Intenta ajustar tus filtros de búsqueda</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setCategoryFilter('Todas las categorías');
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