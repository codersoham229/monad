'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Brain, 
  Plus, 
  TrendingUp, 
  Receipt, 
  Wallet, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Fetch user data
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUserEmail(data.user.email);
          // Check if user is seller
          if (data.user.role !== 'seller') {
            router.push('/dashboard');
          }
        }
      })
      .catch(() => router.push('/login'));
  }, [router]);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/seller' },
    { icon: Brain, label: 'My Models', href: '/seller/models' },
    { icon: Plus, label: 'Add Model', href: '/seller/add-model' },
    { icon: TrendingUp, label: 'Analytics', href: '/seller/analytics' },
    { icon: Receipt, label: 'Transactions', href: '/seller/transactions' },
    { icon: Wallet, label: 'Wallet', href: '/seller/wallet' },
    { icon: Settings, label: 'Settings', href: '/seller/settings' },
  ];

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 text-white"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white/5 backdrop-blur-xl border-r border-white/10 transition-all duration-300 z-40 ${
          sidebarOpen ? 'w-64' : 'w-0 lg:w-20'
        } overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Brain className="text-white" size={24} />
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="text-xl font-bold text-white">AIMM</h1>
                  <p className="text-xs text-gray-400">Seller Portal</p>
                </div>
              )}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border border-white/20'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-white/10">
            {sidebarOpen ? (
              <div className="space-y-3">
                <div className="px-4 py-3 bg-white/5 rounded-xl">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="text-sm text-white font-medium truncate">{userEmail}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full flex justify-center p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut size={20} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
