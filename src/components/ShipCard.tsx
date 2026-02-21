"use client";

import React, { useState } from 'react';
import { Ship } from '../types/ship';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CLASS_ICONS } from '../types/ship';

interface ShipCardProps {
  ship: Ship;
  isReinforced?: boolean;
  onReinforce?: () => void;
  maxReinforcements?: number;
}

const ShipCard: React.FC<ShipCardProps> = ({ 
  ship, 
  isReinforced = false, 
  onReinforce,
  maxReinforcements = 9
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`w-full transition-all duration-200 ${
        isReinforced ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-lg'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-2xl">{CLASS_ICONS[ship.shipClass]}</span>
            {ship.name}
          </CardTitle>
          {isReinforced && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Reinforced
            </Badge>
          )}
        </div>
        <div className="flex justify-between items-center mt-1">
          <Badge variant="outline">{ship.shipClass}</Badge>
          <Badge variant="outline">{ship.tier}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm font-medium">CP: {ship.cp}</span>
          <Button 
            size="sm" 
            variant={isReinforced ? "secondary" : "default"}
            onClick={onReinforce}
            disabled={isReinforced || !onReinforce}
          >
            {isReinforced ? 'Reinforced' : 'Reinforce'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipCard;