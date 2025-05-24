import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface TradeSummaryProps {
  startAmount: number;
  currentAmount: number;
  targetAmount: number;
  profitPercentage: number;
  daysCompleted: number;
  totalDays: number;
}

export function TradeSummary({
  startAmount,
  currentAmount,
  targetAmount,
  profitPercentage,
  daysCompleted,
  totalDays
}: TradeSummaryProps) {
  // Calculate average daily profit percentage
  const avgDailyProfit = daysCompleted > 0 
    ? profitPercentage / daysCompleted 
    : 0;

  // Calculate remaining amount needed
  const remainingAmount = targetAmount - currentAmount;
  
  // Calculate estimated days to complete based on current rate
  const estimatedDaysLeft = avgDailyProfit > 0 
    ? Math.ceil((Math.log(targetAmount / currentAmount) / Math.log(1 + (avgDailyProfit / 100))))
    : "N/A";

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="font-medium">Start</div>
          <ArrowRight className="h-4 w-4 text-muted-foreground mx-2" />
          <div className="font-medium">Current</div>
          <ArrowRight className="h-4 w-4 text-muted-foreground mx-2" />
          <div className="font-medium">Target</div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">${startAmount}</div>
          <ArrowRight className="h-5 w-5 text-muted-foreground mx-2" />
          <div className="text-2xl font-bold">${currentAmount.toFixed(2)}</div>
          <ArrowRight className="h-5 w-5 text-muted-foreground mx-2" />
          <div className="text-2xl font-bold">${targetAmount.toFixed(2)}</div>
        </div>
        
        <div className="space-y-1 pt-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Days completed:</span>
            <span className="font-medium">{daysCompleted} of {totalDays}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Current profit:</span>
            <span className="font-medium text-green-500">+{profitPercentage.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Avg. daily growth:</span>
            <span className="font-medium">{avgDailyProfit.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Remaining amount:</span>
            <span className="font-medium">${remainingAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Est. days to complete:</span>
            <span className="font-medium">{typeof estimatedDaysLeft === 'number' ? estimatedDaysLeft : estimatedDaysLeft}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}