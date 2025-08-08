import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Target,
  Award,
  BarChart3
} from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { formatCurrency, getClubPlayers } from '../services/dataService';

const Dashboard: React.FC = () => {
  const { selectedClub, players, budget, transferBudget, season, week } = useGameStore();
  
  if (!selectedClub) return null;

  const clubPlayers = getClubPlayers(players, selectedClub.nome);
  const squadSize = clubPlayers.length;
  const averageAge = clubPlayers.length > 0 
    ? Math.round(clubPlayers.reduce((sum, p) => sum + p.idade, 0) / clubPlayers.length)
    : 0;

  const stats = [
    {
      title: 'Orçamento',
      value: formatCurrency(budget),
      icon: DollarSign,
      color: 'text-accent-400',
      bgColor: 'bg-accent-500/10'
    },
    {
      title: 'Transferência',
      value: formatCurrency(transferBudget),
      icon: TrendingUp,
      color: 'text-primary-400',
      bgColor: 'bg-primary-500/10'
    },
    {
      title: 'Elenco',
      value: `${squadSize} jogadores`,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Idade Média',
      value: `${averageAge} anos`,
      icon: Target,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    }
  ];

  const recentMatches = [
    { home: 'Flamengo', away: 'Corinthians', homeScore: 2, awayScore: 1, date: 'Domingo' },
    { home: 'Palmeiras', away: 'Flamengo', homeScore: 0, awayScore: 2, date: 'Quarta' },
    { home: 'Flamengo', away: 'São Paulo', homeScore: 1, awayScore: 1, date: 'Sábado' }
  ];

  const upcomingMatches = [
    { home: 'Flamengo', away: 'Vasco', date: 'Domingo', time: '16:00' },
    { home: 'Botafogo', away: 'Flamengo', date: 'Quarta', time: '20:00' },
    { home: 'Flamengo', away: 'Fluminense', date: 'Sábado', time: '16:00' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-secondary-400">Visão geral do {selectedClub.nome}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-secondary-400 text-sm">Temporada {season}</p>
            <p className="text-white font-medium">Semana {week}</p>
          </div>
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
            style={{ 
              backgroundColor: selectedClub.cor_primaria,
              border: `2px solid ${selectedClub.cor_secundaria}`
            }}
          >
            {selectedClub.nome.charAt(0)}
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-400 text-sm">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Próximos Jogos */}
        <motion.div 
          className="card lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Próximos Jogos</h2>
            <Calendar className="w-5 h-5 text-secondary-400" />
          </div>
          <div className="space-y-3">
            {upcomingMatches.map((match, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-center">
                    <p className="text-white font-medium">{match.home}</p>
                    <p className="text-secondary-400 text-xs">Casa</p>
                  </div>
                  <div className="text-center">
                    <p className="text-secondary-400 text-sm">vs</p>
                    <p className="text-secondary-400 text-xs">{match.date}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-medium">{match.away}</p>
                    <p className="text-secondary-400 text-xs">Visitante</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-accent-400 font-medium">{match.time}</p>
                  <p className="text-secondary-400 text-xs">{match.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Últimos Resultados */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Últimos Resultados</h2>
            <Trophy className="w-5 h-5 text-secondary-400" />
          </div>
          <div className="space-y-3">
            {recentMatches.map((match, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-center">
                    <p className="text-white font-medium">{match.home}</p>
                    <p className="text-secondary-400 text-xs">Casa</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">
                      {match.homeScore} - {match.awayScore}
                    </p>
                    <p className="text-secondary-400 text-xs">{match.date}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-medium">{match.away}</p>
                    <p className="text-secondary-400 text-xs">Visitante</p>
                  </div>
                </div>
                <div className={`text-right px-2 py-1 rounded text-xs font-medium ${
                  match.home === selectedClub.nome 
                    ? match.homeScore > match.awayScore 
                      ? 'bg-green-500/20 text-green-400'
                      : match.homeScore < match.awayScore
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                    : match.away === selectedClub.nome
                    ? match.awayScore > match.homeScore
                      ? 'bg-green-500/20 text-green-400'
                      : match.awayScore < match.homeScore
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-secondary-500/20 text-secondary-400'
                }`}>
                  {match.home === selectedClub.nome 
                    ? match.homeScore > match.awayScore ? 'V' : match.homeScore < match.awayScore ? 'D' : 'E'
                    : match.away === selectedClub.nome
                    ? match.awayScore > match.homeScore ? 'V' : match.awayScore < match.homeScore ? 'D' : 'E'
                    : '-'
                  }
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Informações do Clube */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Informações do Clube</h2>
          <Award className="w-5 h-5 text-secondary-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-secondary-400">Estádio</span>
              <span className="text-white font-medium">{selectedClub.estadio}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-400">Capacidade</span>
              <span className="text-white font-medium">{selectedClub.capacidade.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-400">Fundação</span>
              <span className="text-white font-medium">{selectedClub.ano_fundacao}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-400">Técnico</span>
              <span className="text-white font-medium">{selectedClub.tecnico.nome}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-secondary-400">Cidade</span>
              <span className="text-white font-medium">{selectedClub.cidade}, {selectedClub.estado}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-400">Rival</span>
              <span className="text-white font-medium">{selectedClub.rival}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-400">Torcida</span>
              <span className="text-white font-medium">{selectedClub.torcida}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-400">Folha Salarial</span>
              <span className="text-white font-medium">{formatCurrency(selectedClub.folha_salarial)}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
