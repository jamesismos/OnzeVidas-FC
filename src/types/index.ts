export interface Player {
  id: number;
  nome: string;
  posicao: 'Goleiro' | 'Zagueiro' | 'Lateral' | 'Volante' | 'Meia' | 'Atacante';
  idade: number;
  valor: number;
  salario: number;
  moral: number;
  clube: string;
  overall?: number;
  pace?: number;
  shooting?: number;
  passing?: number;
  dribbling?: number;
  defending?: number;
  physical?: number;
  nacionalidade?: string;
  contrato_ate?: number;
}

export interface Club {
  id: number;
  nome: string;
  apelido: string;
  cidade: string;
  estado: string;
  tipo: string;
  riqueza: string;
  orcamento: number;
  folha_salarial: number;
  estadio: string;
  capacidade: number;
  ano_fundacao: number;
  elenco: number[];
  cores: string[];
  cores_hex: string[];
  cor_primaria: string;
  cor_secundaria: string;
  cor_accent: string;
  rival: string;
  torcida: string;
  jovens_promessas: number[];
  tecnico: {
    nome: string;
    idade: number;
    nacionalidade: string;
    contrato_ate: number;
    salario: number;
    especialidade: string;
  };
  dono: {
    nome: string;
    idade: number;
    nacionalidade: string;
    empresa: string;
    patrimonio: string;
  };
  colaboradores: Array<{
    nome: string;
    cargo: string;
    idade: number;
    salario: number;
  }>;
  parceiros: Array<{
    nome: string;
    tipo: string;
    valor: string;
  }>;
}

export interface MatchEvent {
  id: string;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'shot' | 'save';
  player?: Player;
  minute: number;
  description: string;
  team: 'home' | 'away';
}

export interface Match {
  id: string;
  home: Club;
  away: Club;
  homeScore: number;
  awayScore: number;
  events: MatchEvent[];
  date: Date;
  competition: string;
  status: 'scheduled' | 'in_progress' | 'finished';
}

export interface Transfer {
  id: string;
  player: Player;
  fromClub?: Club;
  toClub: Club;
  value: number;
  type: 'buy' | 'sell' | 'loan' | 'free';
  date: Date;
  status: 'pending' | 'completed' | 'rejected';
}

export interface GameState {
  selectedClub: Club | null;
  players: Player[];
  clubs: Club[];
  transfers: Transfer[];
  matches: Match[];
  season: number;
  week: number;
  budget: number;
  revenue: number;
  expenses: number;
  transferBudget: number;
  wageBudget: number;
}

export interface Formation {
  id: string;
  name: string;
  positions: string[];
  description: string;
}

export interface Lineup {
  formation: string;
  players: (Player | null)[];
  substitutes: Player[];
  captain: Player | null;
}

export type Position = 'GK' | 'CB' | 'LB' | 'RB' | 'CDM' | 'CM' | 'CAM' | 'LW' | 'RW' | 'ST';

export interface PlayerStats {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
  overall: number;
}
