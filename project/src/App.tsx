import { useState, useEffect } from 'react';
import { ThemeProvider } from './components/theme-provider';
import Dashboard from './components/Dashboard';
import { Toaster } from '@/components/ui/sonner';
import { tradeCalculator } from './lib/tradeCalculator';
import './App.css';

function App() {
  const [trades, setTrades] = useState(() => {
    const savedTrades = localStorage.getItem('tradingChallengeTrades');
    return savedTrades ? JSON.parse(savedTrades) : tradeCalculator(20, 30, 0.2);
  });

  // Save trades to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tradingChallengeTrades', JSON.stringify(trades));
  }, [trades]);

  const handleTradeUpdate = (tradeIndex: number, field: string, value: string | boolean) => {
    setTrades(trades.map((trade, index) => 
      index === tradeIndex ? { ...trade, [field]: value } : trade
    ));
  };

  const handleReset = () => {
    setTrades(tradeCalculator(20, 30, 0.2));
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <main className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
        <Dashboard 
          trades={trades} 
          onTradeUpdate={handleTradeUpdate}
          onReset={handleReset}
        />
        <Toaster />
      </main>
    </ThemeProvider>
  );
}

export default App;