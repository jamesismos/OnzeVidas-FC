import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, Filter, DollarSign, TrendingUp } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { getAvailablePlayers, formatCurrency, calculateAcceptanceChance } from '../services/dataService';
import { Player } from '../types';

const TransferMarket: React.FC = () => {
  const { selectedClub, players, budget, buyPlayer } = useGameStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [maxPrice, setMaxPrice] = useState(100000000);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [offerAmount, setOfferAmount] = useState(0);

  if (!selectedClub) return null;

  const availablePlayers = getAvailablePlayers(players);

  // Filtrar jogadores
  const filteredPlayers = availablePlayers.filter(player => {
    const matchesSearch = player.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === 'all' || player.posicao === positionFilter;
    const matchesPrice = player.valor <= maxPrice;
    return matchesSearch && matchesPosition && matchesPrice;
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

  const handleMakeOffer = (player: Player) => {
    setSelectedPlayer(player);
    setOfferAmount(player.valor);
  };

  const handleConfirmOffer = () => {
    if (!selectedPlayer) return;

    try {
      buyPlayer(selectedPlayer, offerAmount);
      setSelectedPlayer(null);
      setOfferAmount(0);
      alert(`Jogador ${selectedPlayer.nome} contratado com sucesso!`);
    } catch (error) {
      alert('Erro ao contratar jogador: ' + (error as Error).message);
    }
  };

  const getAcceptanceChance = (player: Player, offer: number) => {
    return calculateAcceptanceChance(player, selectedClub, offer);
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
          <h1 className="text-3xl font-bold text-white">Mercado de Transferências</h1>
          <p className="text-secondary-400">
            {filteredPlayers.length} jogadores disponíveis
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-secondary-400 text-sm">Orçamento</p>
            <p className="text-white font-medium">{formatCurrency(budget)}</p>
          </div>
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
            style={{ 
              backgroundColor: selectedClub.cor_primaria,
              border: `2px solid ${selectedClub.cor_secundaria}`
            }}
          >
            <ShoppingCart className="w-6 h-6" />
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Busca */}
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

          {/* Filtro de Posição */}
          <div>
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

          {/* Preço Máximo */}
          <div>
            <input
              type="number"
              placeholder="Preço máximo"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full px-4 py-2 bg-secondary-800 border border-secondary-700 rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Orçamento Disponível */}
          <div className="text-center">
            <p className="text-secondary-400 text-sm">Disponível</p>
            <p className="text-accent-400 font-bold">{formatCurrency(budget)}</p>
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
        {filteredPlayers.map((player, index) => (
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
                <p className="text-secondary-400 text-sm">{player.idade} anos</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                player.posicao === 'Goleiro' ? 'bg-yellow-500/20 text-yellow-400' :
                player.posicao === 'Zagueiro' ? 'bg-blue-500/20 text-blue-400' :
                player.posicao === 'Lateral' ? 'bg-green-500/20 text-green-400' :
                player.posicao === 'Volante' ? 'bg-purple-500/20 text-purple-400' :
                player.posicao === 'Meia' ? 'bg-orange-500/20 text-orange-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {player.posicao}
              </div>
            </div>

            {/* Overall */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-secondary-400 text-sm">Overall</span>
              <span className={`text-xl font-bold ${
                (player.overall || 0) >= 85 ? 'text-green-400' :
                (player.overall || 0) >= 80 ? 'text-blue-400' :
                (player.overall || 0) >= 75 ? 'text-yellow-400' :
                'text-orange-400'
              }`}>
                {player.overall || 0}
              </span>
            </div>

            {/* Stats Básicas */}
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

            {/* Chance de Aceitação */}
            <div className="mt-4 pt-4 border-t border-secondary-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-secondary-400 text-sm">Chance de Aceitação</span>
                <span className="text-white font-medium">
                  {getAcceptanceChance(player, player.valor)}%
                </span>
              </div>
              <div className="w-full bg-secondary-800 rounded-full h-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getAcceptanceChance(player, player.valor)}%` }}
                ></div>
              </div>
            </div>

            {/* Ações */}
            <div className="mt-4 pt-4 border-t border-secondary-800">
              <button 
                className="w-full btn-primary"
                onClick={() => handleMakeOffer(player)}
                disabled={budget < player.valor}
              >
                Fazer Proposta
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal de Proposta */}
      {selectedPlayer && (
        <motion.div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="card max-w-md w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-xl font-bold text-white mb-4">
              Fazer Proposta - {selectedPlayer.nome}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-secondary-400 text-sm mb-2">
                  Valor da Proposta
                </label>
                <input
                  type="number"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-secondary-800 border border-secondary-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-secondary-400">Chance de Aceitação</span>
                <span className="text-white font-medium">
                  {getAcceptanceChance(selectedPlayer, offerAmount)}%
                </span>
              </div>

              <div className="w-full bg-secondary-800 rounded-full h-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getAcceptanceChance(selectedPlayer, offerAmount)}%` }}
                ></div>
              </div>

              <div className="flex space-x-3">
                <button 
                  className="flex-1 btn-secondary"
                  onClick={() => setSelectedPlayer(null)}
                >
                  Cancelar
                </button>
                <button 
                  className="flex-1 btn-primary"
                  onClick={handleConfirmOffer}
                  disabled={budget < offerAmount}
                >
                  Confirmar Proposta
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default TransferMarket;
