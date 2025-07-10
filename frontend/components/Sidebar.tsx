import Link from 'next/link';

export interface SidebarItem {
    name: string;
    icon: React.ElementType;
    active: boolean;
}

interface SidebarProps {
    items: SidebarItem[];
    onItemClick?: (name: string) => void;
}

export default function Sidebar({ items, onItemClick }: SidebarProps) {
    return (
        <div className="p-6">
            <nav className="space-y-2">
                {items.map((item) => (
                    <Link
                        key={item.name}
                        href={
                            item.name === 'Dashboard' ? '/' :
                                item.name === 'Mis Cursos' ? '/dashboard-student/courses' :
                                    item.name === 'Calendario' ? '/dashboard-student/calendar' :
                                        item.name === 'Tareas' ? '/dashboard-student/assignments' :
                                            item.name === 'Calificaciones' ? '/dashboard-student/grades' :
                                                item.name === 'Chat' ? '/chat' :
                                                    item.name === 'Configuración' ? '/configuracion' : '#'
                        }
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${item.active
                            ? 'bg-gradient-to-r from-universidad-azul to-blue-600 text-white shadow-lg'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        onClick={() => onItemClick?.(item.name)}
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.name}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
} 