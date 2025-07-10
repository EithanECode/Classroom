"use client";

import { CheckCircle, Clock, ArrowRight } from 'lucide-react';

const assignments = [
    { id: 1, name: 'Tarea 1: Algoritmos', due: '2024-05-10', status: 'Pendiente' },
    { id: 2, name: 'Tarea 2: Python Básico', due: '2024-05-17', status: 'Entregada' },
    { id: 3, name: 'Quiz 1', due: '2024-05-20', status: 'Calificada' },
];

const statusColor = {
    Pendiente: 'bg-yellow-100 text-yellow-800',
    Entregada: 'bg-blue-100 text-blue-800',
    Calificada: 'bg-green-100 text-green-800',
};

export default function CourseAssignments() {
    return (
        <div className="space-y-4">
            {assignments.map((a) => (
                <div key={a.id} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
                    <div>
                        <div className="font-medium text-gray-900 dark:text-white">{a.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Entrega: {a.due}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[a.status as keyof typeof statusColor]}`}>{a.status}</span>
                        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Ver Detalle">
                            <ArrowRight className="w-5 h-5 text-universidad-azul dark:text-blue-400" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
} 