import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, Club, Player, Transfer, Match, Lineup } from '../types';

interface GameStore extends GameState {
  // Actions
  setSelectedClub: (club: Club) => void;
  setPlayers: (players: Player[]) => void;
  setClubs: (clubs: Club[]) => void;
  addTransfer: (transfer: Transfer) => void;
  addMatch: (match: Match) => void;
  updateBudget: (amount: number) => void;
  updateRevenue: (amount: number) => void;
  updateExpenses: (amount: number) => void;
  buyPlayer: (player: Player, price: number) => void;
  sellPlayer: (player: Player, price: number) => void;
  setLineup: (lineup: Lineup) => void;
  nextWeek: () => void;
  nextSeason: () => void;
  resetGame: () => void;
}

const initialGameState: GameState = {
  selectedClub: null,
  players: [],
  clubs: [],
  transfers: [],
  matches: [],
  season: 2025,
  week: 1,
  budget: 0,
  revenue: 0,
  expenses: 0,
  transferBudget: 0,
  wageBudget: 0,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialGameState,

      setSelectedClub: (club: Club) => {
        set({ 
          selectedClub: club,
          budget: club.orcamento,
          transferBudget: club.orcamento * 0.3,
          wageBudget: club.folha_salarial
        });
      },

      setPlayers: (players: Player[]) => set({ players }),

      setClubs: (clubs: Club[]) => set({ clubs }),

      addTransfer: (transfer: Transfer) => {
        set(state => ({
          transfers: [...state.transfers, transfer]
        }));
      },

      addMatch: (match: Match) => {
        set(state => ({
          matches: [...state.matches, match]
        }));
      },

      updateBudget: (amount: number) => {
        set(state => ({
          budget: state.budget + amount
        }));
      },

      updateRevenue: (amount: number) => {
        set(state => ({
          revenue: state.revenue + amount
        }));
      },

      updateExpenses: (amount: number) => {
        set(state => ({
          expenses: state.expenses + amount
        }));
      },

      buyPlayer: (player: Player, price: number) => {
        const state = get();
        if (state.budget < price) {
          throw new Error('Orçamento insuficiente!');
        }

        set(state => ({
          budget: state.budget - price,
          transferBudget: state.transferBudget - price,
          players: [...state.players, { ...player, clube: state.selectedClub?.nome || 'Sem clube' }]
        }));
      },

      sellPlayer: (player: Player, price: number) => {
        set(state => ({
          budget: state.budget + price,
          transferBudget: state.transferBudget + price,
          players: state.players.filter(p => p.id !== player.id)
        }));
      },

      setLineup: (lineup: Lineup) => {
        // Implementar lógica de escalação
        console.log('Lineup set:', lineup);
      },

      nextWeek: () => {
        set(state => ({
          week: state.week + 1
        }));
      },

      nextSeason: () => {
        set(state => ({
          season: state.season + 1,
          week: 1
        }));
      },

      resetGame: () => {
        set(initialGameState);
      },
    }),
    {
      name: 'onzevidas-fc-save',
      partialize: (state) => ({
        selectedClub: state.selectedClub,
        season: state.season,
        week: state.week,
        budget: state.budget,
        revenue: state.revenue,
        expenses: state.expenses,
        transferBudget: state.transferBudget,
        wageBudget: state.wageBudget,
      }),
    }
  )
);
