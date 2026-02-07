'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTournamentsStore, Tournament } from '@/store/tournaments';

export default function Home() {
  const router = useRouter();
  const { tournaments, addTournament, deleteTournament } = useTournamentsStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTournament, setNewTournament] = useState({
    name: '',
    description: '',
  });

  const handleCreateTournament = () => {
    if (!newTournament.name.trim()) return;
    
    const id = addTournament({
      name: newTournament.name,
      description: newTournament.description,
      format: 'knockout', // Default format, user selects in scheduler
    });
    
    setShowCreateModal(false);
    setNewTournament({ name: '', description: '' });
    router.push(`/tournaments/${id}`);
  };

  const getStatusColor = (status: Tournament['status']) => {
    switch (status) {
      case 'draft': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'scheduled': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'in_progress': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  // Show landing page when no tournaments
  if (tournaments.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
            <div className="text-center">
              {/* Logo */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl shadow-blue-500/30 mb-8 animate-bounce">
                <span className="text-4xl">🏏</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Cricket Tournament
                <span className="block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  Organizer
                </span>
              </h1>
              
              <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                Create professional tournament schedules in seconds. Smart scheduling, 
                beautiful brackets, and powerful constraints - all in one place.
              </p>

              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-lg rounded-2xl shadow-xl hover:shadow-blue-500/30 transition-all transform hover:scale-105"
              >
                <span className="text-2xl">+</span>
                Create Your First Tournament
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600 transition-all group">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform">
                  🏆
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Multiple Formats</h3>
                <p className="text-slate-400 leading-relaxed">
                  Support for Knockout, Round Robin, and League formats. Perfect for any tournament size.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600 transition-all group">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Smart Scheduling</h3>
                <p className="text-slate-400 leading-relaxed">
                  AI-powered scheduling with rest days, venue balancing, and blackout date handling.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600 transition-all group">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform">
                  📊
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Visual Brackets</h3>
                <p className="text-slate-400 leading-relaxed">
                  Beautiful interactive brackets and match cards. Share and track progress easily.
                </p>
              </div>
            </div>
          </div>

          {/* How it Works */}
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">1</div>
                <h4 className="text-lg font-semibold text-white mb-2">Create Tournament</h4>
                <p className="text-slate-400 text-sm">Name your tournament and set it up</p>
              </div>
              
              <div className="hidden md:block w-16 h-px bg-gradient-to-r from-blue-600 to-emerald-600" />
              
              {/* Step 2 */}
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">2</div>
                <h4 className="text-lg font-semibold text-white mb-2">Add Teams & Venues</h4>
                <p className="text-slate-400 text-sm">Configure participants and locations</p>
              </div>
              
              <div className="hidden md:block w-16 h-px bg-gradient-to-r from-emerald-600 to-purple-600" />
              
              {/* Step 3 */}
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">3</div>
                <h4 className="text-lg font-semibold text-white mb-2">Generate Schedule</h4>
                <p className="text-slate-400 text-sm">Get your complete bracket instantly</p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="bg-gradient-to-r from-blue-600/20 to-emerald-600/20 border border-blue-500/20 rounded-3xl p-10 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to organize your tournament?</h3>
              <p className="text-slate-400 mb-6">Join thousands of organizers who trust our platform</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-8 py-3 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-colors"
              >
                Get Started — It&apos;s Free
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="max-w-6xl mx-auto px-6 py-8 border-t border-slate-800">
            <p className="text-center text-slate-500 text-sm">
              Built with ❤️ for cricket lovers everywhere
            </p>
          </div>
        </div>

        {/* Create Tournament Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Create New Tournament</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Tournament Name *</label>
                  <input
                    type="text"
                    value={newTournament.name}
                    onChange={(e) => setNewTournament({ ...newTournament, name: e.target.value })}
                    placeholder="e.g., World Cup 2026"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                  <textarea
                    value={newTournament.description}
                    onChange={(e) => setNewTournament({ ...newTournament, description: e.target.value })}
                    placeholder="Brief description of the tournament..."
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTournament}
                  disabled={!newTournament.name.trim()}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
                >
                  Create & Setup
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    );
  }

  // Dashboard view when tournaments exist
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">🏏 My Tournaments</h1>
            <p className="text-slate-400">Create and manage your cricket tournaments</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all"
          >
            <span className="text-xl">+</span>
            Create Tournament
          </button>
        </div>

        {/* Tournaments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all group cursor-pointer"
              onClick={() => router.push(`/tournaments/${tournament.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {tournament.name}
                  </h3>
                  {tournament.description && (
                    <p className="text-slate-400 text-sm mt-1 line-clamp-2">{tournament.description}</p>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Are you sure you want to delete this tournament?')) {
                      deleteTournament(tournament.id);
                    }
                  }}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  🗑️
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(tournament.status)}`}>
                  {tournament.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700 text-xs text-slate-500">
                Created {new Date(tournament.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Tournament Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Tournament</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Tournament Name *</label>
                <input
                  type="text"
                  value={newTournament.name}
                  onChange={(e) => setNewTournament({ ...newTournament, name: e.target.value })}
                  placeholder="e.g., World Cup 2026"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  value={newTournament.description}
                  onChange={(e) => setNewTournament({ ...newTournament, description: e.target.value })}
                  placeholder="Brief description of the tournament..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTournament}
                disabled={!newTournament.name.trim()}
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
              >
                Create & Setup
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
           
