import React, { useState, useEffect } from 'react';
import { MOCK_CALENDAR_EVENTS, CalendarEvent, useProjectData } from '../hooks/useProjectData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from './ui/utils';

export function CalendarView() {
    const [currentDate, setCurrentDate] = useState(new Date('2026-02-01'));
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    useEffect(() => {
        // In a real app, we would fetch events for the current month here
        setEvents(MOCK_CALENDAR_EVENTS);
    }, [currentDate]);

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const paddingDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    const getEventsForDay = (day: number) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.filter(e => e.date === dateStr);
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const EVENT_COLORS = {
        meeting: 'bg-blue-100 text-blue-700 border-blue-200',
        deadline: 'bg-red-100 text-red-700 border-red-200',
        review: 'bg-amber-100 text-amber-700 border-amber-200',
    };

    return (
        <div className="flex flex-col h-full bg-background">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 className="text-xl font-bold">{monthName}</h2>
                <div className="flex items-center space-x-2">
                    <button onClick={prevMonth} className="p-2 hover:bg-accent rounded-lg">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1.5 text-sm font-medium border border-border rounded-lg hover:bg-accent">
                        Today
                    </button>
                    <button onClick={nextMonth} className="p-2 hover:bg-accent rounded-lg">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 border-b border-border bg-accent/20">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="py-2 text-center text-sm font-semibold text-muted-foreground uppercase">
                        {day}
                    </div>
                ))}
            </div>

            <div className="flex-1 grid grid-cols-7 grid-rows-5 lg:grid-rows-6">
                {paddingDays.map(i => (
                    <div key={`padding-${i}`} className="border-b border-r border-border bg-accent/5 p-2" />
                ))}

                {days.map(day => {
                    const dayEvents = getEventsForDay(day);
                    const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

                    return (
                        <div key={day} className={cn("border-b border-r border-border p-2 min-h-[100px] flex flex-col gap-1", isToday && "bg-primary/5")}>
                            <div className={cn("text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full mb-1", isToday ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>
                                {day}
                            </div>

                            {dayEvents.map(event => (
                                <div
                                    key={event.id}
                                    className={cn("px-2 py-1 rounded text-xs font-medium truncate border", EVENT_COLORS[event.type])}
                                    title={event.title}
                                >
                                    {event.title}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
