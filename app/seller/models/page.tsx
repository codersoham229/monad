'use client';

import { useState, useEffect } from 'react';
import { Brain, Edit, Trash2, Eye, EyeOff, Search, Plus } from 'lucide-react';
import Link from 'next/link';

interface Model {
  id: string;
  name: string;
  description: string;
  category: string;
  price_per_call: string;
  visibility: 'public' | 'private';
  status: 'active' | 'inactive' | 'pending';
  total_calls: number;
  total_earnings: string;
  created_at: string;
}

export default function MyModels() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; modelId: string | null }>({
    show: false,
    modelId: null,
  });

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await fetch('/api/seller/models');
      const data = await response.json();
      
      if (data.models) {
        setModels(data.models);
      }
    } catch (error) {
      console.error('Failed to fetch models:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (modelId: string) => {
    try {
      const response = await fetch(`/api/seller/models/${modelId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setModels(models.filter(m => m.id !== modelId));
        setDeleteModal({ show: false, modelId: null });
      }
    } catch (error) {
      console.error('Failed to delete model:', error);
    }
  };

  const handleToggleVisibility = async (modelId: string, currentVisibility: string) => {
    try {
      const newVisibility = currentVisibility === 'public' ? 'private' : 'public';
      const response = await fetch(`/api/seller/models/${modelId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visibility: newVisibility }),
      });

      if (response.ok) {
        setModels(models.map(m => 
          m.id === modelId ? { ...m, visibility: newVisibility as 'public' | 'private' } : m
        ));
      }
    } catch (error) {
      console.error('Failed to update visibility:', error);
    }
  };

  const handleToggleStatus = async (modelId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const response = await fetch(`/api/seller/models/${modelId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setModels(models.map(m => 
          m.id === modelId ? { ...m, status: newStatus as 'active' | 'inactive' } : m
        ));
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         model.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || model.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'inactive': return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
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
          <h1 className="text-3xl font-bold text-white mb-2">My Models</h1>
          <p className="text-gray-400">Manage your AI models and track their performance</p>
        </div>
        <Link
          href="/seller/add-model"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
        >
          <Plus size={20} />
          Add New Model
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-all"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-all"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Models Grid */}
      {filteredModels.length === 0 ? (
        <div className="text-center py-16 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
          <Brain className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-xl font-semibold text-white mb-2">No models found</h3>
          <p className="text-gray-400 mb-6">
            {searchQuery || filterStatus !== 'all' 
              ? 'Try adjusting your filters' 
              : 'Start by adding your first AI model'}
          </p>
          {!searchQuery && filterStatus === 'all' && (
            <Link
              href="/seller/add-model"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
            >
              <Plus size={20} />
              Add Your First Model
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredModels.map((model) => (
            <div
              key={model.id}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Model Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Brain className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{model.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(model.status)}`}>
                          {model.status}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-purple-500/20 text-purple-400 border-purple-500/50">
                          {model.visibility}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-3">{model.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="text-gray-400">
                          Category: <span className="text-white font-medium">{model.category}</span>
                        </span>
                        <span className="text-gray-400">
                          Price: <span className="text-green-400 font-medium">${model.price_per_call}/call</span>
                        </span>
                        <span className="text-gray-400">
                          Total Calls: <span className="text-blue-400 font-medium">{model.total_calls}</span>
                        </span>
                        <span className="text-gray-400">
                          Earnings: <span className="text-green-400 font-medium">${model.total_earnings}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleVisibility(model.id, model.visibility)}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                    title={`Make ${model.visibility === 'public' ? 'private' : 'public'}`}
                  >
                    {model.visibility === 'public' ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                  <button
                    onClick={() => handleToggleStatus(model.id, model.status)}
                    className={`px-4 py-3 rounded-xl font-medium transition-all ${
                      model.status === 'active'
                        ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                        : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                    }`}
                  >
                    {model.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <Link
                    href={`/seller/models/${model.id}/edit`}
                    className="p-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-all"
                  >
                    <Edit size={20} />
                  </Link>
                  <button
                    onClick={() => setDeleteModal({ show: true, modelId: model.id })}
                    className="p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl p-6 max-w-md w-full border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Confirm Delete</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete this model? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal({ show: false, modelId: null })}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteModal.modelId && handleDelete(deleteModal.modelId)}
                className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
