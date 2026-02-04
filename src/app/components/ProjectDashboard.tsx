import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { cn } from './ui/utils';

const taskData = [
  { name: 'Mon', completed: 12, added: 18 },
  { name: 'Tue', completed: 19, added: 15 },
  { name: 'Wed', completed: 15, added: 12 },
  { name: 'Thu', completed: 22, added: 20 },
  { name: 'Fri', completed: 30, added: 25 },
  { name: 'Sat', completed: 10, added: 8 },
  { name: 'Sun', completed: 8, added: 5 },
];

const priorityData = [
  { name: 'High', value: 400, color: '#ef4444' },
  { name: 'Medium', value: 300, color: '#f59e0b' },
  { name: 'Low', value: 300, color: '#10b981' },
];

const StatCard = ({ title, value, change, trend, icon: Icon }: any) => (
  <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-primary/5 rounded-lg">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className={cn(
        "flex items-center text-xs font-bold px-2 py-1 rounded-full",
        trend === 'up' ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
      )}>
        {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
        {change}
      </div>
    </div>
    <h4 className="text-muted-foreground text-sm font-medium mb-1">{title}</h4>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export const ProjectDashboard = () => {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Projects" value="12" change="+2.5%" trend="up" icon={Users} />
        <StatCard title="Tasks Completed" value="1,284" change="+12%" trend="up" icon={CheckCircle2} />
        <StatCard title="Time Tracked" value="248h" change="-4.3%" trend="down" icon={Clock} />
        <StatCard title="Pending Issues" value="18" change="+3" trend="down" icon={AlertCircle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold">Task Throughput</h3>
              <p className="text-sm text-muted-foreground">Daily task completion vs new tasks</p>
            </div>
            <select className="bg-input-background border-none rounded-lg text-xs font-medium px-3 py-1.5 focus:ring-1 focus:ring-primary/20">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={taskData}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#030213" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#030213" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#717182'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#717182'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="completed" stroke="#030213" strokeWidth={2} fillOpacity={1} fill="url(#colorCompleted)" />
                <Area type="monotone" dataKey="added" stroke="#717182" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="text-lg font-bold mb-8">Priority Breakdown</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-2xl font-bold">1,000</p>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Total</p>
            </div>
          </div>
          <div className="space-y-3 mt-4">
            {priorityData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <span className="text-sm text-muted-foreground font-bold">{Math.round((item.value/1000)*100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="text-lg font-bold mb-4">Upcoming Deadlines</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-accent/20 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Q1 Financial Audit</p>
                    <p className="text-xs text-muted-foreground">Internal Review</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-red-600">Tomorrow</p>
                  <p className="text-[10px] text-muted-foreground font-medium">Due Feb 4, 2026</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="text-lg font-bold mb-4">Team Performance</h3>
          <div className="space-y-4">
            {[
              { name: 'Alex Rivera', role: 'PM', progress: 85, avatar: 'https://images.unsplash.com/photo-1701463387028-3947648f1337' },
              { name: 'Sarah Chen', role: 'Designer', progress: 92, avatar: 'https://images.unsplash.com/photo-1675186914580-94356f7c012c' },
              { name: 'Marcus Miller', role: 'Dev', progress: 78, avatar: 'https://images.unsplash.com/photo-1704655295066-681e61ecca6b' },
            ].map((member) => (
              <div key={member.name} className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <ImageWithFallback src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-semibold">{member.name}</p>
                    <p className="text-xs font-bold text-primary">{member.progress}%</p>
                  </div>
                  <div className="w-full h-1.5 bg-accent rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${member.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
