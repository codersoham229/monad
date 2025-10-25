'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Download, ExternalLink, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Transaction {
  id: string;
  model_name: string;
  buyer_email: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  transaction_hash: string | null;
  created_at: string;
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  // Mock data
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      model_name: 'GPT-4 Alternative',
      buyer_email: 'user1@example.com',
      amount: 0.003,
      status: 'completed',
      transaction_hash: '0x742d35cc6634c0532925a3b844bc9e7fbb3f5b5e0c8b7c38e8b4c6f7e1d9a3b2',
      created_at: '2025-10-25T10:30:00Z',
    },
    {
      id: '2',
      model_name: 'Image Generator Pro',
      buyer_email: 'user2@example.com',
      amount: 0.005,
      status: 'completed',
      transaction_hash: '0x8e5c2a1b3d4f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f',
      created_at: '2025-10-25T09:15:00Z',
    },
    {
      id: '3',
      model_name: 'Sentiment Analyzer',
      buyer_email: 'user3@example.com',
      amount: 0.001,
      status: 'pending',
      transaction_hash: null,
      created_at: '2025-10-25T08:45:00Z',
    },
    {
      id: '4',
      model_name: 'Code Assistant',
      buyer_email: 'user4@example.com',
      amount: 0.002,
      status: 'completed',
      transaction_hash: '0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2',
      created_at: '2025-10-24T16:20:00Z',
    },
    {
      id: '5',
      model_name: 'Translation Model',
      buyer_email: 'user5@example.com',
      amount: 0.0015,
      status: 'failed',
      transaction_hash: null,
      created_at: '2025-10-24T14:10:00Z',
    },
  ];

  useEffect(() => {
    fetchTransactions();
  }, [dateRange]);

  const fetchTransactions = async () => {
    try {
      // TODO: Replace with real API call
      // const response = await fetch(`/api/seller/transactions?range=${dateRange}`);
      // const data = await response.json();
      // setTransactions(data.transactions);
      
      setTimeout(() => {
        setTransactions(mockTransactions);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const csv = [
      ['ID', 'Model', 'Buyer', 'Amount', 'Status', 'Transaction Hash', 'Date'],
      ...filteredTransactions.map(tx => [
        tx.id,
        tx.model_name,
        tx.buyer_email,
        tx.amount,
        tx.status,
        tx.transaction_hash || 'N/A',
        new Date(tx.created_at).toLocaleString(),
      ]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${dateRange}.csv`;
    a.click();
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = 
      tx.model_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.buyer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.transaction_hash?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-400" size={18} />;
      case 'pending':
        return <Clock className="text-yellow-400" size={18} />;
      case 'failed':
        return <XCircle className="text-red-400" size={18} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Transactions</h1>
          <p className="text-gray-400">View all your model transactions and payments</p>
        </div>
        
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
        >
          <Download size={20} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by model, buyer, or transaction hash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-all"
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-all"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value as any)}
          className="px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-all"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* Transactions Table */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Model</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Buyer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Transaction</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No transactions found
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/5 transition-all">
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">{tx.model_name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400">{tx.buyer_email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-400 font-semibold">${tx.amount.toFixed(4)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(tx.status)}`}>
                        {getStatusIcon(tx.status)}
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {tx.transaction_hash ? (
                        <a
                          href={`https://explorer.monad.xyz/tx/${tx.transaction_hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <span className="font-mono text-sm">
                            {tx.transaction_hash.slice(0, 8)}...{tx.transaction_hash.slice(-6)}
                          </span>
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span className="text-gray-500 text-sm">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="text-white">{new Date(tx.created_at).toLocaleDateString()}</div>
                        <div className="text-gray-400">{new Date(tx.created_at).toLocaleTimeString()}</div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Total Transactions</h3>
          <p className="text-3xl font-bold text-white">{filteredTransactions.length}</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Completed</h3>
          <p className="text-3xl font-bold text-green-400">
            {filteredTransactions.filter(tx => tx.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Total Volume</h3>
          <p className="text-3xl font-bold text-white">
            ${filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0).toFixed(4)}
          </p>
        </div>
      </div>
    </div>
  );
}
