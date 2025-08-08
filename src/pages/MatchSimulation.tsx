import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Trophy, Users, Clock } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { MatchEvent } from '../types';

const MatchSimulation: React.FC = () => {
  const { selectedClub } = useGameStore();
  const [isSimulating, setIsSimulating] = useState(false);
  const [matchTime, setMatchTime] = useState(0);
  const [events, setEvents] = useState<MatchEvent[]>([]);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [homeTeam] = useState(selectedClub?.nome || 'Flamengo');
  const [awayTeam] = useState('Corinthians');

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSimulating && matchTime < 90) {
      interval = setInterval(() => {
        setMatchTime(prev => {
          const newTime = prev + 1;
          
          // Gerar eventos baseados no tempo
          if (Math.random() < 0.1) {
            generateEvent(newTime);
          }
          
          return newTime;
        });
      }, 667); // 60 segundos / 90 minutos = 667ms por minuto
    }

    return () => clearInterval(interval);
  }, [isSimulating, matchTime]);

  const generateEvent = (minute: number) => {
    const eventTypes = ['goal', 'yellow_card', 'substitution', 'shot', 'save'];
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    
    const event: MatchEvent = {
      id: Date.now().toString(),
      type: eventType as any,
      minute,
      description: generateEventDescription(eventType, minute),
      team: Math.random() > 0.5 ? 'home' : 'away'
    };

    if (eventType === 'goal') {
      if (event.team === 'home') {
        setHomeScore(prev => prev + 1);
      } else {
        setAwayScore(prev => prev + 1);
      }
    }

    setEvents(prev => [...prev, event]);
  };

  const generateEventDescription = (type: string, minute: number): string => {
    const players = ['Arrascaeta', 'Pedro', 'Bruno Henrique', 'Everton', 'Gerson'];
    const player = players[Math.floor(Math.random() * players.length)];
    
    switch (type) {
      case 'goal':
        return `⚽ GOL! ${player} marca aos ${minute}'`;
      case 'yellow_card':
        return `🟨 Cartão amarelo para ${player} aos ${minute}'`;
      case 'substitution':
        return `🔄 Substituição: ${player} sai aos ${minute}'`;
      case 'shot':
        return `🎯 Chute de ${player} aos ${minute}'`;
      case 'save':
        return `🧤 Defesa de ${player} aos ${minute}'`;
      default:
        return `Evento aos ${minute}'`;
    }
  };

  const startSimulation = () => {
    setIsSimulating(true);
    setMatchTime(0);
    setEvents([]);
    setHomeScore(0);
    setAwayScore(0);
  };

  const pauseSimulation = () => {
    setIsSimulating(false);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setMatchTime(0);
    setEvents([]);
    setHomeScore(0);
    setAwayScore(0);
  };

  const formatTime = (time: number): string => {
    return `${time}'`;
  };

  const getResultClass = () => {
    if (homeScore > awayScore) return 'text-green-400';
    if (homeScore < awayScore) return 'text-red-400';
    return 'text-yellow-400';
  };

  const getResultText = () => {
    if (homeScore > awayScore) return 'VITÓRIA! 🎉';
    if (homeScore < awayScore) return 'DERROTA 😔';
    return 'EMPATE 🤝';
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
          <h1 className="text-3xl font-bold text-white">Simulação de Partida</h1>
          <p className="text-secondary-400">
            {homeTeam} vs {awayTeam}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-secondary-400 text-sm">Tempo</p>
            <p className="text-white font-medium">{formatTime(matchTime)}</p>
          </div>
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
            style={{ 
              backgroundColor: selectedClub?.cor_primaria || '#00D26A',
              border: `2px solid ${selectedClub?.cor_secundaria || '#16a34a'}`
            }}
          >
            <Play className="w-6 h-6" />
          </div>
        </div>
      </motion.div>

      {/* Placar */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="text-center">
          <div className="flex items-center justify-center space-x-8 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{homeTeam}</div>
              <div className="text-4xl font-bold text-primary-400">{homeScore}</div>
            </div>
            <div className="text-center">
              <div className="text-lg text-secondary-400">VS</div>
              <div className="text-sm text-secondary-400">{formatTime(matchTime)}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{awayTeam}</div>
              <div className="text-4xl font-bold text-primary-400">{awayScore}</div>
            </div>
          </div>

          {matchTime >= 90 && (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`text-2xl font-bold ${getResultClass()}`}>
                {getResultText()}
              </div>
              <div className="text-secondary-400 mt-2">
                Resultado Final
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Controles */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center justify-center space-x-4">
          <button 
            className="btn-primary"
            onClick={startSimulation}
            disabled={isSimulating || matchTime >= 90}
          >
            <Play className="w-4 h-4 mr-2" />
            Iniciar Simulação
          </button>
          <button 
            className="btn-secondary"
            onClick={pauseSimulation}
            disabled={!isSimulating}
          >
            <Pause className="w-4 h-4 mr-2" />
            Pausar
          </button>
          <button 
            className="btn-secondary"
            onClick={resetSimulation}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Resetar
          </button>
        </div>
      </motion.div>

      {/* Estádio 3D */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="relative h-64 bg-gradient-to-b from-green-600 to-green-800 rounded-xl overflow-hidden">
          {/* Padrão do Estádio */}
          <div className="absolute inset-0 stadium-pattern opacity-20"></div>
          
          {/* Campo */}
          <div className="absolute inset-4 border-2 border-white/30 rounded-lg bg-green-500/20"></div>
          
          {/* Linha Central */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/50"></div>
          
          {/* Círculo Central */}
          <div className="absolute top-1/2 left-1/2 w-16 h-16 border-2 border-white/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          
          {/* Áreas */}
          <div className="absolute top-2 left-2 right-2 h-8 border-2 border-white/30 rounded-t-lg"></div>
          <div className="absolute bottom-2 left-2 right-2 h-8 border-2 border-white/30 rounded-b-lg"></div>
          
          {/* Placar no Estádio */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-surface/90 backdrop-blur-sm px-4 py-2 rounded-lg">
            <div className="text-center text-white font-bold">
              <div className="text-sm">{homeTeam} {homeScore} - {awayScore} {awayTeam}</div>
              <div className="text-xs text-secondary-400">{formatTime(matchTime)}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Eventos da Partida */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Eventos da Partida</h2>
          <Clock className="w-5 h-5 text-secondary-400" />
        </div>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {events.length === 0 ? (
            <div className="text-center text-secondary-400 py-8">
              Nenhum evento ainda...
            </div>
          ) : (
            events.map((event, index) => (
              <motion.div
                key={event.id}
                className="flex items-center space-x-3 p-3 bg-secondary-800/50 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-xs text-secondary-400 min-w-[40px]">
                  {formatTime(event.minute)}
                </div>
                <div className="flex-1 text-white text-sm">
                  {event.description}
                </div>
                <div className={`text-xs px-2 py-1 rounded ${
                  event.team === 'home' 
                    ? 'bg-primary-500/20 text-primary-400' 
                    : 'bg-secondary-500/20 text-secondary-400'
                }`}>
                  {event.team === 'home' ? homeTeam : awayTeam}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Estatísticas */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <div className="card text-center">
          <Trophy className="w-8 h-8 text-accent-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{homeScore}</div>
          <div className="text-secondary-400 text-sm">Gols Casa</div>
        </div>
        <div className="card text-center">
          <Users className="w-8 h-8 text-primary-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{events.length}</div>
          <div className="text-secondary-400 text-sm">Eventos</div>
        </div>
        <div className="card text-center">
          <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{formatTime(matchTime)}</div>
          <div className="text-secondary-400 text-sm">Tempo</div>
        </div>
      </motion.div>
    </div>
  );
};

export default MatchSimulation;
