import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { SpreadsheetView } from './components/SpreadsheetView';
import { CalendarView } from './components/CalendarView';
import { TeamView } from './components/TeamView';
import { ProjectDashboard } from './components/ProjectDashboard';
import { CreateTaskModal } from './CreateTask';
import { useProjectData } from './hooks/useProjectData';
import { Calendar as CalendarIcon, Filter, Download, Plus } from 'lucide-react';
import { cn } from './components/ui/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'task' | 'project' | null>(null);

  const { items, addItem, updateItem, deleteItem, duplicateItem } = useProjectData();

  const handleCreateTask = () => {
    setModalMode('task');
    setIsTaskModalOpen(true);
  };

  const handleCreateProject = () => {
    setModalMode('project');
    setIsTaskModalOpen(true);
  };
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ProjectDashboard />;
      case 'tasks':
        return (
          <div className="flex flex-col h-full">
            <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium border border-border rounded-lg hover:bg-accent transition-colors">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button onClick={handleCreateTask} className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity">
                  <Plus className="w-4 h-4" />
                  <span>Create Task</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <SpreadsheetView
                items={items.filter(i => i.type === 'task')}
                onUpdate={updateItem}
                onAdd={addItem}
                onDelete={deleteItem}
                onDuplicate={duplicateItem}
                viewType="task"
              />
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="flex flex-col h-full">
            <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium border border-border rounded-lg hover:bg-accent transition-colors">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button onClick={handleCreateProject} className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity">
                  <Plus className="w-4 h-4" />
                  <span>Create Project</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <SpreadsheetView
                items={items.filter(i => i.type === 'project')}
                onUpdate={updateItem}
                onAdd={addItem}
                onDelete={deleteItem}
                onDuplicate={duplicateItem}
                viewType="project"
              />
            </div>
          </div>
        );
      case 'calendar':
        return <CalendarView />;
      case 'team':
        return <TeamView />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-muted-foreground flex-col space-y-4">
            <div className="text-6xl opacity-20">📋</div>
            <p className="font-medium italic">This module is coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onCreateTask={() => setIsTaskModalOpen(true)} />

      <main className="flex-1 lg:ml-64 flex flex-col h-screen">
        <Navbar
          title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          breadcrumbs={['Projects', 'Main Office']}
        />

        <div className="flex-1 overflow-hidden">
          {renderContent()}
        </div>

        <CreateTaskModal
          isOpen={isTaskModalOpen}
          mode={modalMode}
          onClose={() => setIsTaskModalOpen(false)}
          onSubmit={(data) => console.log(data)}
        />
      </main>
    </div>
  );
}
