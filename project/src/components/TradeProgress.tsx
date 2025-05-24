import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TradeProgressProps {
  completedTrades: number;
  totalTrades: number;
  progressPercentage: number;
}

export function TradeProgress({ 
  completedTrades, 
  totalTrades, 
  progressPercentage 
}: TradeProgressProps) {
  // Calculate visual representation of trades
  const tradeBlocks = Array(totalTrades).fill(0).map((_, i) => {
    let status = "bg-muted";
    if (i < completedTrades) {
      status = "bg-green-500/90";
    }
    return status;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Challenge Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Overall Progress</span>
          <span className="text-sm text-muted-foreground">{progressPercentage.toFixed(0)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Trades Completed</span>
            <span className="text-sm text-muted-foreground">{completedTrades} of {totalTrades}</span>
          </div>
          
          <div className="grid grid-cols-10 gap-1">
            {tradeBlocks.slice(0, 10).map((status, i) => (
              <div 
                key={`trade-block-1-${i}`} 
                className={`h-2 rounded-sm ${status}`}
                title={`Trade ${i + 1}`}
              />
            ))}
          </div>
          <div className="grid grid-cols-10 gap-1">
            {tradeBlocks.slice(10, 20).map((status, i) => (
              <div 
                key={`trade-block-2-${i}`} 
                className={`h-2 rounded-sm ${status}`}
                title={`Trade ${i + 11}`}
              />
            ))}
          </div>
          <div className="grid grid-cols-10 gap-1">
            {tradeBlocks.slice(20, 30).map((status, i) => (
              <div 
                key={`trade-block-3-${i}`} 
                className={`h-2 rounded-sm ${status}`}
                title={`Trade ${i + 21}`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}