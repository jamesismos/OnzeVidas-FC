import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Users, Settings, RotateCcw } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { getClubPlayers } from '../services/dataService';
import { Player, Lineup as LineupType } from '../types';

const Lineup: React.FC = () => {
  const { selectedClub, players, setLineup } = useGameStore();
  const [formation, setFormation] = useState('4-3-3');
  const [lineup, setCurrentLineup] = useState<(Player | null)[]>(Array(11).fill(null));
  const [draggedPlayer, setDraggedPlayer] = useState<Player | null>(null);

  if (!selectedClub) return null;

  const clubPlayers = getClubPlayers(players, selectedClub.nome);

  const formations = {
    '4-3-3': {
      name: '4-3-3',
      positions: ['GK', 'LB', 'CB', 'CB', 'RB', 'CM', 'CM', 'CM', 'LW', 'ST', 'RW'],
      layout: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]
    },
    '4-4-2': {
      name: '4-4-2',
      positions: ['GK', 'LB', 'CB', 'CB', 'RB', 'LM', 'CM', 'CM', 'RM', 'ST', 'ST'],
      layout: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]
    },
    '3-5-2': {
      name: '3-5-2',
      positions: ['GK', 'CB', 'CB', 'CB', 'LWB', 'CDM', 'CM', 'CDM', 'RWB', 'ST', 'ST'],
      layout: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]
    }
  };

  const currentFormation = formations[formation as keyof typeof formations];

  const validatePosition = (player: Player, position: string): boolean => {
    const positionMap: { [key: string]: string[] } = {
      'GK': ['Goleiro'],
      'CB': ['Zagueiro'],
      'LB': ['Lateral'],
      'RB': ['Lateral'],
      'LWB': ['Lateral'],
      'RWB': ['Lateral'],
      'CDM': ['Volante'],
      'CM': ['Meia', 'Volante'],
      'LM': ['Meia'],
      'RM': ['Meia'],
      'CAM': ['Meia'],
      'LW': ['Atacante', 'Meia'],
      'RW': ['Atacante', 'Meia'],
      'ST': ['Atacante']
    };

    return positionMap[position]?.includes(player.posicao) || false;
  };

  const handleDrop = (index: number) => {
    if (!draggedPlayer) return;

    const position = currentFormation.positions[index];
    if (!validatePosition(draggedPlayer, position)) {
      alert(`${draggedPlayer.nome} não pode jogar na posição ${position}!`);
      return;
    }

    const newLineup = [...lineup];
    newLineup[index] = draggedPlayer;
    setCurrentLineup(newLineup);
    setDraggedPlayer(null);
  };

  const handleDragStart = (player: Player) => {
    setDraggedPlayer(player);
  };

  const handleSaveLineup = () => {
    const lineupData: LineupType = {
      formation,
      players: lineup,
      substitutes: clubPlayers.filter(p => !lineup.includes(p)),
      captain: lineup.find(p => p !== null) || null
    };
    setLineup(lineupData);
    alert('Escalação salva com sucesso!');
  };

  const handleResetLineup = () => {
    setCurrentLineup(Array(11).fill(null));
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
          <h1 className="text-3xl font-bold text-white">Escalação</h1>
          <p className="text-secondary-400">
            Formação {currentFormation.name} - {selectedClub.nome}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            className="btn-secondary"
            onClick={handleResetLineup}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Resetar
          </button>
          <button 
            className="btn-primary"
            onClick={handleSaveLineup}
          >
            Salvar Escalação
          </button>
        </div>
      </motion.div>

      {/* Controles */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white mb-2">Formação</h2>
            <div className="flex space-x-2">
              {Object.keys(formations).map((form) => (
                <button
                  key={form}
                  onClick={() => setFormation(form)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    formation === form
                      ? 'bg-primary-500 text-white'
                      : 'bg-secondary-800 text-secondary-300 hover:bg-secondary-700'
                  }`}
                >
                  {formations[form as keyof typeof formations].name}
                </button>
              ))}
            </div>
          </div>
          <div className="text-right">
            <p className="text-secondary-400 text-sm">Jogadores Escalados</p>
            <p className="text-white font-bold text-xl">
              {lineup.filter(p => p !== null).length}/11
            </p>
          </div>
        </div>
      </motion.div>

      {/* Campo */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="relative">
          {/* Campo de Futebol */}
          <div className="pitch-gradient rounded-xl p-8 relative overflow-hidden">
            {/* Linhas do Campo */}
            <div className="absolute inset-4 border-2 border-white/30 rounded-lg"></div>
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30"></div>
            <div className="absolute top-1/4 left-1/2 w-0.5 h-1/2 bg-white/30"></div>
            <div className="absolute bottom-1/4 left-1/2 w-0.5 h-1/2 bg-white/30"></div>
            
            {/* Áreas */}
            <div className="absolute top-2 left-2 right-2 h-16 border-2 border-white/30 rounded-t-lg"></div>
            <div className="absolute bottom-2 left-2 right-2 h-16 border-2 border-white/30 rounded-b-lg"></div>

            {/* Posições dos Jogadores */}
            <div className="relative h-full">
              {currentFormation.positions.map((position, index) => {
                const player = lineup[index];
                const positions = [
                  { top: '85%', left: '50%' }, // GK
                  { top: '70%', left: '20%' }, // LB
                  { top: '70%', left: '35%' }, // CB
                  { top: '70%', left: '65%' }, // CB
                  { top: '70%', left: '80%' }, // RB
                  { top: '50%', left: '20%' }, // LM/CM
                  { top: '50%', left: '50%' }, // CM
                  { top: '50%', left: '80%' }, // RM/CM
                  { top: '30%', left: '20%' }, // LW/ST
                  { top: '30%', left: '50%' }, // ST
                  { top: '30%', left: '80%' }, // RW/ST
                ];

                return (
                  <div
                    key={index}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ top: positions[index].top, left: positions[index].left }}
                    onDrop={() => handleDrop(index)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center bg-surface/80 backdrop-blur-sm">
                      {player ? (
                        <div className="text-center">
                          <div className="text-xs font-bold text-white">{player.nome.split(' ')[0]}</div>
                          <div className="text-xs text-secondary-400">{position}</div>
                          <div className="text-xs text-primary-400">{player.overall}</div>
                        </div>
                      ) : (
                        <div className="text-center text-secondary-400">
                          <div className="text-xs">{position}</div>
                          <div className="text-xs">Vazio</div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lista de Jogadores */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h2 className="text-lg font-bold text-white mb-4">Elenco Disponível</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {clubPlayers.map((player) => (
            <motion.div
              key={player.id}
              className="p-3 bg-secondary-800/50 rounded-lg border border-secondary-700 cursor-pointer hover:bg-secondary-700/50 transition-colors"
              draggable
              onDragStart={() => handleDragStart(player)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">{player.nome}</div>
                  <div className="text-sm text-secondary-400">{player.posicao}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary-400">{player.overall}</div>
                  <div className="text-xs text-secondary-400">{player.idade} anos</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Lineup;
