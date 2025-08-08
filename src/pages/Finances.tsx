import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, BarChart3, PieChart } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { formatCurrency } from '../services/dataService';

const Finances: React.FC = () => {
  const { selectedClub, budget, revenue, expenses, transferBudget, wageBudget } = useGameStore();

  if (!selectedClub) return null;

  const balance = revenue - expenses;
  const transferBudgetUsed = selectedClub.orcamento * 0.3 - transferBudget;
  const wageBudgetUsed = selectedClub.folha_salarial - wageBudget;

  const financialData = [
    {
      title: 'Orçamento Total',
      value: formatCurrency(selectedClub.orcamento),
      icon: DollarSign,
      color: 'text-accent-400',
      bgColor: 'bg-accent-500/10'
    },
    {
      title: 'Orçamento Disponível',
      value: formatCurrency(budget),
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Receitas',
      value: formatCurrency(revenue),
      icon: TrendingUp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Despesas',
      value: formatCurrency(expenses),
      icon: TrendingDown,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10'
    }
  ];

  const budgetBreakdown = [
    { name: 'Transferências', value: transferBudget, color: 'bg-primary-500' },
    { name: 'Folha Salarial', value: wageBudget, color: 'bg-accent-500' },
    { name: 'Operacional', value: budget - transferBudget - wageBudget, color: 'bg-secondary-500' }
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 5000000, expenses: 3000000 },
    { month: 'Fev', revenue: 6000000, expenses: 3500000 },
    { month: 'Mar', revenue: 4500000, expenses: 3200000 },
    { month: 'Abr', revenue: 7000000, expenses: 4000000 },
    { month: 'Mai', revenue: 5500000, expenses: 3800000 },
    { month: 'Jun', revenue: 8000000, expenses: 4500000 }
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
          <h1 className="text-3xl font-bold text-white">Financeiro</h1>
          <p className="text-secondary-400">
            Controle financeiro do {selectedClub.nome}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-secondary-400 text-sm">Saldo</p>
            <p className={`font-medium ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatCurrency(balance)}
            </p>
          </div>
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
            style={{ 
              backgroundColor: selectedClub.cor_primaria,
              border: `2px solid ${selectedClub.cor_secundaria}`
            }}
          >
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </motion.div>

      {/* Cards Principais */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {financialData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-400 text-sm">{item.title}</p>
                  <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${item.bgColor}`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Receitas vs Despesas */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Receitas vs Despesas</h2>
            <BarChart3 className="w-5 h-5 text-secondary-400" />
          </div>
          
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-400">{data.month}</span>
                  <span className="text-white font-medium">
                    {formatCurrency(data.revenue - data.expenses)}
                  </span>
                </div>
                <div className="relative h-2 bg-secondary-800 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                    style={{ width: `${(data.revenue / 8000000) * 100}%` }}
                  ></div>
                  <div 
                    className="absolute top-0 left-0 h-full bg-red-500 rounded-full"
                    style={{ width: `${(data.expenses / 8000000) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-secondary-400">
                  <span>Receita: {formatCurrency(data.revenue)}</span>
                  <span>Despesa: {formatCurrency(data.expenses)}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Gráfico de Pizza - Orçamento */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Distribuição do Orçamento</h2>
            <PieChart className="w-5 h-5 text-secondary-400" />
          </div>
          
          <div className="space-y-4">
            {budgetBreakdown.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                  <span className="text-white">{item.name}</span>
                </div>
                <span className="text-secondary-400 font-medium">
                  {formatCurrency(item.value)}
                </span>
              </div>
            ))}
            
            {/* Gráfico de Pizza Simulado */}
            <div className="relative w-32 h-32 mx-auto mt-6">
              <div className="absolute inset-0 rounded-full border-8 border-primary-500"></div>
              <div className="absolute inset-0 rounded-full border-8 border-accent-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)' }}></div>
              <div className="absolute inset-0 rounded-full border-8 border-secondary-500" style={{ clipPath: 'polygon(50% 50%, 0% 50%, 0% 0%, 50% 0%)' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-sm">Orçamento</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Detalhes Financeiros */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h2 className="text-lg font-bold text-white mb-4">Detalhes Financeiros</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Receitas */}
          <div>
            <h3 className="text-md font-semibold text-green-400 mb-3">Receitas</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-secondary-400">Bilheteria</span>
                <span className="text-white font-medium">{formatCurrency(revenue * 0.4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-400">Patrocínios</span>
                <span className="text-white font-medium">{formatCurrency(revenue * 0.3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-400">TV e Mídia</span>
                <span className="text-white font-medium">{formatCurrency(revenue * 0.2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-400">Outros</span>
                <span className="text-white font-medium">{formatCurrency(revenue * 0.1)}</span>
              </div>
              <div className="pt-2 border-t border-secondary-800">
                <div className="flex justify-between font-bold">
                  <span className="text-green-400">Total Receitas</span>
                  <span className="text-green-400">{formatCurrency(revenue)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Despesas */}
          <div>
            <h3 className="text-md font-semibold text-red-400 mb-3">Despesas</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-secondary-400">Folha Salarial</span>
                <span className="text-white font-medium">{formatCurrency(selectedClub.folha_salarial)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-400">Transferências</span>
                <span className="text-white font-medium">{formatCurrency(transferBudgetUsed)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-400">Operacional</span>
                <span className="text-white font-medium">{formatCurrency(expenses * 0.3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-400">Infraestrutura</span>
                <span className="text-white font-medium">{formatCurrency(expenses * 0.2)}</span>
              </div>
              <div className="pt-2 border-t border-secondary-800">
                <div className="flex justify-between font-bold">
                  <span className="text-red-400">Total Despesas</span>
                  <span className="text-red-400">{formatCurrency(expenses)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Orçamentos Específicos */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        {/* Orçamento de Transferências */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Orçamento de Transferências</h3>
            <TrendingUp className="w-5 h-5 text-primary-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-secondary-400">Total Disponível</span>
              <span className="text-white font-medium">{formatCurrency(selectedClub.orcamento * 0.3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-400">Utilizado</span>
              <span className="text-white font-medium">{formatCurrency(transferBudgetUsed)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-400">Disponível</span>
              <span className="text-accent-400 font-bold">{formatCurrency(transferBudget)}</span>
            </div>
            
            <div className="w-full bg-secondary-800 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(transferBudgetUsed / (selectedClub.orcamento * 0.3)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Orçamento de Salários */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Folha Salarial</h3>
            <DollarSign className="w-5 h-5 text-accent-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-secondary-400">Orçamento</span>
              <span className="text-white font-medium">{formatCurrency(selectedClub.folha_salarial)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-400">Utilizado</span>
              <span className="text-white font-medium">{formatCurrency(wageBudgetUsed)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-400">Disponível</span>
              <span className="text-accent-400 font-bold">{formatCurrency(wageBudget)}</span>
            </div>
            
            <div className="w-full bg-secondary-800 rounded-full h-2">
              <div 
                className="bg-accent-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(wageBudgetUsed / selectedClub.folha_salarial) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Finances;
