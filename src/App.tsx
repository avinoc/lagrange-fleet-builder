"use client";

import React, { useState, useEffect } from 'react';
import { Ship, ships } from './types/ship';
import ShipCard from './components/ShipCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from 'react-hot-toast';

function App() {
  const [filteredShips, setFilteredShips] = useState<Ship[]>(ships);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<Ship['shipClass'] | 'All'>('All');
  const [addedShips, setAddedShips] = useState<Ship[]>([]);
  const [totalCP, setTotalCP] = useState(0);

  // Filter ships based on search term and selected class
  useEffect(() => {
    let result = ships;
    
    if (searchTerm) {
      result = result.filter(ship => 
        ship.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedClass !== 'All') {
      result = result.filter(ship => ship.shipClass === selectedClass);
    }
    
    setFilteredShips(result);
  }, [searchTerm, selectedClass]);

  // Calculate total CP cost
  useEffect(() => {
    const cp = addedShips.reduce((sum, ship) => sum + ship.cp, 0);
    setTotalCP(cp);
  }, [addedShips]);

  const handleAddShip = (ship: Ship) => {
    setAddedShips([...addedShips, ship]);
    toast.success(`${ship.name} added!`);
  };

  const handleReinforceShip = (ship: Ship) => {
    // Create a new ship with 0 CP cost for reinforcement
    const reinforcedShip = {
      ...ship,
      cp: 0
    };
    setAddedShips([...addedShips, reinforcedShip]);
    toast.success(`${ship.name} reinforced!`);
  };

  const handleRemoveShip = (shipId: string) => {
    setAddedShips(addedShips.filter(ship => ship.id !== shipId));
    toast.success('Ship removed!');
  };

  const clearAllShips = () => {
    setAddedShips([]);
    toast.success('All ships cleared!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Ship Builder
          </h1>
          <p className="text-slate-400">Add and reinforce ships for your fleet</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filters and Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-100">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Search Ships
                  </label>
                  <Input
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Ship Class
                  </label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value as Ship['shipClass'] | 'All')}
                    className="w-full bg-slate-700 border-slate-600 text-slate-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Classes</option>
                    <option value="Fighter">Fighter</option>
                    <option value="Corvette">Corvette</option>
                    <option value="Frigate">Frigate</option>
                    <option value="Destroyer">Destroyer</option>
                    <option value="Cruiser">Cruiser</option>
                    <option value="Battlecruiser">Battlecruiser</option>
                    <option value="Carrier">Carrier</option>
                    <option value="Battleship">Battleship</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-100">Fleet Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Total Ships:</span>
                    <span className="font-medium">{addedShips.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Total CP:</span>
                    <span className="font-medium">{totalCP}</span>
                  </div>
                  <Button 
                    onClick={clearAllShips}
                    className="w-full bg-red-600 hover:bg-red-700 text-white mt-4"
                  >
                    Clear All Ships
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ship Grid */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">
                Available Ships ({filteredShips.length})
              </h2>
              {filteredShips.length === 0 ? (
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="py-8 text-center">
                    <p className="text-slate-400">No ships match your search criteria</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredShips.map(ship => (
                    <ShipCard 
                      key={ship.id}
                      ship={ship}
                      onAddShip={handleAddShip}
                      onReinforceShip={handleReinforceShip}
                      addedShips={addedShips}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Added Ships */}
            <div>
              <h2 className="text-2xl font-bold text-slate-100 mb-4">
                Your Fleet ({addedShips.length})
              </h2>
              {addedShips.length === 0 ? (
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="py-8 text-center">
                    <p className="text-slate-400">No ships added to your fleet yet</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addedShips.map((ship, index) => (
                    <Card key={`${ship.id}-${index}`} className="bg-slate-800 border-slate-700">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
                            <span className="text-xl">{CLASS_ICONS[ship.shipClass]}</span>
                            {ship.name}
                          </CardTitle>
                          <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                            {ship.tier}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-300">Class:</span>
                          <span className="font-medium text-slate-100">{ship.shipClass}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">CP Cost:</span>
                          <span className="font-medium text-slate-100">{ship.cp}</span>
                        </div>
                        <Button 
                          onClick={() => handleRemoveShip(ship.id)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white mt-2"
                        >
                          Remove
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;