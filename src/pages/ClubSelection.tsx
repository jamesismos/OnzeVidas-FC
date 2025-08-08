import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, MapPin, Calendar } from 'lucide-react';
import { Club } from '../types';
import { useGameStore } from '../store/gameStore';
import { formatCurrency } from '../services/dataService';

interface ClubSelectionProps {
  clubs: Club[];
}

const ClubSelection: React.FC<ClubSelectionProps> = ({ clubs }) => {
  const { setSelectedClub } = useGameStore();

  const handleClubSelect = (club: Club) => {
    setSelectedClub(club);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div 
        className="max-w-6xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            OnzeVidas FC
          </motion.h1>
          <motion.p 
            className="text-xl text-secondary-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Escolha seu clube e comece sua jornada no futebol brasileiro
          </motion.p>
        </div>

        {/* Grid de Clubes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club, index) => (
            <motion.div
              key={club.id}
              className="card-hover cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleClubSelect(club)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Header do Card */}
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{ 
                    backgroundColor: club.cor_primaria,
                    border: `3px solid ${club.cor_secundaria}`
                  }}
                >
                  {club.nome.charAt(0)}
                </div>
                <div className="text-right">
                  <h3 className="text-lg font-bold text-white">{club.nome}</h3>
                  <p className="text-secondary-400 text-sm">{club.apelido}</p>
                </div>
              </div>

              {/* Informações do Clube */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-secondary-300">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{club.cidade}, {club.estado}</span>
                </div>

                <div className="flex items-center space-x-2 text-secondary-300">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm">{club.estadio}</span>
                </div>

                <div className="flex items-center space-x-2 text-secondary-300">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{club.capacidade.toLocaleString()} lugares</span>
                </div>

                <div className="flex items-center space-x-2 text-secondary-300">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Fundado em {club.ano_fundacao}</span>
                </div>

                {/* Orçamento */}
                <div className="pt-3 border-t border-secondary-800">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-400 text-sm">Orçamento</span>
                    <span className="text-accent-400 font-semibold">
                      {formatCurrency(club.orcamento)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-400 text-sm">Folha Salarial</span>
                    <span className="text-primary-400 font-semibold">
                      {formatCurrency(club.folha_salarial)}
                    </span>
                  </div>
                </div>

                {/* Riqueza */}
                <div className="flex justify-between items-center">
                  <span className="text-secondary-400 text-sm">Riqueza</span>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${
                    club.riqueza === 'alta' 
                      ? 'bg-green-500/20 text-green-400' 
                      : club.riqueza === 'média'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {club.riqueza}
                  </span>
                </div>
              </div>

              {/* Botão Selecionar */}
              <div className="mt-4 pt-4 border-t border-secondary-800">
                <button className="w-full btn-primary group-hover:bg-primary-600 transition-colors">
                  Selecionar Clube
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div 
          className="text-center mt-12 text-secondary-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm">
            Dados baseados na temporada 2024/25 do futebol brasileiro
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ClubSelection;
