'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Activity, Calendar, Download, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface AnalyticsData {
  dailyEarnings: { date: string; amount: number }[];
  monthlyCalls: { month: string; calls: number }[];
  topModels: { name: string; earnings: number; calls: number }[];
  revenueByCategory: { category: string; value: number }[];
  totalEarnings: number;
  totalCalls: number;
  averagePrice: number;
  growthRate: number;
}

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData | null>(null);

  // Mock data - will be replaced with real API data
  const mockData: AnalyticsData = {
    dailyEarnings: [
      { date: '2025-10-18', amount: 45.20 },
      { date: '2025-10-19', amount: 52.80 },
      { date: '2025-10-20', amount: 48.50 },
      { date: '2025-10-21', amount: 67.30 },
      { date: '2025-10-22', amount: 71.90 },
      { date: '2025-10-23', amount: 63.40 },
      { date: '2025-10-24', amount: 78.60 },
      { date: '2025-10-25', amount: 85.20 },
    ],
    monthlyCalls: [
      { month: 'Apr', calls: 2340 },
      { month: 'May', calls: 3120 },
      { month: 'Jun', calls: 2890 },
      { month: 'Jul', calls: 4200 },
      { month: 'Aug', calls: 4850 },
      { month: 'Sep', calls: 5320 },
      { month: 'Oct', calls: 6100 },
    ],
    topModels: [
      { name: 'GPT-4 Alternative', earnings: 234.50, calls: 1250 },
      { name: 'Image Generator Pro', earnings: 189.30, calls: 980 },
      { name: 'Sentiment Analyzer', earnings: 156.70, calls: 2340 },
      { name: 'Code Assistant', earnings: 142.90, calls: 760 },
      { name: 'Translation Model', earnings: 98.40, calls: 540 },
    ],
    revenueByCategory: [
      { category: 'NLP', value: 45 },
      { category: 'Vision', value: 28 },
      { category: 'Data Analysis', value: 15 },
      { category: 'Generation', value: 12 },
    ],
    totalEarnings: 1245.80,
    totalCalls: 8760,
    averagePrice: 0.142,
    growthRate: 23.5,
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      // TODO: Replace with real API call
      // const response = await fetch(`/api/seller/analytics?range=${timeRange}`);
      // const analyticsData = await response.json();
      // setData(analyticsData);
      
      setTimeout(() => {
        setData(mockData);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      setLoading(false);
    }
  };

  const exportData = (format: 'csv' | 'json') => {
    if (!data) return;
    
    if (format === 'csv') {
      const csv = [
        ['Date', 'Earnings', 'Calls'],
        ...data.dailyEarnings.map(d => [d.date, d.amount, '']),
      ].map(row => row.join(',')).join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-${timeRange}.csv`;
      a.click();
    } else {
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-${timeRange}.json`;
      a.click();
    }
  };

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Earnings & Analytics</h1>
          <p className="text-gray-400">Track your performance and revenue metrics</p>
        </div>
        
        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          
          <button
            onClick={() => exportData('csv')}
            className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all"
          >
            <Download size={20} />
            <span className="hidden md:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <DollarSign className="text-green-400" size={24} />
            </div>
            <div className="flex items-center gap-1 text-sm text-green-400">
              <ArrowUp size={16} />
              <span>{data.growthRate}%</span>
            </div>
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">Total Earnings</h3>
          <p className="text-3xl font-bold text-white">${data.totalEarnings.toFixed(2)}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Activity className="text-blue-400" size={24} />
            </div>
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">Total Calls</h3>
          <p className="text-3xl font-bold text-white">{data.totalCalls.toLocaleString()}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <TrendingUp className="text-purple-400" size={24} />
            </div>
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">Avg Price/Call</h3>
          <p className="text-3xl font-bold text-white">${data.averagePrice.toFixed(3)}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Calendar className="text-orange-400" size={24} />
            </div>
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">Active Days</h3>
          <p className="text-3xl font-bold text-white">{data.dailyEarnings.length}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Trend */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Daily Earnings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.dailyEarnings}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                }}
                formatter={(value: any) => [`$${value.toFixed(2)}`, 'Earnings']}
              />
              <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Calls */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Monthly API Calls</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.monthlyCalls}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="calls" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Models & Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Models */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Top Performing Models</h3>
          <div className="space-y-4">
            {data.topModels.map((model, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{model.name}</p>
                    <p className="text-gray-400 text-sm">{model.calls.toLocaleString()} calls</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-bold">${model.earnings.toFixed(2)}</p>
                  <p className="text-gray-400 text-sm">${(model.earnings / model.calls).toFixed(3)}/call</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Category */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Revenue by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.revenueByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, value }) => `${category} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.revenueByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {data.revenueByCategory.map((cat, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-gray-400">{cat.category}</span>
                </div>
                <span className="text-white font-semibold">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
