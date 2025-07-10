"use client";

import { PlayCircle, CalendarDays } from 'lucide-react';

const recordings = [
    { id: 1, title: 'Clase 1: Introducción', date: '2024-05-12', url: '#' },
    { id: 2, title: 'Clase 2: Algoritmos', date: '2024-05-19', url: '#' },
];

export default function CourseRecordings() {
    return (
        <div className="space-y-4">
            {recordings.map((rec) => (
                <div key={rec.id} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
                    <div>
                        <div className="font-medium text-gray-900 dark:text-white">{rec.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2"><CalendarDays className="w-4 h-4" />{rec.date}</div>
                    </div>
                    <a href={rec.url} className="flex items-center px-4 py-2 bg-universidad-amarillo text-gray-900 rounded-lg font-medium shadow hover:bg-yellow-400 transition-colors">
                        <PlayCircle className="w-5 h-5 mr-2" />Ver Grabación
                    </a>
                </div>
            ))}
        </div>
    );
} 