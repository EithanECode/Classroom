"use client";

import { useState } from 'react';
import {
    Folder,
    ClipboardList,
    Video,
    PlayCircle,
    MessagesSquare,
} from 'lucide-react';
import CourseMaterials from './CourseMaterials';
import CourseAssignments from './CourseAssignments';
import CourseLiveClasses from './CourseLiveClasses';
import CourseRecordings from './CourseRecordings';
import CourseChat from './CourseChat';

const tabs = [
    { name: 'Materiales', icon: Folder },
    { name: 'Tareas', icon: ClipboardList },
    { name: 'Clases en Vivo', icon: Video },
    { name: 'Grabaciones', icon: PlayCircle },
    { name: 'Chat del Salón', icon: MessagesSquare },
];

export default function CourseTabs() {
    const [activeTab, setActiveTab] = useState('Materiales');

    return (
        <section>
            {/* Tabs */}
            <nav className="flex space-x-2 md:space-x-4 mb-6 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`flex items-center px-4 py-2 rounded-xl font-medium transition-colors whitespace-nowrap
              ${activeTab === tab.name
                                ? 'bg-universidad-azul text-white dark:bg-blue-600 dark:text-white shadow'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-universidad-azul/10 hover:text-universidad-azul dark:hover:text-blue-400'
                            }`}
                    >
                        <tab.icon className="w-5 h-5 mr-2" />
                        {tab.name}
                    </button>
                ))}
            </nav>
            {/* Contenido dinámico */}
            <div>
                {activeTab === 'Materiales' && <CourseMaterials />}
                {activeTab === 'Tareas' && <CourseAssignments />}
                {activeTab === 'Clases en Vivo' && <CourseLiveClasses />}
                {activeTab === 'Grabaciones' && <CourseRecordings />}
                {activeTab === 'Chat del Salón' && <CourseChat />}
            </div>
        </section>
    );
} 