'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface DashboardData {
  email: string;
  role: 'buyer' | 'seller';
  wallet_address: string;
  balance: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard');
      
      if (!response.ok) {
        router.push('/login');
        return;
      }

      const dashboardData = await response.json();
      
      // Redirect sellers to seller dashboard
      if (dashboardData.role === 'seller') {
        router.push('/seller');
        return;
      }
      
      setData(dashboardData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-purple-600 mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-20 animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-20 animate-[float_10s_ease-in-out_infinite_2s]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/10 backdrop-blur-md bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-xl">AI</span>
            </div>
            <span className="text-2xl font-bold gradient-text">AIMM</span>
          </Link>
          
          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-all"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Welcome, <span className="gradient-text">{data.role === 'buyer' ? 'Buyer' : 'Seller'}</span>!
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            {data.email}
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Wallet Info Card */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Wallet</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 block mb-2">
                  Wallet Address
                </label>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm break-all text-slate-900 dark:text-white">
                  {data.wallet_address}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 block mb-2">
                  Balance
                </label>
                <div className="text-4xl font-black gradient-text">
                  {data.balance} MONAD
                </div>
              </div>
            </div>
          </div>

          {/* Role Info Card */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                {data.role === 'buyer' ? (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                )}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Account Type</h2>
            </div>
            
            <div className="space-y-4">
              <div className="text-3xl font-bold text-slate-900 dark:text-white capitalize">
                {data.role}
              </div>
              
              <p className="text-slate-600 dark:text-slate-300">
                {data.role === 'buyer' 
                  ? 'You can use AI models and pay per inference with your wallet.'
                  : 'You can upload AI models and earn automatically when users access them.'
                }
              </p>
              
              <div className="pt-4">
                <button className="w-full py-3 rounded-full gradient-bg text-white font-bold btn-premium hover:scale-105 transition-all">
                  {data.role === 'buyer' ? 'Explore Models' : 'Upload Model'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl p-8 text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold">Your Account is Ready!</h3>
            </div>
            <p className="text-lg opacity-90 mb-4">
              Your crypto wallet has been generated and is ready for transactions on the Monad blockchain.
            </p>
            <p className="text-sm opacity-75">
              Dashboard features coming soon...
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
