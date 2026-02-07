'use client';

import { useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTournamentsStore } from '@/store/tournaments';
import TournamentForm from '@/components/TournamentForm';
import { Match, BracketRound } from '@/types/tournament';

export default function TournamentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const tournamentId = params.id as string;
  
  const { getTournament, saveSchedule, saveBracket } = useTournamentsStore();
  const tournament = getTournament(tournamentId);

  const handleScheduleGenerated = useCallback((data: {
    format: 'round_robin' | 'league' | 'knockout';
    schedule?: Match[];
    bracket?: BracketRound[];
    rawOutput?: any;
  }) => {
    if (data.format === 'knockout' && data.bracket) {
      saveBracket(tournamentId, data.bracket, data.rawOutput);
    } else if (data.schedule) {
      saveSchedule(tournamentId, data.schedule, data.format, data.rawOutput);
    }
  }, [tournamentId, saveSchedule, saveBracket]);

  if (!tournament) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-semibold text-white mb-2">Tournament not found</h2>
          <p className="text-slate-400 mb-6">This tournament may have been deleted</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all"
          >
            Back to Tournaments
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Tournament Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.push('/')}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
          >
            ← Back
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">{tournament.name}</h1>
            {tournament.description && (
              <p className="text-sm text-slate-400">{tournament.description}</p>
            )}
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            tournament.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
            tournament.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
            'bg-green-500/20 text-green-400'
          }`}>
            {tournament.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      {/* Existing Tournament Form */}
      <TournamentForm 
        tournamentId={tournamentId}
        initialSchedule={tournament.schedule}
        initialBracket={tournament.bracket}
        initialRawOutput={tournament.rawOutput}
        initialFormat={tournament.format}
        onScheduleGenerated={handleScheduleGenerated} 
      />
    </main>
  );
}
