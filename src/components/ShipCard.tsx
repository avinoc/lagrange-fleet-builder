"use client";

import React, { useState } from 'react';
import { Ship } from '../types/ship';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ship as ShipIcon } from 'lucide-react';
import { useFleet } from '@/hooks/useFleet';

interface ShipCardProps {
  ship: Ship;
}

const ShipCard: React.FC<ShipCardProps> = ({ ship }) => {
  const { addToFleet, isInFleet } = useFleet();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToFleet = () => {
    addToFleet({ ...ship, cp: 0 });
    setIsAdded(true);
  };

  const handleReinforce = () => {
    addToFleet({ ...ship, cp: 0 });
    setIsAdded(true);
  };

  const isShipInFleet = isInFleet(ship.id);

  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <ShipIcon className="w-5 h-5" />
              {ship.name}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                {ship.shipClass}
              </Badge>
              <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                {ship.tier}
              </Badge>
            </div>
          </div>
          <div className="bg-slate-700 rounded-lg px-3 py-1 text-slate-200 font-mono">
            {ship.cp} CP
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 mt-4">
          <Button 
            onClick={handleAddToFleet} 
            disabled={isShipInFleet}
            className="flex-1 bg-slate-600 hover:bg-slate-500 text-slate-100"
          >
            {isShipInFleet ? 'Added' : 'Add'}
          </Button>
          <Button 
            onClick={handleReinforce} 
            disabled={isShipInFleet}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-slate-100"
          >
            Reinforce
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipCard;