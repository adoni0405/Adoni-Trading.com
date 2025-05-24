import { Trade } from '@/types/trade';

export function tradeCalculator(
  startingAmount: number,
  numberOfTrades: number,
  targetPercentage: number
): Trade[] {
  const trades: Trade[] = [];
  let currentEquity = startingAmount;

  for (let i = 0; i < numberOfTrades; i++) {
    // Calculate profit target for this trade
    const profitTarget = currentEquity * targetPercentage;
    
    // Create the trade entry
    trades.push({
      equity: currentEquity,
      profitTarget: profitTarget,
      achieved: false,
      notes: ''
    });
    
    // Update equity for next trade
    currentEquity += profitTarget;
  }

  return trades;
}