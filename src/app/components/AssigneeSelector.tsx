import React, { useState, useRef, useEffect } from 'react';
import { Assignee, SAMPLE_ASSIGNEES } from '../types';
import { cn } from './ui/utils';
import { ChevronDown, User } from 'lucide-react';

interface AssigneeSelectorProps {
    value: Assignee | null;
    onChange: (assignee: Assignee | null) => void;
}

export function AssigneeSelector({ value, onChange }: AssigneeSelectorProps) {
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

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-accent/50 transition-colors"
            >
                {value ? (
                    <>
                        <div className="w-7 h-7 rounded-full border-2 border-background overflow-hidden bg-accent flex-shrink-0">
                            {value.avatar ? (
                                <img src={value.avatar} alt={value.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary/10">
                                    <User className="w-4 h-4 text-primary" />
                                </div>
                            )}
                        </div>
                        <span className="text-sm font-medium">{value.name}</span>
                    </>
                ) : (
                    <>
                        <div className="w-7 h-7 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                            <User className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="text-sm text-muted-foreground">Unassigned</span>
                    </>
                )}
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50 min-w-[200px]">
                    <button
                        onClick={() => {
                            onChange(null);
                            setIsOpen(false);
                        }}
                        className={cn(
                            "w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center gap-2",
                            !value && "bg-accent/50"
                        )}
                    >
                        <div className="w-7 h-7 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                            <User className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="text-muted-foreground">Unassigned</span>
                    </button>

                    <div className="border-t border-border" />

                    {SAMPLE_ASSIGNEES.map((assignee) => (
                        <button
                            key={assignee.id}
                            onClick={() => {
                                onChange(assignee);
                                setIsOpen(false);
                            }}
                            className={cn(
                                "w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center gap-2",
                                value?.id === assignee.id && "bg-accent/50"
                            )}
                        >
                            <div className="w-7 h-7 rounded-full border-2 border-background overflow-hidden bg-accent">
                                {assignee.avatar ? (
                                    <img src={assignee.avatar} alt={assignee.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-primary/10">
                                        <User className="w-4 h-4 text-primary" />
                                    </div>
                                )}
                            </div>
                            <span className="font-medium">{assignee.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
