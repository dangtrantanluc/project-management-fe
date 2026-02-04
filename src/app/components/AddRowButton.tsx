
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from './ui/utils';
import { ProjectItem, SAMPLE_ASSIGNEES, Status } from '../types';

interface AddRowButtonProps {
    type: 'task' | 'project';
    defaultStatus?: Status;
    onAdd: (item: Omit<ProjectItem, 'id'>) => void;
}

export function AddRowButton({ type, defaultStatus = 'To Do', onAdd }: AddRowButtonProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onAdd({
                name: name.trim(),
                assignee: null,
                deadline: null,
                priority: 'Medium',
                totalCost: 0,
                status: defaultStatus,
                type,
            });
            setName('');
            setIsAdding(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setName('');
            setIsAdding(false);
        }
    };

    if (isAdding) {
        return (
            <tr className="border-t border-border bg-accent/20">
                <td colSpan={7} className="px-4 py-2">
                    <form onSubmit={handleSubmit} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={`Enter ${type} name...`}
                            autoFocus
                            className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setName('');
                                setIsAdding(false);
                            }}
                            className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                        >
                            Cancel
                        </button>
                    </form>
                </td>
            </tr>
        );
    }

    return (
        <tr className="border-t border-dashed border-border/50 hover:bg-accent/10 transition-colors">
            <td colSpan={7} className="px-4 py-2">
                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
                >
                    <Plus className="w-4 h-4" />
                    <span className="font-medium">Add {type === 'task' ? 'Task' : 'Project'}</span>
                </button>
            </td>
        </tr>
    );
}
