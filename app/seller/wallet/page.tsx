'use client';

import { useState, useEffect, useRef } from 'react';
import { Wallet as WalletIcon, Copy, Download, Eye, EyeOff, AlertTriangle, ArrowUpRight, RefreshCw } from 'lucide-react';
import QRCode from 'qrcode';

interface WalletData {
  address: string;
  balance: string;
  encrypted_private_key: string;
}

export default function Wallet() {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [privateKey, setPrivateKey] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<string>('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawing, setWithdrawing] = useState(false);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    fetchWalletData();
  }, []);

  useEffect(() => {
    if (walletData?.address && qrCanvasRef.current) {
      QRCode.toCanvas(qrCanvasRef.current, walletData.address, {
        width: 200,
        margin: 2,
        color: {
          dark: '#ffffff',
          light: '#00000000',
        },
      });
    }
  }, [walletData]);

  const fetchWalletData = async () => {
    try {
      const response = await fetch('/api/dashboard');
      const data = await response.json();
      
      if (data.wallet_address) {
        setWalletData({
          address: data.wallet_address,
          balance: data.balance || '0.00',
          encrypted_private_key: 'encrypted',
        });
      }
    } catch (error) {
      console.error('Failed to fetch wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(label);
    setTimeout(() => setCopySuccess(''), 2000);
  };

  const downloadQR = () => {
    if (qrCanvasRef.current) {
      const url = qrCanvasRef.current.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'wallet-qr-code.png';
      a.click();
    }
  };

  const handleRevealPrivateKey = async () => {
    if (showPrivateKey) {
      setShowPrivateKey(false);
      setPrivateKey('');
      return;
    }

    const confirmed = window.confirm(
      '⚠️ WARNING: Your private key gives FULL access to your wallet. Never share it with anyone!\n\nAre you sure you want to reveal it?'
    );

    if (confirmed) {
      try {
        // TODO: Implement API endpoint to decrypt and return private key
        // const response = await fetch('/api/seller/wallet/private-key');
        // const data = await response.json();
        // setPrivateKey(data.privateKey);
        
        setPrivateKey('0x1234...abcd (Decryption not implemented)');
        setShowPrivateKey(true);
      } catch (error) {
        console.error('Failed to reveal private key:', error);
        alert('Failed to retrieve private key');
      }
    }
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawing(true);

    try {
      // TODO: Implement withdrawal API
      // const response = await fetch('/api/seller/wallet/withdraw', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ amount: withdrawAmount, address: withdrawAddress }),
      // });

      alert(`Withdrawal of ${withdrawAmount} MONAD to ${withdrawAddress} initiated!`);
      setWithdrawAmount('');
      setWithdrawAddress('');
    } catch (error) {
      console.error('Withdrawal failed:', error);
      alert('Failed to process withdrawal');
    } finally {
      setWithdrawing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!walletData) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Wallet Management</h1>
        <p className="text-gray-400">Manage your crypto wallet and withdraw funds</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <WalletIcon className="text-white" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Balance</p>
              <h2 className="text-4xl font-bold text-white">{walletData.balance} MONAD</h2>
            </div>
          </div>
          <button
            onClick={fetchWalletData}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <RefreshCw size={20} />
          </button>
        </div>
        <p className="text-gray-300 text-sm">≈ ${(parseFloat(walletData.balance) * 1.23).toFixed(2)} USD</p>
      </div>

      {/* Wallet Address & QR Code */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Wallet Address</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 break-all font-mono text-sm text-white">
              {walletData.address}
            </div>
            <button
              onClick={() => copyToClipboard(walletData.address, 'address')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-xl text-blue-400 font-semibold transition-all"
            >
              <Copy size={18} />
              {copySuccess === 'address' ? 'Copied!' : 'Copy Address'}
            </button>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">QR Code</h3>
          <div className="flex flex-col items-center">
            <div className="p-4 bg-white rounded-xl mb-4">
              <canvas ref={qrCanvasRef} />
            </div>
            <button
              onClick={downloadQR}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all"
            >
              <Download size={18} />
              Download QR
            </button>
          </div>
        </div>
      </div>

      {/* Withdraw Funds */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <ArrowUpRight className="text-green-400" size={24} />
          Withdraw Funds
        </h3>
        <form onSubmit={handleWithdraw} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-semibold text-gray-300 mb-2">
              Amount (MONAD)
            </label>
            <input
              type="number"
              id="amount"
              step="0.000001"
              min="0"
              max={walletData.balance}
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
              required
            />
            <p className="text-xs text-gray-400 mt-2">Available: {walletData.balance} MONAD</p>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-semibold text-gray-300 mb-2">
              Destination Address
            </label>
            <input
              type="text"
              id="address"
              value={withdrawAddress}
              onChange={(e) => setWithdrawAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all font-mono text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={withdrawing || !withdrawAmount || !withdrawAddress}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {withdrawing ? 'Processing...' : 'Withdraw Funds'}
          </button>
        </form>
      </div>

      {/* Private Key Section */}
      <div className="bg-red-500/10 backdrop-blur-xl rounded-2xl p-6 border border-red-500/30">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="text-red-400 flex-shrink-0" size={24} />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Private Key</h3>
            <p className="text-gray-300 text-sm mb-4">
              Your private key gives complete control over your wallet. Never share it with anyone!
            </p>
          </div>
        </div>

        {showPrivateKey && (
          <div className="mb-4 p-4 bg-black/30 rounded-xl border border-red-500/50">
            <p className="text-red-300 font-mono text-sm break-all">{privateKey}</p>
            <button
              onClick={() => copyToClipboard(privateKey, 'privateKey')}
              className="mt-3 flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-red-400 text-sm transition-all"
            >
              <Copy size={16} />
              {copySuccess === 'privateKey' ? 'Copied!' : 'Copy Private Key'}
            </button>
          </div>
        )}

        <button
          onClick={handleRevealPrivateKey}
          className="flex items-center gap-2 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-xl text-red-400 font-semibold transition-all"
        >
          {showPrivateKey ? <EyeOff size={20} /> : <Eye size={20} />}
          {showPrivateKey ? 'Hide Private Key' : 'Reveal Private Key'}
        </button>
      </div>

      {/* Recent Transactions (placeholder) */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Recent Wallet Activity</h3>
        <div className="text-center py-8 text-gray-400">
          <WalletIcon className="mx-auto mb-3 opacity-50" size={48} />
          <p>No recent wallet transactions</p>
        </div>
      </div>
    </div>
  );
}
