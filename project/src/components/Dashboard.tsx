import { useState } from 'react';
import { TradeTable } from './TradeTable';
import { StatsCards } from './StatsCards';
import { Header } from './Header';
import { TradeSummary } from './TradeSummary';
import { ModeToggle } from './ModeToggle';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TradeProgress } from './TradeProgress';
import { Trade } from '@/types/trade';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { BarChart, LineChart } from 'lucide-react';
import { ProgressChart } from './ProgressChart';

interface DashboardProps {
  trades: Trade[];
  onTradeUpdate: (tradeIndex: number, field: string, value: string | boolean) => void;
  onReset: () => void;
}

const Dashboard = ({ trades, onTradeUpdate, onReset }: DashboardProps) => {
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');

  // Calculate completed trades count
  const completedTrades = trades.filter(trade => trade.achieved).length;
  
  // Calculate current equity (the last achieved trade's equity, or the starting amount)
  const currentEquity = trades.reduce((latest, trade) => 
    trade.achieved ? trade.equity : latest, trades[0].equity);
  
  // Calculate total profit
  const startingEquity = trades[0].equity;
  const totalProfit = currentEquity - startingEquity;
  const profitPercentage = (totalProfit / startingEquity) * 100;
  
  // Calculate goal amount (final equity)
  const goalAmount = trades[trades.length - 1].equity;
  
  // Calculate progress percentage
  const progressPercentage = (currentEquity / goalAmount) * 100;

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all trades? This action cannot be undone.')) {
      onReset();
      toast.success('Trading journal has been reset');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Header />
        <div className="flex gap-2 items-center">
          <Button 
            variant="outline" 
            onClick={handleReset}
            className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
          >
            Reset
          </Button>
          <ModeToggle />
        </div>
      </div>

      <StatsCards 
        completedTrades={completedTrades}
        totalTrades={trades.length}
        currentEquity={currentEquity}
        totalProfit={totalProfit}
        profitPercentage={profitPercentage}
        goalAmount={goalAmount}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Challenge Progress</CardTitle>
              <CardDescription>Track your 30-day trading challenge</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant={viewMode === 'table' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setViewMode('table')}
              >
                <BarChart className="h-4 w-4 mr-1" />
                Table
              </Button>
              <Button 
                variant={viewMode === 'chart' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setViewMode('chart')}
              >
                <LineChart className="h-4 w-4 mr-1" />
                Chart
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === 'table' ? (
              <ScrollArea className="h-[600px]">
                <TradeTable trades={trades} onTradeUpdate={onTradeUpdate} />
              </ScrollArea>
            ) : (
              <ProgressChart trades={trades} />
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <TradeProgress 
            completedTrades={completedTrades} 
            totalTrades={trades.length} 
            progressPercentage={progressPercentage} 
          />

          <Tabs defaultValue="summary">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="current">Current Trade</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
              <TradeSummary 
                startAmount={startingEquity}
                currentAmount={currentEquity}
                targetAmount={goalAmount}
                profitPercentage={profitPercentage}
                daysCompleted={completedTrades}
                totalDays={trades.length}
              />
            </TabsContent>
            <TabsContent value="current">
              <Card>
                <CardHeader>
                  <CardTitle>Trade #{completedTrades + 1}</CardTitle>
                  <CardDescription>Your next trade details</CardDescription>
                </CardHeader>
                <CardContent>
                  {completedTrades < trades.length ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted/40 p-3 rounded-md">
                          <p className="text-sm text-muted-foreground">Starting Equity</p>
                          <p className="text-xl font-bold">${trades[completedTrades].equity.toFixed(2)}</p>
                        </div>
                        <div className="bg-muted/40 p-3 rounded-md">
                          <p className="text-sm text-muted-foreground">Profit Target</p>
                          <p className="text-xl font-bold">${trades[completedTrades].profitTarget.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="bg-muted/40 p-3 rounded-md">
                        <p className="text-sm text-muted-foreground">After Successful Trade</p>
                        <p className="text-xl font-bold">${(trades[completedTrades].equity + trades[completedTrades].profitTarget).toFixed(2)}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center">
                      <p className="font-semibold text-green-500">Challenge completed! 🎉</p>
                      <p className="text-sm text-muted-foreground mt-2">You've completed all 30 trades</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;