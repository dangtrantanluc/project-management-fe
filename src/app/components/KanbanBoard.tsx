import React, { useState } from 'react';
import { MoreHorizontal, Plus, Clock, MessageSquare, Paperclip, ChevronRight, Banknote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { cn } from './ui/utils';

interface Task {
  id: string;
  title: string;
  description: string;
  cost?: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  comments: number;
  attachments: number;
  assignees: string[];
  tags: string[];
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: '1',
        title: 'Design System Update',
        description: 'Update the primary color palette and component library.',
        cost: '500.000 VND',
        priority: 'High',
        dueDate: 'Feb 10',
        comments: 12,
        attachments: 4,
        assignees: ['https://images.unsplash.com/photo-1701463387028-3947648f1337', 'https://images.unsplash.com/photo-1675186914580-94356f7c012c'],
        tags: ['Design', 'UI/UX']
      },
      {
        id: '2',
        title: 'User Interview Analysis',
        description: 'Synthesize findings from the last round of usability tests.',
        cost: '300.000 VND',
        priority: 'Medium',
        dueDate: 'Feb 15',
        comments: 8,
        attachments: 2,
        assignees: ['https://images.unsplash.com/photo-1704655295066-681e61ecca6b'],
        tags: ['Research']
      }
    ]
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    tasks: [
      {
        id: '3',
        title: 'Backend API Integration',
        description: 'Connect the frontend dashboard to the new GraphQL endpoint.',
        cost: '800.000 VND',
        priority: 'High',
        dueDate: 'Feb 8',
        comments: 24,
        attachments: 6,
        assignees: ['https://images.unsplash.com/photo-1701463387028-3947648f1337'],
        tags: ['Development', 'API']
      }
    ]
  },
  {
    id: 'review',
    title: 'Review',
    tasks: [
      {
        id: '4',
        title: 'QA Testing - Login Flow',
        description: 'Run automated and manual tests on the new OAuth flow.',
        cost: '400.000 VND',
        priority: 'Medium',
        dueDate: 'Feb 5',
        comments: 3,
        attachments: 1,
        assignees: ['https://images.unsplash.com/photo-1675186914580-94356f7c012c'],
        tags: ['QA']
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        id: '5',
        title: 'Market Competitor Research',
        description: 'Analyze top 5 competitors in the CRM space.',
        cost: '600.000 VND',
        priority: 'Low',
        dueDate: 'Jan 28',
        comments: 15,
        attachments: 3,
        assignees: ['https://images.unsplash.com/photo-1704655295066-681e61ecca6b'],
        tags: ['Strategy']
      }
    ]
  }
];

const TaskCard = ({ task }: { task: Task }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-card p-4 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer mb-3 group"
  >
    <div className="flex justify-between items-start mb-2">
      <div className="flex gap-2">
        {task.tags.map(tag => (
          <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/5 text-primary/70">
            {tag}
          </span>
        ))}
      </div>
      <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>
    
    <h4 className="text-sm font-semibold mb-2 group-hover:text-primary transition-colors">{task.title}</h4>
    <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
      {task.description}
    </p>

    <div className="flex items-center justify-between mt-auto">
      <div className="flex -space-x-2">
        {task.assignees.map((url, i) => (
          <div key={i} className="w-6 h-6 rounded-full border-2 border-background overflow-hidden">
            <ImageWithFallback src={url} alt="Assignee" className="w-full h-full object-cover" />
          </div>
        ))}
        {task.assignees.length > 2 && (
          <div className="w-6 h-6 rounded-full border-2 border-background bg-accent flex items-center justify-center text-[10px] font-bold">
            +{task.assignees.length - 2}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-3 text-muted-foreground">
        {task.cost && (
          <div className="flex items-center space-x-1 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
            <Banknote className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold">{task.cost}</span>
          </div>
        )}

        <div className="flex items-center space-x-1">
          <MessageSquare className="w-3.5 h-3.5" />
          <span className="text-[10px]">{task.comments}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-[10px]">{task.dueDate}</span>
        </div>
      </div>
    </div>
  </motion.div>
);
export const KanbanBoard = () => {
  const [columns] = useState<Column[]>(initialColumns);

  return (
    <div className="h-full overflow-x-auto overflow-y-hidden pb-4">
      <div className="inline-flex h-full space-x-6 min-w-full px-6">
        {columns.map((column) => (
          <div key={column.id} className="w-80 flex flex-col h-full bg-accent/20 rounded-2xl border border-border/50">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold">{column.title}</h3>
                <span className="bg-muted px-2 py-0.5 rounded-full text-[10px] font-bold text-muted-foreground">
                  {column.tasks.length}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-1 hover:bg-accent rounded text-muted-foreground hover:text-foreground">
                  <Plus className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-accent rounded text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4 custom-scrollbar">
              <AnimatePresence>
                {column.tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </AnimatePresence>
              
              <button className="w-full py-2 border-2 border-dashed border-border/50 rounded-xl text-xs font-medium text-muted-foreground hover:border-primary/30 hover:text-primary transition-all flex items-center justify-center space-x-2 mt-2">
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            </div>
          </div>
        ))}

        <div className="w-80 flex-shrink-0">
          <button className="w-full h-12 border-2 border-dashed border-border/50 rounded-2xl flex items-center justify-center space-x-2 text-sm font-medium text-muted-foreground hover:bg-accent/30 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Stage</span>
          </button>
        </div>
      </div>
    </div>
  );
};
