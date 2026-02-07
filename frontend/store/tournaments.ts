import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Match, BracketRound, Constraints } from '@/types/tournament';

// Tournament entity for frontend session management
export interface Tournament {
  id: string;
  name: string;
  description: string;
  format: 'round_robin' | 'league' | 'knockout';
  createdAt: string;
  status: 'draft' | 'scheduled' | 'in_progress' | 'completed';
  // Schedule data
  schedule?: Match[];
  bracket?: BracketRound[];
  rawOutput?: any;
}

interface TournamentsState {
  tournaments: Tournament[];
  
  // CRUD operations
  addTournament: (tournament: Omit<Tournament, 'id' | 'createdAt' | 'status'>) => string;
  updateTournament: (id: string, updates: Partial<Tournament>) => void;
  deleteTournament: (id: string) => void;
  getTournament: (id: string) => Tournament | undefined;
  
  // Schedule operations
  saveSchedule: (id: string, schedule: Match[], format: Tournament['format'], rawOutput?: any) => void;
  saveBracket: (id: string, bracket: BracketRound[], rawOutput?: any) => void;
}

const generateId = () => {
  return `tournament_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const useTournamentsStore = create<TournamentsState>()(
  persist(
    (set, get) => ({
      tournaments: [],

      addTournament: (tournamentData) => {
        const id = generateId();
        const newTournament: Tournament = {
          ...tournamentData,
          id,
          createdAt: new Date().toISOString(),
          status: 'draft',
        };
        set((state) => ({
          tournaments: [...state.tournaments, newTournament],
        }));
        return id;
      },

      updateTournament: (id, updates) => {
        set((state) => ({
          tournaments: state.tournaments.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        }));
      },

      deleteTournament: (id) => {
        set((state) => ({
          tournaments: state.tournaments.filter((t) => t.id !== id),
        }));
      },

      getTournament: (id) => {
        return get().tournaments.find((t) => t.id === id);
      },
      saveSchedule: (id, schedule, format, rawOutput) => {
        set((state) => ({
          tournaments: state.tournaments.map((t) =>
            t.id === id ? { ...t, schedule, format, rawOutput, status: 'scheduled' as const } : t
          ),
        }));
      },

      saveBracket: (id, bracket, rawOutput) => {
        set((state) => ({
          tournaments: state.tournaments.map((t) =>
            t.id === id ? { ...t, bracket, rawOutput, format: 'knockout' as const, status: 'scheduled' as const } : t
          ),
        }));
      },    }),
    {
      name: 'cricket-tournaments-storage',
    }
  )
);
