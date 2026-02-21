"use client";

import React, { useState } from 'react';
import { ships } from './types/ship';
import FleetManager from './components/FleetManager';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function App() {
  const [reinforcedShips, setReinforcedShips] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'reinforced'>('all');

  const handleReinforceShip = (shipId: string) => {
    if (reinforcedShips.length >= 9) {
      return; // Max 9 ships can be reinforced
    }
    
    if (!reinforcedShips.includes(shipId)) {
      setReinforcedShips([...reinforcedShips, shipId]);
    }
  };

  const handleResetFleet = () => {
    setReinforcedShips([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Ship Fleet Manager</h1>
          <p className="text-gray-600">Manage your fleet with reinforcement capabilities</p>
        </header>

        <div className="mb-6 flex justify-center gap-4">
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
          <Button 
            variant="secondary" 
            onClick={handleResetFleet}
          >
            Reset Fleet
          </Button>
        </div>

        <FleetManager 
          ships={ships}
          onReinforceShip={handleReinforceShip}
          reinforcedShips={reinforcedShips}
          maxReinforcements={9}
        />
      </div>
    </div>
  );
}

export default App;