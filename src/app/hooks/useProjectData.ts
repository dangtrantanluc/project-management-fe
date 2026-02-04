import { useState, useEffect } from 'react';
import { ProjectItem, SAMPLE_ASSIGNEES, Assignee } from '../types';

const STORAGE_KEY = 'project-management-data';

const INITIAL_DATA: ProjectItem[] = [
    {
        id: '1',
        name: 'Website Redesign',
        assignee: SAMPLE_ASSIGNEES[0],
        deadline: '2026-02-15',
        priority: 'High',
        totalCost: 15000,
        status: 'In Process',
        type: 'project',
    },
    {
        id: '2',
        name: 'Mobile App Development',
        assignee: SAMPLE_ASSIGNEES[1],
        deadline: '2026-03-01',
        priority: 'Critical',
        totalCost: 45000,
        status: 'In Process',
        type: 'project',
    },
    {
        id: '3',
        name: 'Update Documentation',
        assignee: SAMPLE_ASSIGNEES[2],
        deadline: '2026-02-10',
        priority: 'Medium',
        totalCost: 2000,
        status: 'To Do',
        type: 'task',
    },
    {
        id: '4',
        name: 'Database Migration',
        assignee: SAMPLE_ASSIGNEES[3],
        deadline: '2026-02-20',
        priority: 'High',
        totalCost: 8000,
        status: 'Review',
        type: 'task',
    },
    {
        id: '5',
        name: 'Security Audit',
        assignee: SAMPLE_ASSIGNEES[4],
        deadline: '2026-02-25',
        priority: 'Critical',
        totalCost: 12000,
        status: 'To Do',
        type: 'task',
    },
];

export function useProjectData() {
    const [items, setItems] = useState<ProjectItem[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse stored data:', e);
                return INITIAL_DATA;
            }
        }
        return INITIAL_DATA;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addItem = (item: Omit<ProjectItem, 'id'>) => {
        const newItem: ProjectItem = {
            ...item,
            id: Date.now().toString(),
        };
        setItems((prev) => [...prev, newItem]);
        return newItem;
    };

    const updateItem = (id: string, updates: Partial<ProjectItem>) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
        );
    };

    const deleteItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const duplicateItem = (id: string) => {
        const item = items.find((i) => i.id === id);
        if (item) {
            const newItem: ProjectItem = {
                ...item,
                id: Date.now().toString(),
                name: `${item.name} (Copy)`,
            };
            setItems((prev) => [...prev, newItem]);
        }
    };

    return {
        items,
        addItem,
        updateItem,
        deleteItem,
        duplicateItem,
    };
}

export interface CalendarEvent {
    id: string;
    title: string;
    date: string; // ISO date string
    type: 'meeting' | 'deadline' | 'review';
}

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
    { id: '1', title: 'Sprint Planning', date: '2026-02-02', type: 'meeting' },
    { id: '2', title: 'Website Launch', date: '2026-02-15', type: 'deadline' },
    { id: '3', title: 'Team Sync', date: '2026-02-05', type: 'meeting' },
    { id: '4', title: 'Design Review', date: '2026-02-10', type: 'review' },
    { id: '5', title: 'Client Meeting', date: '2026-02-20', type: 'meeting' },
];

export interface TeamMember extends Assignee {
    role: string;
    email: string;
    status: 'online' | 'offline' | 'busy';
}

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
    { ...SAMPLE_ASSIGNEES[0], role: 'Product Manager', email: 'sarah@example.com', status: 'online' },
    { ...SAMPLE_ASSIGNEES[1], role: 'Senior Developer', email: 'michael@example.com', status: 'busy' },
    { ...SAMPLE_ASSIGNEES[2], role: 'UX Designer', email: 'emily@example.com', status: 'offline' },
    { ...SAMPLE_ASSIGNEES[3], role: 'Frontend Dev', email: 'james@example.com', status: 'online' },
    { ...SAMPLE_ASSIGNEES[4], role: 'QA Engineer', email: 'lisa@example.com', status: 'online' },
];
