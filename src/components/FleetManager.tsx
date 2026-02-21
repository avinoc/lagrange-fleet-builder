"use client";

import React, { useState } from 'react';
import { Ship } from '../types/ship';
import ShipCard from './ShipCard';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FleetManagerProps {
  ships: Ship[];
  onReinforceShip: (shipId: string) => void;
  reinforcedShips: string[];
  maxReinforcements: number;
}

const FleetManager: React.FC<FleetManagerProps> = ({ 
  ships, 
  onReinforceShip,
  reinforcedShips,
  maxReinforcements = 9
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'reinforced'>('all');
  
  const reinforcedCount = reinforcedShips.length;
  const canReinforce = reinforcedCount < maxReinforcements;

  const filteredShips = activeTab === 'reinforced' 
    ? ships.filter(ship => reinforcedShips.includes(ship.id))
    : ships;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Fleet Manager</span>
          <Badge variant="secondary">
            {reinforcedCount}/{maxReinforcements} Reinforced
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Button 
            variant={activeTab === 'all' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('all')}
          >
            All Ships
          </Button>
          <Button 
            variant={activeTab === 'reinforced' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('reinforced')}
          >
            Reinforced Ships
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredShips.map(ship => (
            <ShipCard
              key={ship.id}
              ship={ship}
              isReinforced={reinforcedShips.includes(ship.id)}
              onReinforce={() => onReinforceShip(ship.id)}
              maxReinforcements={maxReinforcements}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FleetManager;