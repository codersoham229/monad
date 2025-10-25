'use client';

import { useState, useEffect } from 'react';
import { DollarSign, Activity, Brain, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardStats {
  totalEarnings: string;
  modelCalls: number;
  activeModels: number;
  pendingTransactions: number;
  earningsChange: number;
  callsChange: number;
}

export default function SellerDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEarnings: '0.00',
    modelCalls: 0,
    activeModels: 0,
    pendingTransactions: 0,
    earningsChange: 0,
    callsChange: 0,
  });
  const [loading, setLoading] = useState(true);

  // Mock chart data - will be replaced with real data from API
  const earningsData = [
    { date: 'Mon', amount: 12.5 },
    { date: 'Tue', amount: 18.3 },
    { date: 'Wed', amount: 15.7 },
    { date: 'Thu', amount: 22.1 },
    { date: 'Fri', amount: 28.4 },
    { date: 'Sat', amount: 24.8 },
    { date: 'Sun', amount: 31.2 },
  ];

  const callsData = [
    { date: 'Mon', calls: 142 },
    { date: 'Tue', calls: 189 },
    { date: 'Wed', calls: 156 },
    { date: 'Thu', calls: 234 },
    { date: 'Fri', calls: 298 },
    { date: 'Sat', calls: 267 },
    { date: 'Sun', calls: 321 },
  ];

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/seller/dashboard');
      const data = await response.json();
      
      if (data.stats) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Earnings',
      value: `$${stats.totalEarnings}`,
      change: stats.earningsChange,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400',
    },
    {
      title: 'Model Calls',
      value: stats.modelCalls.toLocaleString(),
      change: stats.callsChange,
      icon: Activity,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400',
    },
    {
      title: 'Active Models',
      value: stats.activeModels.toString(),
      change: 0,
      icon: Brain,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-400',
    },
    {
      title: 'Pending Transactions',
      value: stats.pendingTransactions.toString(),
      change: 0,
      icon: Clock,
      color: 'from-orange-500 to-amber-600',
      bgColor: 'bg-orange-500/10',
      textColor: 'text-orange-400',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back! Here's your performance summary.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          const isPositive = card.change >= 0;
          
          return (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center`}>
                  <Icon className={card.textColor} size={24} />
                </div>
                {card.change !== 0 && (
                  <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span>{Math.abs(card.change)}%</span>
                  </div>
                )}
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-white">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href="/seller/add-model"
          className="group bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Brain className="text-blue-400" size={24} />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Add New Model</h3>
              <p className="text-gray-400 text-sm">Upload your AI model</p>
            </div>
          </div>
        </a>

        <a
          href="/seller/analytics"
          className="group bg-gradient-to-br from-green-500/10 to-emerald-600/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-green-500/50 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="text-green-400" size={24} />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">View Analytics</h3>
              <p className="text-gray-400 text-sm">Detailed insights</p>
            </div>
          </div>
        </a>

        <a
          href="/seller/wallet"
          className="group bg-gradient-to-br from-purple-500/10 to-pink-600/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign className="text-purple-400" size={24} />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Withdraw Funds</h3>
              <p className="text-gray-400 text-sm">Manage your wallet</p>
            </div>
          </div>
        </a>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Chart */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Earnings This Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Calls Chart */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">API Calls This Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={callsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
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

      {/* Recent Activity */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Model call completed', model: 'GPT-4 Alternative', amount: '$0.003', time: '2 min ago' },
            { action: 'New transaction', model: 'Image Generator Pro', amount: '$0.005', time: '15 min ago' },
            { action: 'Model call completed', model: 'Sentiment Analyzer', amount: '$0.001', time: '1 hour ago' },
            { action: 'Withdrawal processed', model: 'To wallet', amount: '$50.00', time: '3 hours ago' },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Activity className="text-blue-400" size={18} />
                </div>
                <div>
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">{activity.model}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-semibold">{activity.amount}</p>
                <p className="text-gray-500 text-sm">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
