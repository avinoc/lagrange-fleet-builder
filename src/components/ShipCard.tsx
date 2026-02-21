"use client";

import React from 'react';
import { Ship } from '../types/ship';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Ship as ShipIcon,
  Shield,
  Zap,
  Target,
  Star,
  AlertTriangle
} from 'lucide-react';

interface ShipCardProps {
  ship: Ship;
  onReinforce?: (shipId: string) => void;
}

const ShipCard: React.FC<ShipCardProps> = ({ ship, onReinforce }) => {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'A': return 'bg-green-100 text-green-800';
      case 'B': return 'bg-blue-100 text-blue-800';
      case 'C': return 'bg-yellow-100 text-yellow-800';
      case 'D': return 'bg-orange-100 text-orange-800';
      case 'S': return 'bg-purple-100 text-purple-800';
      case 'Sit.': return 'bg-red-100 text-red-800';
      case 'TBD': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getShipClassIcon = (shipClass: string) => {
    switch (shipClass) {
      case 'Fighter': return <ShipIcon className="w-4 h-4" />;
      case 'Corvette': return <Shield className="w-4 h-4" />;
      case 'Frigate': return <Target className="w-4 h-4" />;
      case 'Destroyer': return <Zap className="w-4 h-4" />;
      case 'Cruiser': return <Star className="w-4 h-4" />;
      case 'Battlecruiser': return <AlertTriangle className="w-4 h-4" />;
      case 'Carrier': return <ShipIcon className="w-4 h-4" />;
      case 'Battleship': return <Shield className="w-4 h-4" />;
      default: return <ShipIcon className="w-4 h-4" />;
    }
  };

  return (
    <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {getShipClassIcon(ship.shipClass)}
              <span>{ship.name}</span>
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={getTierColor(ship.tier)} variant="secondary">
                {ship.tier}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <ShipIcon className="w-3 h-3" />
                {ship.shipClass}
              </Badge>
            </div>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            {ship.cp}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mt-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onReinforce && onReinforce(ship.id)}
          >
            Reinforce
          </Button>
          <div className="text-sm text-gray-500">
            CP Cost: {ship.cp}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipCard;