import React from 'react';
import { MOCK_TEAM_MEMBERS, useProjectData } from '../hooks/useProjectData';
import { Mail, Briefcase, Plus, User, Circle } from 'lucide-react';
import { cn } from './ui/utils';

export function TeamView() {
    const { items } = useProjectData();

    // Calculate stats for each member
    const memberStats = MOCK_TEAM_MEMBERS.map(member => {
        const assignedItems = items.filter(item => item.assignee?.id === member.id);
        const activeTasks = assignedItems.filter(item => item.type === 'task' && (item.status === 'To Do' || item.status === 'In Process'));

        // Find highest priority task
        const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
        const highestPriorityTask = assignedItems
            .filter(item => item.type === 'task' && item.status !== 'Done')
            .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])[0];

        return {
            ...member,
            activeCount: activeTasks.length,
            totalAssigned: assignedItems.length,
            currentFocus: highestPriorityTask ? highestPriorityTask.name : 'No active tasks',
            focusPriority: highestPriorityTask ? highestPriorityTask.priority : null
        };
    });

    return (
        <div className="h-full overflow-auto bg-background">
            <div className="min-w-[1000px]">
                <div className="sticky top-0 z-10 bg-background border-b border-border">
                    <div className="flex px-4 py-3 bg-accent/20">
                        <div className="w-[25%] text-xs font-bold text-muted-foreground uppercase tracking-wider pl-4">Member</div>
                        <div className="w-[15%] text-xs font-bold text-muted-foreground uppercase tracking-wider">Role</div>
                        <div className="w-[10%] text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</div>
                        <div className="w-[10%] text-xs font-bold text-muted-foreground uppercase tracking-wider">Active Tasks</div>
                        <div className="w-[25%] text-xs font-bold text-muted-foreground uppercase tracking-wider">Current Focus</div>
                        <div className="w-[15%] text-xs font-bold text-muted-foreground uppercase tracking-wider">Contact</div>
                    </div>
                </div>

                <div className="divide-y divide-border">
                    {memberStats.map(member => (
                        <div
                            key={member.id}
                            className="flex items-center px-4 py-3 hover:bg-accent/10 transition-colors group"
                        >
                            <div className="w-[25%] flex items-center gap-3 pl-4">
                                <div className="w-9 h-9 rounded-full overflow-hidden border border-border">
                                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                                </div>
                                <span className="font-semibold text-sm">{member.name}</span>
                            </div>

                            <div className="w-[15%] flex items-center gap-2 text-sm text-muted-foreground">
                                <Briefcase className="w-3.5 h-3.5" />
                                <span>{member.role}</span>
                            </div>

                            <div className="w-[10%]">
                                <div className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase",
                                    member.status === 'online' ? "bg-green-100 text-green-700 border-green-200" :
                                        member.status === 'busy' ? "bg-red-100 text-red-700 border-red-200" :
                                            "bg-gray-100 text-gray-700 border-gray-200"
                                )}>
                                    <Circle className="w-1.5 h-1.5 fill-current" />
                                    {member.status}
                                </div>
                            </div>

                            <div className="w-[10%] pl-2">
                                <span className={cn(
                                    "text-sm font-bold",
                                    member.activeCount > 3 ? "text-orange-600" : "text-foreground"
                                )}>
                                    {member.activeCount}
                                </span>
                                <span className="text-xs text-muted-foreground ml-1">tasks</span>
                            </div>

                            <div className="w-[25%]">
                                {member.currentFocus !== 'No active tasks' ? (
                                    <div className="flex items-center gap-2">
                                        <span className={cn("w-1.5 h-1.5 rounded-full",
                                            member.focusPriority === 'Critical' ? "bg-red-500" :
                                                member.focusPriority === 'High' ? "bg-orange-500" :
                                                    member.focusPriority === 'Medium' ? "bg-yellow-500" : "bg-green-500"
                                        )} />
                                        <span className="text-sm truncate max-w-[90%] font-medium" title={member.currentFocus}>
                                            {member.currentFocus}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-sm text-muted-foreground italic">No active tasks</span>
                                )}
                            </div>

                            <div className="w-[15%]">
                                <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-sm text-primary hover:underline">
                                    <Mail className="w-3.5 h-3.5" />
                                    <span className="truncate">{member.email}</span>
                                </a>
                            </div>
                        </div>
                    ))}

                    {/* Add Member Row */}
                    <div className="flex items-center px-4 py-3 border-t border-dashed border-border/50 hover:bg-accent/10 transition-colors cursor-pointer group">
                        <div className="w-full flex items-center gap-2 pl-4 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                            <Plus className="w-4 h-4" />
                            <span className="font-medium">Invite New Member</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
