"use client";

import { ArrowDownToLine, Eye, FileText, Link2 } from 'lucide-react';

const materials = [
    { id: 1, name: 'Guía de Algoritmos', type: 'PDF', url: '#', date: '2024-05-01' },
    { id: 2, name: 'Presentación Intro', type: 'Documento', url: '#', date: '2024-05-03' },
    { id: 3, name: 'Enlace a Repositorio', type: 'Enlace', url: '#', date: '2024-05-05' },
];

const typeIcon = {
    PDF: FileText,
    Documento: FileText,
    Enlace: Link2,
};

export default function CourseMaterials() {
    return (
        <div className="space-y-4">
            {materials.map((mat) => {
                const Icon = typeIcon[mat.type as keyof typeof typeIcon] || FileText;
                return (
                    <div key={mat.id} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
                        <div className="flex items-center space-x-3">
                            <Icon className="w-6 h-6 text-universidad-azul dark:text-blue-400" />
                            <div>
                                <div className="font-medium text-gray-900 dark:text-white">{mat.name}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{mat.type} • {mat.date}</div>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <a href={mat.url} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Ver">
                                <Eye className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                            </a>
                            <a href={mat.url} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Descargar">
                                <ArrowDownToLine className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                            </a>
                        </div>
                    </div>
                );
            })}
        </div>
    );
} 