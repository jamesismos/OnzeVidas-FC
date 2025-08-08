import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter, Star, TrendingUp, TrendingDown } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { getClubPlayers, formatCurrency, formatAge } from '../services/dataService';
import { Player } from '../types';

const Squad: React.FC = () => {
  const { selectedClub, players } = useGameStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [sortBy, setSortBy] = useState('overall');

  if (!selectedClub) return null;

  const clubPlayers = getClubPlayers(players, selectedClub.nome);

  // Filtrar jogadores
  const filteredPlayers = clubPlayers.filter(player => {
    const matchesSearch = player.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === 'all' || player.posicao === positionFilter;
    return matchesSearch && matchesPosition;
  });

  // Ordenar jogadores
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    switch (sortBy) {
      case 'overall':
        return (b.overall || 0) - (a.overall || 0);
      case 'age':
        return a.idade - b.idade;
      case 'value':
        return b.valor - a.valor;
      case 'salary':
        return b.salario - a.salario;
      default:
        return 0;
    }
  });

  const positions = [
    { value: 'all', label: 'Todas' },
    { value: 'Goleiro', label: 'Goleiro' },
    { value: 'Zagueiro', label: 'Zagueiro' },
    { value: 'Lateral', label: 'Lateral' },
    { value: 'Volante', label: 'Volante' },
    { value: 'Meia', label: 'Meia' },
    { value: 'Atacante', label: 'Atacante' }
  ];

  const sortOptions = [
    { value: 'overall', label: 'Overall' },
    { value: 'age', label: 'Idade' },
    { value: 'value', label: 'Valor' },
    { value: 'salary', label: 'Salário' }
  ];

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'Goleiro': return 'bg-yellow-500/20 text-yellow-400';
      case 'Zagueiro': return 'bg-blue-500/20 text-blue-400';
      case 'Lateral': return 'bg-green-500/20 text-green-400';
      case 'Volante': return 'bg-purple-500/20 text-purple-400';
      case 'Meia': return 'bg-orange-500/20 text-orange-400';
      case 'Atacante': return 'bg-red-500/20 text-red-400';
      default: return 'bg-secondary-500/20 text-secondary-400';
    }
  };

  const getOverallColor = (overall: number) => {
    if (overall >= 85) return 'text-green-400';
    if (overall >= 80) return 'text-blue-400';
    if (overall >= 75) return 'text-yellow-400';
    if (overall >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

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
          <h1 className="text-3xl font-bold text-white">Elenco</h1>
          <p className="text-secondary-400">
            {clubPlayers.length} jogadores no {selectedClub.nome}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-secondary-400 text-sm">Idade Média</p>
            <p className="text-white font-medium">
              {Math.round(clubPlayers.reduce((sum, p) => sum + p.idade, 0) / clubPlayers.length)} anos
            </p>
          </div>
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
            style={{ 
              backgroundColor: selectedClub.cor_primaria,
              border: `2px solid ${selectedClub.cor_secundaria}`
            }}
          >
            <Users className="w-6 h-6" />
          </div>
        </div>
      </motion.div>

      {/* Filtros */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Busca */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
              <input
                type="text"
                placeholder="Buscar jogador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-secondary-800 border border-secondary-700 rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Filtro de Posição */}
          <div className="flex-1">
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="w-full px-4 py-2 bg-secondary-800 border border-secondary-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {positions.map(pos => (
                <option key={pos.value} value={pos.value}>{pos.label}</option>
              ))}
            </select>
          </div>

          {/* Ordenação */}
          <div className="flex-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 bg-secondary-800 border border-secondary-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Lista de Jogadores */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {sortedPlayers.map((player, index) => (
          <motion.div
            key={player.id}
            className="card-hover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Header do Card */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{player.nome}</h3>
                <p className="text-secondary-400 text-sm">{formatAge(player.idade)}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPositionColor(player.posicao)}`}>
                {player.posicao}
              </div>
            </div>

            {/* Overall */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-secondary-400 text-sm">Overall</span>
              <span className={`text-xl font-bold ${getOverallColor(player.overall || 0)}`}>
                {player.overall || 0}
              </span>
            </div>

            {/* Stats */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-secondary-400">Pace</span>
                <span className="text-white">{player.pace || 70}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-400">Shooting</span>
                <span className="text-white">{player.shooting || 70}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-400">Passing</span>
                <span className="text-white">{player.passing || 70}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-400">Dribbling</span>
                <span className="text-white">{player.dribbling || 70}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-400">Defending</span>
                <span className="text-white">{player.defending || 70}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-400">Physical</span>
                <span className="text-white">{player.physical || 70}</span>
              </div>
            </div>

            {/* Informações Financeiras */}
            <div className="pt-4 border-t border-secondary-800 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-secondary-400">Valor</span>
                <span className="text-accent-400 font-medium">{formatCurrency(player.valor)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-400">Salário</span>
                <span className="text-primary-400 font-medium">{formatCurrency(player.salario)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-400">Moral</span>
                <span className={`font-medium ${
                  player.moral >= 80 ? 'text-green-400' :
                  player.moral >= 60 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {player.moral}%
                </span>
              </div>
            </div>

            {/* Ações */}
            <div className="mt-4 pt-4 border-t border-secondary-800 flex space-x-2">
              <button className="flex-1 btn-secondary text-xs">
                Detalhes
              </button>
              <button className="flex-1 btn-primary text-xs">
                Escalar
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Estatísticas */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h2 className="text-xl font-bold text-white mb-4">Estatísticas do Elenco</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{clubPlayers.length}</p>
            <p className="text-secondary-400 text-sm">Total</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">
              {clubPlayers.filter(p => (p.overall || 0) >= 80).length}
            </p>
            <p className="text-secondary-400 text-sm">Estrelas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">
              {Math.round(clubPlayers.reduce((sum, p) => sum + (p.overall || 0), 0) / clubPlayers.length)}
            </p>
            <p className="text-secondary-400 text-sm">Overall Médio</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent-400">
              {formatCurrency(clubPlayers.reduce((sum, p) => sum + p.valor, 0))}
            </p>
            <p className="text-secondary-400 text-sm">Valor Total</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Squad;
