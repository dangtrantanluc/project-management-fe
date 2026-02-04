import React, { useState, useRef, useEffect } from 'react';
import { cn } from './ui/utils';

interface EditableCellProps {
    value: string | number;
    onSave: (value: string | number) => void;
    type?: 'text' | 'number' | 'date';
    className?: string;
}

export function EditableCell({ value, onSave, type = 'text', className }: EditableCellProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleSave = () => {
        if (editValue !== value) {
            onSave(editValue);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setEditValue(value);
            setIsEditing(false);
        }
    };

    const displayValue = type === 'number' && typeof value === 'number'
        ? `$${value.toLocaleString()}`
        : type === 'date' && value
            ? new Date(value as string).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : value || '—';

    if (isEditing) {
        return (
            <input
                ref={inputRef}
                type={type}
                value={editValue}
                onChange={(e) => setEditValue(type === 'number' ? Number(e.target.value) : e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className={cn(
                    "w-full px-2 py-1 text-sm border-2 border-primary rounded focus:outline-none bg-background",
                    className
                )}
            />
        );
    }

    return (
        <div
            onClick={() => setIsEditing(true)}
            className={cn(
                "cursor-pointer px-2 py-1 rounded hover:bg-accent/50 transition-colors min-h-[32px] flex items-center",
                className
            )}
        >
            <span className="text-sm">{displayValue}</span>
        </div>
    );
}
