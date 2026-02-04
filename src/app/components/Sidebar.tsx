import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  Users, 
  Clock, 
  Settings, 
  BarChart3, 
  Layers,
  Search,
  Plus
} from 'lucide-react';
import { cn } from './ui/utils';
import {CreateTaskModal} from '../CreateTask';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center w-full px-4 py-3 text-sm transition-colors duration-200 group relative",
      active 
        ? "bg-primary/10 text-primary border-r-2 border-primary" 
        : "text-muted-foreground hover:bg-accent hover:text-foreground"
    )}
  >
    <Icon className={cn("w-5 h-5 mr-3", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
    <span className="font-medium">{label}</span>
  </button>
);

export const Sidebar = ({ activeTab, setActiveTab, onCreateTask }: { activeTab: string, setActiveTab: (tab: string) => void, onCreateTask?: () => void }) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare },
    { id: 'projects', label: 'All Projects', icon: Layers },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'timesheets', label: 'Timesheets', icon: Clock },
    { id: 'reporting', label: 'Reporting', icon: BarChart3 },
  ];

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0 z-20">
      <div className="p-6 flex items-center">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
          <Layers className="text-primary-foreground w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold text-sidebar-foreground ">BlueBolt Software</h1>
      </div>

      <div className="px-4 mb-4">
        <button onClick={onCreateTask} className="w-full flex items-center justify-center space-x-2 bg-primary text-primary-foreground py-2 rounded-md hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Main Menu
        </div>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
      </div>
    </div>
  );
};
