'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Brain, Upload, DollarSign, Globe, Lock, Code, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AddModel() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    tags: '',
    api_endpoint: '',
    input_format: '',
    output_format: '',
    price_per_call: '0.001',
    visibility: 'public',
  });

  const categories = [
    'Natural Language Processing',
    'Computer Vision',
    'Speech Recognition',
    'Text Generation',
    'Image Generation',
    'Data Analysis',
    'Prediction',
    'Classification',
    'Sentiment Analysis',
    'Translation',
    'Other',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/seller/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        }),
      });

      if (response.ok) {
        router.push('/seller/models');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to create model');
      }
    } catch (error) {
      console.error('Error creating model:', error);
      alert('Failed to create model');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/seller/models"
          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Add New Model</h1>
          <p className="text-gray-400">Deploy your AI model to the marketplace</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Brain className="text-blue-400" size={24} />
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                  Model Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., GPT-4 Alternative"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe what your model does, its capabilities, and use cases..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-all"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-semibold text-gray-300 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="e.g., GPT, NLP, Chatbot"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* API Configuration */}
          <div className="pt-6 border-t border-white/10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Code className="text-green-400" size={24} />
              API Configuration
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="api_endpoint" className="block text-sm font-semibold text-gray-300 mb-2">
                  API Endpoint *
                </label>
                <input
                  type="url"
                  id="api_endpoint"
                  name="api_endpoint"
                  required
                  value={formData.api_endpoint}
                  onChange={handleChange}
                  placeholder="https://api.example.com/v1/inference"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="input_format" className="block text-sm font-semibold text-gray-300 mb-2">
                    Input Format *
                  </label>
                  <textarea
                    id="input_format"
                    name="input_format"
                    required
                    value={formData.input_format}
                    onChange={handleChange}
                    rows={4}
                    placeholder='{"prompt": "string", "max_tokens": 100}'
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all resize-none font-mono text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="output_format" className="block text-sm font-semibold text-gray-300 mb-2">
                    Output Format *
                  </label>
                  <textarea
                    id="output_format"
                    name="output_format"
                    required
                    value={formData.output_format}
                    onChange={handleChange}
                    rows={4}
                    placeholder='{"result": "string", "tokens_used": 0}'
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all resize-none font-mono text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Visibility */}
          <div className="pt-6 border-t border-white/10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <DollarSign className="text-yellow-400" size={24} />
              Pricing & Visibility
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price_per_call" className="block text-sm font-semibold text-gray-300 mb-2">
                  Price Per Call (USD) *
                </label>
                <input
                  type="number"
                  id="price_per_call"
                  name="price_per_call"
                  required
                  step="0.000001"
                  min="0.000001"
                  value={formData.price_per_call}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-all"
                />
                <p className="text-xs text-gray-400 mt-2">Minimum: $0.000001</p>
              </div>

              <div>
                <label htmlFor="visibility" className="block text-sm font-semibold text-gray-300 mb-2">
                  Visibility *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, visibility: 'public' })}
                    className={`px-4 py-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                      formData.visibility === 'public'
                        ? 'bg-green-500/20 border-green-500/50 text-green-400'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <Globe size={18} />
                    Public
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, visibility: 'private' })}
                    className={`px-4 py-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                      formData.visibility === 'private'
                        ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <Lock size={18} />
                    Private
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-white/10 flex gap-4">
            <Link
              href="/seller/models"
              className="flex-1 px-6 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all text-center font-semibold"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Create Model
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
