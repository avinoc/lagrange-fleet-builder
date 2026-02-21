import React from 'react';
import { Ship } from '@/types/ship';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { CLASS_ICONS } from '@/types/ship';

interface ShipCardProps {
  ship: Ship;
  onAdd: (ship: Ship) => void;
  disabled?: boolean;
}

export function ShipCard({ ship, onAdd, disabled }: ShipCardProps) {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'S': return 'bg-purple-500';
      case 'A': return 'bg-blue-500';
      case 'B': return 'bg-green-500';
      case 'C': return 'bg-yellow-500';
      case 'D': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-gray-900/50 border-cyan-500/30 backdrop-blur-sm hover:border-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/10 h-full flex flex-col">
      <CardContent className="p-3 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-cyan-300 text-sm">{ship.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-cyan-400 font-mono text-xs">{CLASS_ICONS[ship.shipClass]}</span>
              <span className="text-gray-300 text-xs">{ship.shipClass}</span>
            </div>
          </div>
          <Badge className={`text-xs ${getTierColor(ship.tier)}`}>{ship.tier}</Badge>
        </div>
        
        <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-700">
          <span className="text-cyan-400 font-mono text-xs">CP: {ship.cp}</span>
          <Button 
            onClick={() => onAdd(ship)}
            disabled={disabled}
            className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs px-2 py-1 h-6"
          >
            Reinforce
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}