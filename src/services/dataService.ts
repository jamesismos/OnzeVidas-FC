import { Club, Player } from '../types';

// Carregar dados dos clubes
export const loadClubs = async (): Promise<Club[]> => {
  try {
    const response = await fetch('/dados/clubes.json');
    const clubs = await response.json();
    return clubs;
  } catch (error) {
    console.error('Erro ao carregar clubes:', error);
    return [];
  }
};

// Carregar dados dos jogadores
export const loadPlayers = async (): Promise<Player[]> => {
  try {
    const response = await fetch('/dados/jogadores.json');
    const players = await response.json();
    
    // Adicionar stats calculadas para jogadores que não têm
    return players.map(player => ({
      ...player,
      overall: player.overall || calculateOverall(player),
      pace: player.pace || Math.floor(Math.random() * 30) + 70,
      shooting: player.shooting || Math.floor(Math.random() * 30) + 70,
      passing: player.passing || Math.floor(Math.random() * 30) + 70,
      dribbling: player.dribbling || Math.floor(Math.random() * 30) + 70,
      defending: player.defending || Math.floor(Math.random() * 30) + 70,
      physical: player.physical || Math.floor(Math.random() * 30) + 70,
      nacionalidade: player.nacionalidade || 'Brasil',
    }));
  } catch (error) {
    console.error('Erro ao carregar jogadores:', error);
    return [];
  }
};

// Calcular overall baseado na posição e idade
const calculateOverall = (player: Player): number => {
  const baseOverall = 70;
  const ageFactor = Math.max(0, 30 - player.idade) * 0.5;
  const positionBonus = getPositionBonus(player.posicao);
  const moraleBonus = (player.moral - 50) * 0.1;
  
  return Math.min(99, Math.max(50, Math.floor(baseOverall + ageFactor + positionBonus + moraleBonus)));
};

// Bônus por posição
const getPositionBonus = (position: string): number => {
  switch (position) {
    case 'Goleiro': return 5;
    case 'Zagueiro': return 3;
    case 'Lateral': return 2;
    case 'Volante': return 4;
    case 'Meia': return 6;
    case 'Atacante': return 8;
    default: return 0;
  }
};

// Formatar moeda
export const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(0)}K`;
  }
  return `R$ ${value.toLocaleString()}`;
};

// Formatar idade
export const formatAge = (age: number): string => {
  return `${age} anos`;
};

// Formatar valor de mercado
export const formatMarketValue = (value: number): string => {
  if (value >= 1000000) {
    return `€${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `€${(value / 1000).toFixed(0)}K`;
  }
  return `€${value.toLocaleString()}`;
};

// Obter jogadores de um clube específico
export const getClubPlayers = (players: Player[], clubName: string): Player[] => {
  return players.filter(player => player.clube === clubName);
};

// Obter jogadores disponíveis no mercado
export const getAvailablePlayers = (players: Player[]): Player[] => {
  return players.filter(player => player.clube === 'Sem clube' || !player.clube);
};

// Calcular chance de aceitação de proposta
export const calculateAcceptanceChance = (
  player: Player, 
  offeringClub: Club, 
  offerValue: number
): number => {
  const playerValue = player.valor;
  const clubPrestige = getClubPrestige(offeringClub);
  const valueRatio = offerValue / playerValue;
  
  let chance = 50; // Base 50%
  
  // Fator valor da proposta
  if (valueRatio >= 1.5) chance += 30;
  else if (valueRatio >= 1.2) chance += 20;
  else if (valueRatio >= 1.0) chance += 10;
  else chance -= 20;
  
  // Fator prestígio do clube
  chance += clubPrestige * 10;
  
  // Fator moral do jogador
  chance += (player.moral - 50) * 0.2;
  
  return Math.min(95, Math.max(5, chance));
};

// Calcular prestígio do clube
const getClubPrestige = (club: Club): number => {
  const budgetFactor = Math.min(club.orcamento / 100000000, 1);
  const capacityFactor = Math.min(club.capacidade / 80000, 1);
  const ageFactor = Math.min((2025 - club.ano_fundacao) / 100, 1);
  
  return (budgetFactor + capacityFactor + ageFactor) / 3;
};
