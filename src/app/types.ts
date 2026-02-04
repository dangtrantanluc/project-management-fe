export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
export type Status = 'To Do' | 'In Process' | 'Done' | 'Review';
export type ItemType = 'task' | 'project';

export interface Assignee {
  id: string;
  name: string;
  avatar?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  assignee: Assignee | null;
  deadline: string | null; // ISO date string
  priority: Priority;
  totalCost: number;
  status: Status;
  type: ItemType;
}

export const SAMPLE_ASSIGNEES: Assignee[] = [
  { id: '1', name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
  { id: '2', name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  { id: '3', name: 'Emily Rodriguez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
  { id: '4', name: 'James Wilson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
  { id: '5', name: 'Lisa Anderson', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
];
