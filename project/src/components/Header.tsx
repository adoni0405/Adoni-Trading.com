import { BadgeDollarSign } from 'lucide-react';

export function Header() {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary/10 p-3 rounded-full">
        <BadgeDollarSign className="h-8 w-8 text-primary" />
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Trading Challenge</h1>
        <p className="text-muted-foreground">
          30 Days from $20 to $4800 - Compound Your Success
        </p>
      </div>
    </div>
  );
}