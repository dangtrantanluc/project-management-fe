import React, { useState, useRef, useEffect } from 'react';
import { Priority } from '../types';
import { cn } from './ui/utils';
import { ChevronDown } from 'lucide-react';

interface PriorityDropdownProps {
    value: Priority;
    onChange: (priority: Priority) => void;
}

const PRIORITY_CONFIG: Record<Priority, { color: string; icon: string }> = {
    'Low': { color: 'text-green-600', icon: '↓' },
    'Medium': { color: 'text-yellow-600', icon: '→' },
    'High': { color: 'text-orange-600', icon: '↑' },
    'Critical': { color: 'text-red-600', icon: '⚠' },
};

const PRIORITIES: Priority[] = ['Low', 'Medium', 'High', 'Critical'];

export function PriorityDropdown({ value, onChange }: PriorityDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const config = PRIORITY_CONFIG[value];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "px-2 py-1 rounded hover:bg-accent/50 transition-colors flex items-center gap-1.5 text-sm font-medium",
                    config.color
                )}
            >
                <span className="text-base">{config.icon}</span>
                <span>{value}</span>
                <ChevronDown className="w-3 h-3" />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50 min-w-[130px]">
                    {PRIORITIES.map((priority) => {
                        const priorityConfig = PRIORITY_CONFIG[priority];
                        return (
                            <button
                                key={priority}
                                onClick={() => {
                                    onChange(priority);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "w-full px-3 py-2 text-left text-sm font-medium hover:bg-accent transition-colors flex items-center gap-2",
                                    value === priority && "bg-accent/50",
                                    priorityConfig.color
                                )}
                            >
                                <span className="text-base">{priorityConfig.icon}</span>
                                <span>{priority}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
