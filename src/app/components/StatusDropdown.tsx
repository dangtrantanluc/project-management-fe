import React, { useState, useRef, useEffect } from 'react';
import { Status } from '../types';
import { cn } from './ui/utils';
import { ChevronDown } from 'lucide-react';

interface StatusDropdownProps {
    value: Status;
    onChange: (status: Status) => void;
}

const STATUS_CONFIG: Record<Status, { color: string; bgColor: string; borderColor: string }> = {
    'To Do': { color: 'text-gray-700', bgColor: 'bg-gray-100', borderColor: 'border-gray-200' },
    'In Process': { color: 'text-blue-700', bgColor: 'bg-blue-100', borderColor: 'border-blue-200' },
    'Done': { color: 'text-green-700', bgColor: 'bg-green-100', borderColor: 'border-green-200' },
    'Review': { color: 'text-amber-700', bgColor: 'bg-amber-100', borderColor: 'border-amber-200' },
};

const STATUSES: Status[] = ['To Do', 'In Process', 'Review', 'Done'];

export function StatusDropdown({ value, onChange }: StatusDropdownProps) {
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

    const config = STATUS_CONFIG[value];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-bold border transition-all hover:shadow-sm flex items-center gap-1.5",
                    config.color,
                    config.bgColor,
                    config.borderColor
                )}
            >
                <span>{value}</span>
                <ChevronDown className="w-3 h-3" />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50 min-w-[140px]">
                    {STATUSES.map((status) => {
                        const statusConfig = STATUS_CONFIG[status];
                        return (
                            <button
                                key={status}
                                onClick={() => {
                                    onChange(status);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "w-full px-3 py-2 text-left text-sm font-medium hover:bg-accent transition-colors flex items-center gap-2",
                                    value === status && "bg-accent/50"
                                )}
                            >
                                <span className={cn("w-2 h-2 rounded-full", statusConfig.bgColor, statusConfig.borderColor, "border")} />
                                <span>{status}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
