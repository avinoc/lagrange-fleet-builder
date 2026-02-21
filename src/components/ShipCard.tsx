"use client";

import React, { useState } from 'react';
import { Ship } from '../types/ship';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShipClass } from '../types/ship';

interface ShipCardProps {
  ship: Ship;
  onReinforce: (ship: Ship) => void;
  fleetSize: number;
  maxFleetSize: number;
}

const ShipCard: React.FC<ShipCardProps> = ({ ship, onReinforce, fleetSize, maxFleetSize }) => {
  const [isHovered, setIsHovered] = useState(false);

  const isReinforceDisabled = fleetSize >= maxFleetSize;

  return (
    <Card 
      className="w-full max-w-md transition-all duration-200 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">
            {ship.name}
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            {ship.shipClass}
          </Badge>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm font-medium text-gray-600">
            Rank: {ship.tier}
          </span>
          <span className="text-sm font-medium text-gray-600">
            CP: {ship.cp}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mt-2">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
            <span className="text-2xl">
              {ship.shipClass === "Fighter" && "✦"}
              {ship.shipClass === "Corvette" && "◆"}
              {ship.shipClass === "Frigate" && "▲"}
              {ship.shipClass === "Destroyer" && "⬡"}
              {ship.shipClass === "Cruiser" && "◉"}
              {ship.shipClass === "Battlecruiser" && "⬢"}
              {ship.shipClass === "Carrier" && "⊞"}
              {ship.shipClass === "Battleship" && "★"}
            </span>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <Button 
            onClick={() => onReinforce(ship)}
            disabled={isReinforceDisabled}
            className="w-full"
          >
            {isReinforceDisabled ? "Fleet Full" : "Reinforce"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipCard;