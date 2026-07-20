import React from 'react';
import { Home, Compass, Library, History, Settings } from 'lucide-react';

function Sidebar() {
  return (
    <aside className="w-16 lg:w-64 border-r border-border bg-card flex flex-col items-center lg:items-start p-4 transition-all duration-300">
      <div className="flex items-center gap-3 mb-10 w-full justify-center lg:justify-start text-primary">
        <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09s-.03 1.28-.1 2.09c-.06.8-.15 1.43-.28 1.9-.32 1.24-1.08 2.01-2.31 2.33-.47.13-1.1.22-1.9.28-.8.07-1.49.1-2.09.1s-1.28-.03-2.09-.1c-.8-.06-1.43-.15-1.9-.28-1.24-.32-2.01-1.08-2.33-2.31-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09s.03-1.28.1-2.09c.06-.8.15-1.43.28-1.9.32-1.24 1.08-2.01 2.31-2.33.47-.13 1.1-.22 1.9-.28.8-.07 1.49-.1 2.09-.1s1.28.03 2.09.1c.8.06 1.43.15 1.9.28 1.24.32 2.01 1.08 2.33 2.31z"/>
          </svg>
        </div>
        <span className="font-bold text-xl hidden lg:block tracking-tight">SkipTube</span>
      </div>

      <nav className="flex flex-col gap-2 w-full flex-1">
        <NavItem icon={<Home size={22} />} label="Home" active />
        <NavItem icon={<Compass size={22} />} label="Explore" />
        <NavItem icon={<Library size={22} />} label="Library" />
        <NavItem icon={<History size={22} />} label="History" />
      </nav>

      <div className="w-full mt-auto pt-4 border-t border-border">
        <NavItem icon={<Settings size={22} />} label="Settings" />
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <button
      className={`flex items-center gap-4 w-full p-3 rounded-lg transition-colors
        ${active 
          ? 'bg-primary text-primary-foreground font-medium shadow-sm' 
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
      title={label}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="hidden lg:block text-sm">{label}</span>
    </button>
  );
}

export default Sidebar;
