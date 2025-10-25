'use client';

import { useState, useEffect } from 'react';
import { User, Key, Bell, Shield, Save, RefreshCw, Copy, Trash2 } from 'lucide-react';

interface SettingsData {
  email: string;
  api_key: string | null;
  notifications_enabled: boolean;
  email_on_new_call: boolean;
  email_on_payment: boolean;
  auto_withdraw_threshold: number | null;
}

export default function Settings() {
  const [settings, setSettings] = useState<SettingsData>({
    email: '',
    api_key: null,
    notifications_enabled: true,
    email_on_new_call: true,
    email_on_payment: true,
    auto_withdraw_threshold: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generatingKey, setGeneratingKey] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const [userRes, settingsRes] = await Promise.all([
        fetch('/api/dashboard'),
        fetch('/api/seller/settings'),
      ]);

      const userData = await userRes.json();
      const settingsData = await settingsRes.json();

      setSettings({
        email: userData.email || '',
        api_key: settingsData.api_key || null,
        notifications_enabled: settingsData.notifications_enabled ?? true,
        email_on_new_call: settingsData.email_on_new_call ?? true,
        email_on_payment: settingsData.email_on_payment ?? true,
        auto_withdraw_threshold: settingsData.auto_withdraw_threshold || null,
      });
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/seller/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notifications_enabled: settings.notifications_enabled,
          email_on_new_call: settings.email_on_new_call,
          email_on_payment: settings.email_on_payment,
          auto_withdraw_threshold: settings.auto_withdraw_threshold,
        }),
      });

      if (response.ok) {
        alert('Settings saved successfully!');
      } else {
        alert('Failed to save settings');
      }
    } catch (error) {
      console.error('Save settings error:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const generateAPIKey = async () => {
    const confirmed = window.confirm(
      'Generate a new API key? Your old key will be invalidated.'
    );

    if (!confirmed) return;

    setGeneratingKey(true);
    try {
      const response = await fetch('/api/seller/settings/api-key', {
        method: 'POST',
      });

      const data = await response.json();
      
      if (data.api_key) {
        setSettings({ ...settings, api_key: data.api_key });
        alert('New API key generated! Make sure to copy it now.');
      }
    } catch (error) {
      console.error('Generate API key error:', error);
      alert('Failed to generate API key');
    } finally {
      setGeneratingKey(false);
    }
  };

  const revokeAPIKey = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to revoke your API key? This cannot be undone.'
    );

    if (!confirmed) return;

    try {
      const response = await fetch('/api/seller/settings/api-key', {
        method: 'DELETE',
      });

      if (response.ok) {
        setSettings({ ...settings, api_key: null });
        alert('API key revoked successfully');
      }
    } catch (error) {
      console.error('Revoke API key error:', error);
      alert('Failed to revoke API key');
    }
  };

  const copyAPIKey = () => {
    if (settings.api_key) {
      navigator.clipboard.writeText(settings.api_key);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
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
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account preferences and API access</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <User className="text-blue-400" size={24} />
          Profile Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={settings.email}
              disabled
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-2">Email cannot be changed</p>
          </div>
        </div>
      </div>

      {/* API Key Section */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Key className="text-purple-400" size={24} />
          API Key Management
        </h3>
        
        {settings.api_key ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Your API Key</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={settings.api_key}
                  readOnly
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-sm"
                />
                <button
                  onClick={copyAPIKey}
                  className="px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-xl text-blue-400 transition-all"
                >
                  <Copy size={20} />
                </button>
              </div>
              {copySuccess && (
                <p className="text-green-400 text-sm mt-2">✓ Copied to clipboard!</p>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={generateAPIKey}
                disabled={generatingKey}
                className="flex items-center gap-2 px-4 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-xl text-purple-400 font-semibold transition-all disabled:opacity-50"
              >
                <RefreshCw size={20} className={generatingKey ? 'animate-spin' : ''} />
                Regenerate Key
              </button>
              <button
                onClick={revokeAPIKey}
                className="flex items-center gap-2 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-xl text-red-400 font-semibold transition-all"
              >
                <Trash2 size={20} />
                Revoke Key
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-400">No API key generated yet. Generate one to authenticate API requests.</p>
            <button
              onClick={generateAPIKey}
              disabled={generatingKey}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
            >
              <Key size={20} />
              {generatingKey ? 'Generating...' : 'Generate API Key'}
            </button>
          </div>
        )}
      </div>

      {/* Notifications Section */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Bell className="text-yellow-400" size={24} />
          Notification Preferences
        </h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
            <div>
              <p className="text-white font-medium">Enable Notifications</p>
              <p className="text-gray-400 text-sm">Receive all notification types</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications_enabled}
              onChange={(e) => setSettings({ ...settings, notifications_enabled: e.target.checked })}
              className="w-5 h-5 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
            <div>
              <p className="text-white font-medium">Email on New API Call</p>
              <p className="text-gray-400 text-sm">Get notified when your model is called</p>
            </div>
            <input
              type="checkbox"
              checked={settings.email_on_new_call}
              onChange={(e) => setSettings({ ...settings, email_on_new_call: e.target.checked })}
              disabled={!settings.notifications_enabled}
              className="w-5 h-5 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
            <div>
              <p className="text-white font-medium">Email on Payment Received</p>
              <p className="text-gray-400 text-sm">Get notified when you receive payments</p>
            </div>
            <input
              type="checkbox"
              checked={settings.email_on_payment}
              onChange={(e) => setSettings({ ...settings, email_on_payment: e.target.checked })}
              disabled={!settings.notifications_enabled}
              className="w-5 h-5 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
          </label>
        </div>
      </div>

      {/* Auto-Withdraw Section */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Shield className="text-green-400" size={24} />
          Auto-Withdraw Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Auto-Withdraw Threshold (MONAD)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={settings.auto_withdraw_threshold || ''}
              onChange={(e) => setSettings({ ...settings, auto_withdraw_threshold: parseFloat(e.target.value) || null })}
              placeholder="e.g., 100"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
            />
            <p className="text-xs text-gray-400 mt-2">
              Automatically withdraw funds when balance reaches this amount. Leave empty to disable.
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={20} />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/10 backdrop-blur-xl rounded-2xl p-6 border border-red-500/30">
        <h3 className="text-xl font-bold text-white mb-4">Danger Zone</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Delete Account</p>
              <p className="text-gray-400 text-sm">Permanently delete your account and all data</p>
            </div>
            <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-red-400 font-semibold transition-all">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
