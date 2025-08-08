import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, DollarSign, Calendar } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { formatCurrency } from '../services/dataService';

const Header: React.FC = () => {
  const { selectedClub, season, week, budget, transferBudget } = useGameStore();

  if (!selectedClub) return null;

  return (
    <motion.header 
      className="bg-surface border-b border-secondary-800/50 p-4"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        {/* Logo e Nome do Clube */}
        <div className="flex items-center space-x-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
            style={{ 
              backgroundColor: selectedClub.cor_primaria,
              border: `2px solid ${selectedClub.cor_secundaria}`
            }}
          >
            {selectedClub.nome.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{selectedClub.nome}</h1>
            <p className="text-secondary-400 text-sm">{selectedClub.apelido}</p>
          </div>
        </div>

        {/* Informações do Jogo */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary-400" />
            <span className="text-white font-medium">
              Temporada {season} - Semana {week}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-accent-400" />
            <span className="text-white font-medium">
              {formatCurrency(budget)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary-400" />
            <span className="text-white font-medium">
              Transferência: {formatCurrency(transferBudget)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-accent-400" />
            <span className="text-white font-medium">
              {selectedClub.estadio}
            </span>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="flex items-center space-x-3">
          <button className="btn-primary text-sm">
            Próximo Jogo
          </button>
          <button className="btn-secondary text-sm">
            Salvar
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
