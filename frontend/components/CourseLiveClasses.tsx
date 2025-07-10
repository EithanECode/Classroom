"use client";

import { Play, CalendarDays } from 'lucide-react';

const liveClasses = [
    { id: 1, title: 'Clase 1: Introducción', date: '2024-05-12', time: '10:00', url: '#' },
    { id: 2, title: 'Clase 2: Algoritmos', date: '2024-05-19', time: '12:00', url: '#' },
];

export default function CourseLiveClasses() {
    return (
        <div className="space-y-4">
            {liveClasses.map((cls) => (
                <div key={cls.id} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
                    <div>
                        <div className="font-medium text-gray-900 dark:text-white">{cls.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2"><CalendarDays className="w-4 h-4" />{cls.date} • {cls.time} hrs</div>
                    </div>
                    <a href={cls.url} className="flex items-center px-4 py-2 bg-universidad-azul dark:bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition-colors">
                        <Play className="w-5 h-5 mr-2" />Unirse
                    </a>
                </div>
            ))}
        </div>
    );
} 