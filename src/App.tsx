import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import { loadClubs, loadPlayers } from './services/dataService';

// Componentes
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Squad from './pages/Squad';
import TransferMarket from './pages/TransferMarket';
import Lineup from './pages/Lineup';
import MatchSimulation from './pages/MatchSimulation';
import Finances from './pages/Finances';
import ClubSelection from './pages/ClubSelection';

const App: React.FC = () => {
  const { 
    selectedClub, 
    setClubs, 
    setPlayers,
    clubs,
    players 
  } = useGameStore();

  useEffect(() => {
    const initializeGame = async () => {
      try {
        const [clubsData, playersData] = await Promise.all([
          loadClubs(),
          loadPlayers()
        ]);
        
        setClubs(clubsData);
        setPlayers(playersData);
      } catch (error) {
        console.error('Erro ao inicializar jogo:', error);
      }
    };

    initializeGame();
  }, [setClubs, setPlayers]);

  // Se não há clube selecionado, mostrar tela de seleção
  if (!selectedClub) {
    return (
      <div className="min-h-screen bg-background">
        <ClubSelection clubs={clubs} />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-background text-text">
        <Header />
        <div className="flex">
          <Sidebar />
          <motion.main 
            className="flex-1 p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/squad" element={<Squad />} />
              <Route path="/transfer-market" element={<TransferMarket />} />
              <Route path="/lineup" element={<Lineup />} />
              <Route path="/match-simulation" element={<MatchSimulation />} />
              <Route path="/finances" element={<Finances />} />
            </Routes>
          </motion.main>
        </div>
      </div>
    </Router>
  );
};

export default App;
