import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit, Save, X } from "lucide-react";
import { Trade } from '@/types/trade';
import { toast } from 'sonner';

interface TradeTableProps {
  trades: Trade[];
  onTradeUpdate: (tradeIndex: number, field: string, value: string | boolean) => void;
}

export function TradeTable({ trades, onTradeUpdate }: TradeTableProps) {
  const [editingNotes, setEditingNotes] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>('');

  const handleNoteEdit = (index: number, note: string) => {
    setEditingNotes(index);
    setEditingText(note || '');
  };

  const handleNoteSave = (index: number) => {
    onTradeUpdate(index, 'notes', editingText);
    setEditingNotes(null);
    toast.success(`Notes updated for Trade #${index + 1}`);
  };

  const handleCheckboxChange = (index: number, isChecked: boolean) => {
    // Only allow marking trades as completed sequentially
    if (isChecked) {
      // Check if previous trade is completed (or if this is the first trade)
      const canComplete = index === 0 || trades[index - 1].achieved;
      if (!canComplete) {
        toast.error('You must complete previous trades first');
        return;
      }
    } else {
      // Check if any later trades are already marked as completed
      const laterTradeCompleted = trades.some((t, i) => i > index && t.achieved);
      if (laterTradeCompleted) {
        toast.error('You must un-complete later trades first');
        return;
      }
    }
    
    onTradeUpdate(index, 'achieved', isChecked);
    if (isChecked) {
      toast.success(`Trade #${index + 1} marked as completed!`);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="sticky top-0 bg-background z-10">
          <TableRow>
            <TableHead className="w-[80px]">Trade</TableHead>
            <TableHead>Equity</TableHead>
            <TableHead>Profit Target</TableHead>
            <TableHead className="w-[100px] text-center">Complete</TableHead>
            <TableHead className="w-[300px]">Setup / Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trades.map((trade, index) => (
            <TableRow 
              key={index} 
              className={`
                ${trade.achieved ? 'bg-green-500/10' : ''}
                ${!trade.achieved && index > 0 && trades[index - 1].achieved ? 'bg-blue-500/5' : ''}
              `}
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                ${trade.equity.toFixed(2)}
              </TableCell>
              <TableCell>
                ${trade.profitTarget.toFixed(2)}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Checkbox 
                    checked={trade.achieved} 
                    onCheckedChange={(checked) => handleCheckboxChange(index, !!checked)}
                    className={trade.achieved ? "data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500" : ""}
                  />
                </div>
              </TableCell>
              <TableCell>
                {editingNotes === index ? (
                  <div className="flex items-center gap-2">
                    <Input 
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      placeholder="Enter trade notes, setup details..."
                      className="h-8"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleNoteSave(index)}
                      className="h-8 w-8"
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setEditingNotes(null)}
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-sm truncate max-w-[200px]">
                      {trade.notes || <span className="text-muted-foreground italic">No notes</span>}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleNoteEdit(index, trade.notes || '')}
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 focus:opacity-100"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}