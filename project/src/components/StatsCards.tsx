import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpCircle, DollarSign, PercentCircle, Target } from "lucide-react";

interface StatsCardsProps {
  completedTrades: number;
  totalTrades: number;
  currentEquity: number;
  totalProfit: number;
  profitPercentage: number;
  goalAmount: number;
}

export function StatsCards({
  completedTrades,
  totalTrades,
  currentEquity,
  totalProfit,
  profitPercentage,
  goalAmount
}: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="overflow-hidden relative">
        <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent absolute inset-0 z-0"></div>
        <CardHeader className="flex flex-row items-center justify-between pb-2 z-10 relative">
          <CardTitle className="text-sm font-medium">Current Equity</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="z-10 relative">
          <div className="text-2xl font-bold">${currentEquity.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            Goal: ${goalAmount.toFixed(2)}
          </p>
          <Progress className="h-2 mt-2" value={(currentEquity / goalAmount) * 100} />
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden relative">
        <div className="bg-gradient-to-r from-green-500/20 via-green-500/10 to-transparent absolute inset-0 z-0"></div>
        <CardHeader className="flex flex-row items-center justify-between pb-2 z-10 relative">
          <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
          <ArrowUpCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="z-10 relative">
          <div className="text-2xl font-bold">${totalProfit.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {totalProfit >= 0 ? "+" : ""}
            {profitPercentage.toFixed(2)}% from start
          </p>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden relative">
        <div className="bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-transparent absolute inset-0 z-0"></div>
        <CardHeader className="flex flex-row items-center justify-between pb-2 z-10 relative">
          <CardTitle className="text-sm font-medium">Completion</CardTitle>
          <PercentCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="z-10 relative">
          <div className="text-2xl font-bold">{completedTrades} / {totalTrades}</div>
          <p className="text-xs text-muted-foreground">
            {((completedTrades / totalTrades) * 100).toFixed(0)}% complete
          </p>
          <Progress className="h-2 mt-2" value={(completedTrades / totalTrades) * 100} />
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden relative">
        <div className="bg-gradient-to-r from-purple-500/20 via-purple-500/10 to-transparent absolute inset-0 z-0"></div>
        <CardHeader className="flex flex-row items-center justify-between pb-2 z-10 relative">
          <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="z-10 relative">
          <div className="text-2xl font-bold">
            {((currentEquity / goalAmount) * 100).toFixed(2)}%
          </div>
          <p className="text-xs text-muted-foreground">
            ${currentEquity.toFixed(2)} of ${goalAmount.toFixed(2)}
          </p>
          <Progress className="h-2 mt-2" value={(currentEquity / goalAmount) * 100} />
        </CardContent>
      </Card>
    </div>
  );
}