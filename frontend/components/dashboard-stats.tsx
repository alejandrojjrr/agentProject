"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, BarChart, LineChart, PieChart, 
  Area, Bar, Line, Pie, 
  ResponsiveContainer, 
  XAxis, YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell
} from 'recharts';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Users, 
  MessageSquare, 
  Clock, 
  Zap
} from "lucide-react";

const statsConfig = {
  queries: { value: 12543, change: 12.5, up: true },
  successRate: { value: 98.2, change: 2.1, up: true },
  responseTime: { value: 245, change: 18, up: false },
  activeAgents: { value: 8, change: 2, up: true }
};

const lineChartData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(2023, 4, i + 1).toISOString().split('T')[0],
  value: 3000 + Math.floor(Math.random() * 5000)
}));

const pieChartData = [
  { name: "Successfully Completed", value: 68, color: "#d08c60" },
  { name: "User Abandoned", value: 12, color: "#4b9b9c" },
  { name: "System Error", value: 8, color: "#2a4858" },
  { name: "Redirected to Human", value: 12, color: "#e3a857" },
];

export default function DashboardStats() {
  const [timeRange, setTimeRange] = useState("month");
  const [chartData, setChartData] = useState(lineChartData);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard 
          title="Total Queries" 
          value={statsConfig.queries.value.toLocaleString()} 
          change={statsConfig.queries.change} 
          up={statsConfig.queries.up}
          icon={<MessageSquare className="h-4 w-4" />}
        />
        <StatCard 
          title="Success Rate" 
          value={`${statsConfig.successRate.value}%`} 
          change={statsConfig.successRate.change} 
          up={statsConfig.successRate.up}
          icon={<Zap className="h-4 w-4" />}
        />
        <StatCard 
          title="Avg. Response Time" 
          value={`${statsConfig.responseTime.value}ms`} 
          change={statsConfig.responseTime.change} 
          up={!statsConfig.responseTime.up}
          inverse={true}
          icon={<Clock className="h-4 w-4" />}
        />
        <StatCard 
          title="Active Agents" 
          value={statsConfig.activeAgents.value} 
          change={statsConfig.activeAgents.change} 
          up={statsConfig.activeAgents.up}
          icon={<Users className="h-4 w-4" />}
        />
      </div>
      
      <Card className="border-slate-800 bg-slate-800/30 col-span-2">
        <CardContent className="p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-slate-200">Performance Analytics</h3>
            <Tabs defaultValue="month" onValueChange={setTimeRange} className="w-auto">
              <TabsList className="grid grid-cols-3 h-8 w-fit gap-px p-1 bg-slate-700/50">
                <TabsTrigger value="week" className="text-xs px-3">Week</TabsTrigger>
                <TabsTrigger value="month" className="text-xs px-3">Month</TabsTrigger>
                <TabsTrigger value="year" className="text-xs px-3">Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <p className="text-xs font-medium text-slate-400 mb-3">Daily Queries</p>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d08c60" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#d08c60" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      stroke="#64748b" 
                      tick={{ fill: '#94a3b8', fontSize: 12 }} 
                      tickFormatter={(value) => new Date(value).getDate().toString()}
                    />
                    <YAxis 
                      width={48} 
                      stroke="#64748b" 
                      tick={{ fill: '#94a3b8', fontSize: 12 }} 
                      tickFormatter={(value) => value.toLocaleString()}
                    />
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        borderColor: '#475569', 
                        borderRadius: '0.375rem',
                        color: '#e2e8f0'
                      }}
                      formatter={(value) => [value.toLocaleString(), 'Queries']}
                      labelFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        });
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#d08c60" 
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 mb-3">Outcome Distribution</p>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => `${value}%`}
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        borderColor: '#475569', 
                        borderRadius: '0.375rem',
                        color: '#e2e8f0'
                      }}
                    />
                    <Legend 
                      layout="vertical" 
                      verticalAlign="bottom" 
                      align="center"
                      wrapperStyle={{ fontSize: 12, color: '#94a3b8' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  up: boolean;
  icon: React.ReactNode;
  inverse?: boolean;
}

function StatCard({ title, value, change, up, icon, inverse = false }: StatCardProps) {
  return (
    <Card className="border-slate-800 bg-slate-800/30 overflow-hidden relative">
      <CardContent className="p-6">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-slate-700/50 p-1.5">
            {icon}
          </span>
          <span className="text-sm font-medium text-slate-400">{title}</span>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <div className="text-3xl font-bold">{value}</div>
          <div className={`flex items-center text-sm ${up ? (inverse ? 'text-red-400' : 'text-green-400') : (inverse ? 'text-green-400' : 'text-red-400')}`}>
            {up ? 
              <ArrowUpRight className="mr-1 h-3 w-3" /> : 
              <ArrowDownRight className="mr-1 h-3 w-3" />
            }
            {`${change}%`}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}