import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from './ui/utils';
import { Status } from '../types';

interface GroupHeaderProps {
    status: Status;
    count: number;
    isExpanded: boolean;
    onToggle: () => void;
    colorClass: string;
    bgClass: string;
}

export function GroupHeader({ status, count, isExpanded, onToggle, colorClass, bgClass }: GroupHeaderProps) {
    return (
        <div
            className="flex items-center gap-2 py-3 px-4 cursor-pointer hover:bg-accent/50 transition-colors select-none group"
            onClick={onToggle}
        >
            <div className={cn("p-1 rounded-md transition-colors", bgClass)}>
                {isExpanded ? (
                    <ChevronDown className={cn("w-4 h-4", colorClass)} />
                ) : (
                    <ChevronRight className={cn("w-4 h-4", colorClass)} />
                )}
            </div>

            <div className={cn("px-2.5 py-0.5 rounded-full text-xs font-bold border", bgClass, colorClass.replace('text-', 'border-').replace('700', '200'))}>
                {status}
            </div>

            <span className="text-muted-foreground text-sm font-medium">{count} items</span>

            <div className="h-px flex-1 bg-border/50 ml-2 group-hover:bg-border transition-colors" />
        </div>
    );
}
