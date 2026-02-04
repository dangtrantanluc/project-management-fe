import React from 'react';
import { Search, Bell, HelpCircle, ChevronRight, Menu } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NavbarProps {
  title: string;
  breadcrumbs?: string[];
}

export const Navbar = ({ title, breadcrumbs = [] }: NavbarProps) => {
  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center space-x-4">
        <button className="lg:hidden text-muted-foreground">
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex items-center text-sm font-medium">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb} className="flex items-center">
              <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                {crumb}
              </span>
              <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground/50" />
            </div>
          ))}
          <span className="text-foreground">{title}</span>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tasks, projects..."
            className="w-full bg-input-background rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all border border-transparent focus:border-primary/20"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-muted-foreground hover:text-foreground relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full border-2 border-background"></span>
          </button>
          <button className="text-muted-foreground hover:text-foreground">
            <HelpCircle className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3 pl-2 border-l border-border">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold leading-none">Alex Rivera</p>
              <p className="text-xs text-muted-foreground">Project Manager</p>
            </div>
            <div className="w-9 h-9 rounded-full overflow-hidden border border-border">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1701463387028-3947648f1337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMG9mZmljZSUyMGF2YXRhcnxlbnwxfHx8fDE3NzAxMDE2NjF8MA"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
