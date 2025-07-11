import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, FileText, Video } from 'lucide-react';

// Mock data de módulos y clases
const modules = [
    {
        id: 1,
        title: 'Módulo 1: Introducción a la Ciberseguridad',
        classes: [
            { id: 1, title: '¿Qué es la Ciberseguridad?', type: 'video' },
            { id: 2, title: 'Protegiendo su Data Personal', type: 'pdf' },
            { id: 3, title: 'Su Identidad En Línea', type: 'video' },
        ],
    },
    {
        id: 2,
        title: 'Módulo 2: Datos de la organización',
        classes: [
            { id: 4, title: '¿Qué fue tomado?', type: 'pdf' },
            { id: 5, title: 'Dispositivos inteligentes', type: 'video' },
        ],
    },
];

export default function CourseSidebar() {
    const [openModule, setOpenModule] = useState<number | null>(modules[0].id);
    const [selectedClass, setSelectedClass] = useState<number | null>(null);

    // Función para calcular la altura del contenido del acordeón
    const getAccordionHeight = (ref: React.RefObject<HTMLUListElement>) => {
        if (ref.current) {
            return ref.current.scrollHeight;
        }
        return 0;
    };

    return (
        <aside className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 h-[calc(100vh-4rem)] p-4 overflow-y-auto shadow-xl">
            <h2 className="text-lg font-bold text-universidad-azul dark:text-blue-400 mb-4">Contenido del Curso</h2>
            <nav className="space-y-2">
                {modules.map((mod) => {
                    // Referencia para el ul de cada módulo
                    const ulRef = useRef<HTMLUListElement>(null);
                    // Estado local para controlar la altura animada
                    const isOpen = openModule === mod.id;
                    const [height, setHeight] = useState(isOpen ? 'auto' : '0px');

                    useEffect(() => {
                        if (isOpen) {
                            setHeight(getAccordionHeight(ulRef) + 'px');
                        } else {
                            setHeight('0px');
                        }
                    }, [isOpen]);

                    // Cuando cambia el contenido (por ejemplo, resize), actualizar altura
                    useEffect(() => {
                        if (isOpen) {
                            setHeight(getAccordionHeight(ulRef) + 'px');
                        }
                    }, [ulRef, isOpen]);

                    return (
                        <div key={mod.id}>
                            <button
                                className="flex items-center w-full px-2 py-2 rounded-lg font-semibold text-left transition-colors focus:outline-none focus:ring-2 focus:ring-universidad-azul/30 dark:focus:ring-blue-400/30 hover:bg-universidad-azul/10 dark:hover:bg-blue-600/10"
                                onClick={() => setOpenModule(isOpen ? null : mod.id)}
                                aria-expanded={isOpen}
                            >
                                {isOpen ? (
                                    <ChevronDown className="w-5 h-5 mr-2" />
                                ) : (
                                    <ChevronRight className="w-5 h-5 mr-2" />
                                )}
                                <span>{mod.title}</span>
                            </button>
                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden`}
                                style={{ maxHeight: isOpen ? height : '0px' }}
                            >
                                <ul ref={ulRef} className="ml-7 mt-1 space-y-1">
                                    {mod.classes.map((cls) => (
                                        <li key={cls.id}>
                                            <button
                                                className={`flex items-center w-full px-2 py-1 rounded-md text-sm transition-colors
                        ${selectedClass === cls.id
                                                        ? 'bg-universidad-azul text-white dark:bg-blue-600'
                                                        : 'text-gray-700 dark:text-gray-200 hover:bg-universidad-azul/10 dark:hover:bg-blue-600/10'}
                      `}
                                                onClick={() => setSelectedClass(cls.id)}
                                            >
                                                {cls.type === 'video' ? (
                                                    <Video className="w-4 h-4 mr-2" />
                                                ) : (
                                                    <FileText className="w-4 h-4 mr-2" />
                                                )}
                                                {cls.title}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
} 