import React, { useState } from 'react';
import { ProjectItem, Status } from '../types';
import { EditableCell } from './EditableCell';
import { PriorityDropdown } from './PriorityDropdown';
import { AssigneeSelector } from './AssigneeSelector';
import { AddRowButton } from './AddRowButton';
import { GroupHeader } from './GroupHeader';
import { MoreVertical, Trash2, Copy } from 'lucide-react';
import { cn } from './ui/utils';

interface SpreadsheetViewProps {
    items: ProjectItem[];
    onUpdate: (id: string, updates: Partial<ProjectItem>) => void;
    onAdd: (item: Omit<ProjectItem, 'id'>) => void;
    onDelete: (id: string) => void;
    onDuplicate: (id: string) => void;
    viewType: 'task' | 'project';
}

const STATUS_GROUPS: { status: Status; color: string; bg: string }[] = [
    { status: 'To Do', color: 'text-gray-700', bg: 'bg-gray-100' },
    { status: 'In Process', color: 'text-blue-700', bg: 'bg-blue-100' },
    { status: 'Review', color: 'text-amber-700', bg: 'bg-amber-100' },
    { status: 'Done', color: 'text-green-700', bg: 'bg-green-100' },
];

export function SpreadsheetView({ items, onUpdate, onAdd, onDelete, onDuplicate, viewType }: SpreadsheetViewProps) {
    const [hoveredRow, setHoveredRow] = useState<string | null>(null);
    const [expandedGroups, setExpandedGroups] = useState<Record<Status, boolean>>({
        'To Do': true,
        'In Process': true,
        'Review': true,
        'Done': true,
    });

    const toggleGroup = (status: Status) => {
        setExpandedGroups(prev => ({ ...prev, [status]: !prev[status] }));
    };

    const groupedItems = STATUS_GROUPS.map(group => ({
        ...group,
        items: items.filter(item => item.status === group.status),
    }));

    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData('text/plain', id);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, status: Status) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        onUpdate(id, { status });
    };

    return (
        <div className="h-full overflow-auto">
            <div className="min-w-[1000px] pb-20">
                <div className="sticky top-0 z-10 bg-background border-b border-border shadow-sm">
                    <div className="flex px-4 py-3">
                        <div className="w-[35%] text-xs font-bold text-muted-foreground uppercase tracking-wider pl-8">Name</div>
                        <div className="w-[15%] text-xs font-bold text-muted-foreground uppercase tracking-wider">Assignee</div>
                        <div className="w-[15%] text-xs font-bold text-muted-foreground uppercase tracking-wider">Deadline</div>
                        <div className="w-[15%] text-xs font-bold text-muted-foreground uppercase tracking-wider">Priority</div>
                        <div className="w-[15%] text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Cost</div>
                        <div className="w-[5%]"></div>
                    </div>
                </div>

                <div className="mt-2 space-y-4">
                    {groupedItems.map(group => (
                        <div
                            key={group.status}
                            className="bg-card rounded-lg border border-border overflow-hidden mx-4"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, group.status)}
                        >
                            <GroupHeader
                                status={group.status}
                                count={group.items.length}
                                isExpanded={expandedGroups[group.status]}
                                onToggle={() => toggleGroup(group.status)}
                                colorClass={group.color}
                                bgClass={group.bg}
                            />

                            {expandedGroups[group.status] && (
                                <div>
                                    {group.items.map(item => (
                                        <div
                                            key={item.id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, item.id)}
                                            className={cn(
                                                "flex items-center px-4 py-2 border-t border-border transition-colors group relative",
                                                hoveredRow === item.id ? "bg-accent/20" : "hover:bg-accent/10"
                                            )}
                                            onMouseEnter={() => setHoveredRow(item.id)}
                                            onMouseLeave={() => setHoveredRow(null)}
                                        >
                                            <div className="w-[35%] flex items-center gap-3 pr-4">
                                                <div className="cursor-move text-muted-foreground/30 hover:text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                                    ⋮⋮
                                                </div>
                                                <EditableCell
                                                    value={item.name}
                                                    onSave={(value) => onUpdate(item.id, { name: value as string })}
                                                    className="flex-1 font-semibold"
                                                />
                                            </div>

                                            <div className="w-[15%] pr-4">
                                                <AssigneeSelector
                                                    value={item.assignee}
                                                    onChange={(assignee) => onUpdate(item.id, { assignee })}
                                                />
                                            </div>

                                            <div className="w-[15%] pr-4">
                                                <EditableCell
                                                    value={item.deadline || ''}
                                                    onSave={(value) => onUpdate(item.id, { deadline: value as string })}
                                                    type="date"
                                                />
                                            </div>

                                            <div className="w-[15%] pr-4">
                                                <PriorityDropdown
                                                    value={item.priority}
                                                    onChange={(priority) => onUpdate(item.id, { priority })}
                                                />
                                            </div>

                                            <div className="w-[15%] pr-4">
                                                <EditableCell
                                                    value={item.totalCost}
                                                    onSave={(value) => onUpdate(item.id, { totalCost: Number(value) })}
                                                    type="number"
                                                    className="font-mono text-sm pl-2"
                                                />
                                            </div>

                                            <div className="w-[5%] flex justify-end">
                                                <div className="relative">
                                                    <button className="p-1 rounded hover:bg-accent transition-colors opacity-0 group-hover:opacity-100">
                                                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                                    </button>
                                                    <div className="absolute right-0 top-full mt-1 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-20 min-w-[140px] opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
                                                        <button
                                                            onClick={() => onDuplicate(item.id)}
                                                            className="w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center gap-2"
                                                        >
                                                            <Copy className="w-4 h-4" />
                                                            <span>Duplicate</span>
                                                        </button>
                                                        <button
                                                            onClick={() => onDelete(item.id)}
                                                            className="w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center gap-2 text-red-600"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            <span>Delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="pl-8 pr-4">
                                        <AddRowButton type={viewType} defaultStatus={group.status} onAdd={onAdd} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
