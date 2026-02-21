"use client";

import React, { useState, useEffect } from 'react';
import { Ship } from '../types/ship';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShipClass } from '../types/ship';
import { CLASS_ICONS } from '../types/ship';
import { toast } from 'react-hot-toast';

interface ShipCardProps {
  ship: Ship;
  onAddShip: (ship: Ship) => void;
  onReinforceShip: (ship: Ship) => void;
  addedShips: Ship[];
}

const ShipCard: React.FC<ShipCardProps> = ({ ship, onAddShip, onReinforceShip, addedShips }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [reinforceCount, setReinforceCount] = useState(0);

  useEffect(() => {
    // Check if ship is already added
    const shipAdded = addedShips.some(addedShip => addedShip.id === ship.id);
    setIsAdded(shipAdded);
    
    // Count how many of this ship type are reinforced
    const count = addedShips.filter(addedShip => addedShip.id === ship.id).length;
    setReinforceCount(count);
  }, [addedShips, ship.id]);

  const handleAdd = () => {
    if (isAdded) {
      toast.error("Ship already added!");
      return;
    }
    onAddShip(ship);
  };

  const handleReinforce = () => {
    // Check if we've reached the limit of 9 reinforced ships
    if (reinforceCount >= 9) {
      toast.error("Maximum of 9 reinforced ships reached!");
      return;
    }
    onReinforceShip(ship);
  };

  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span className="text-2xl">{CLASS_ICONS[ship.shipClass]}</span>
            {ship.name}
          </CardTitle>
          <Badge variant="secondary" className="bg-slate-700 text-slate-200">
            {ship.tier}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-slate-300">Class:</span>
          <span className="font-medium text-slate-100">{ship.shipClass}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-300">CP Cost:</span>
          <span className="font-medium text-slate-100">{ship.cp}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-300">Reinforced:</span>
          <span className="font-medium text-slate-100">{reinforceCount}/9</span>
        </div>
        <div className="flex gap-2 pt-2">
          <Button 
            onClick={handleAdd} 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isAdded}
          >
            Add
          </Button>
          <Button 
            onClick={handleReinforce} 
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            disabled={reinforceCount >= 9}
          >
            Reinforce
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipCard;