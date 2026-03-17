import React from 'react';
import { Calendar, Repeat, Users, LayoutGrid } from 'lucide-react';
import { Screen } from '../types';

interface BottomNavProps {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

export default function BottomNav({ activeScreen, setActiveScreen }: BottomNavProps) {
  const navItems: { id: Screen; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Menu', icon: Calendar },
    { id: 'exchange', label: 'Échange', icon: Repeat },
    { id: 'atelier', label: 'Atelier', icon: Users },
    { id: 'inventory', label: 'Stock', icon: LayoutGrid },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveScreen(item.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-emerald-600' : 'text-gray-400'
            }`}
          >
            <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-emerald-50' : ''}`}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
