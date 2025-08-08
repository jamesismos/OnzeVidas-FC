import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  ShoppingCart, 
  Layout, 
  Play, 
  DollarSign,
  Settings,
  Trophy
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Elenco', href: '/squad', icon: Users },
  { name: 'Mercado', href: '/transfer-market', icon: ShoppingCart },
  { name: 'Escalação', href: '/lineup', icon: Layout },
  { name: 'Simulação', href: '/match-simulation', icon: Play },
  { name: 'Financeiro', href: '/finances', icon: DollarSign },
  { name: 'Competições', href: '/competitions', icon: Trophy },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

const Sidebar: React.FC = () => {
  return (
    <motion.aside 
      className="w-64 bg-surface border-r border-secondary-800/50 p-4"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'text-secondary-300 hover:bg-secondary-800/50 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Informações Rápidas */}
      <div className="mt-8 p-4 bg-secondary-800/30 rounded-lg">
        <h3 className="text-sm font-semibold text-secondary-300 mb-3">
          Próximos Jogos
        </h3>
        <div className="space-y-2 text-xs text-secondary-400">
          <div className="flex justify-between">
            <span>vs Corinthians</span>
            <span>Domingo</span>
          </div>
          <div className="flex justify-between">
            <span>vs Palmeiras</span>
            <span>Quarta</span>
          </div>
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="mt-4 p-4 bg-secondary-800/30 rounded-lg">
        <h3 className="text-sm font-semibold text-secondary-300 mb-3">
          Temporada
        </h3>
        <div className="space-y-2 text-xs text-secondary-400">
          <div className="flex justify-between">
            <span>Vitórias</span>
            <span className="text-primary-400">12</span>
          </div>
          <div className="flex justify-between">
            <span>Empates</span>
            <span className="text-accent-400">5</span>
          </div>
          <div className="flex justify-between">
            <span>Derrotas</span>
            <span className="text-red-400">3</span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
