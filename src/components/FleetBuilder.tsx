import { useState, useEffect } from "react";
import { Ship, ships, SHIP_CLASSES } from "@/types/ship";
import { ShipCard } from "@/components/ShipCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Copy, 
  Share2, 
  Trash2, 
  Plus, 
  Filter,
  X
} from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

interface FleetItem {
  ship: Ship;
  count: number;
}

export function FleetBuilder() {
  const [fleet, setFleet] = useState<FleetItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<Ship["shipClass"] | "All">("All");
  const [totalCP, setTotalCP] = useState(0);
  const [activeClasses, setActiveClasses] = useState<Record<Ship["shipClass"], boolean>>({
    Fighter: true,
    Corvette: true,
    Frigate: true,
    Destroyer: true,
    Cruiser: true,
    Battlecruiser: true,
    Carrier: true,
    Battleship: true,
  });

  // Load fleet from localStorage on mount
  useEffect(() => {
    const savedFleet = localStorage.getItem("fleetBuilderFleet");
    if (savedFleet) {
      try {
        const parsedFleet = JSON.parse(savedFleet);
        setFleet(parsedFleet);
        calculateTotalCP(parsedFleet);
      } catch (e) {
        console.error("Failed to parse fleet from localStorage", e);
      }
    }
  }, []);

  // Save fleet to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("fleetBuilderFleet", JSON.stringify(fleet));
    calculateTotalCP(fleet);
  }, [fleet]);

  const calculateTotalCP = (fleetItems: FleetItem[]) => {
    const total = fleetItems.reduce((sum, item) => sum + (item.ship.cp * item.count), 0);
    setTotalCP(total);
  };

  const addShip = (ship: Ship) => {
    setFleet(prevFleet => {
      const existingItem = prevFleet.find(item => item.ship.id === ship.id);
      
      if (existingItem) {
        // If ship already exists, increase count
        return prevFleet.map(item => 
          item.ship.id === ship.id 
            ? { ...item, count: item.count + 1 } 
            : item
        );
      } else {
        // Add new ship
        return [...prevFleet, { ship, count: 1 }];
      }
    });
  };

  const removeShip = (shipId: string) => {
    setFleet(prevFleet => {
      const existingItem = prevFleet.find(item => item.ship.id === shipId);
      
      if (existingItem && existingItem.count > 1) {
        // Decrease count if more than one
        return prevFleet.map(item => 
          item.ship.id === shipId 
            ? { ...item, count: item.count - 1 } 
            : item
        );
      } else {
        // Remove item if count is 1 or less
        return prevFleet.filter(item => item.ship.id !== shipId);
      }
    });
  };

  const clearFleet = () => {
    setFleet([]);
  };

  const importFleet = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const fleetData = urlParams.get("fleet");
    
    if (fleetData) {
      try {
        const decodedFleet = JSON.parse(atob(fleetData));
        setFleet(decodedFleet);
        calculateTotalCP(decodedFleet);
        showSuccess("Fleet imported successfully!");
      } catch (e) {
        showError("Failed to import fleet");
        console.error("Failed to import fleet", e);
      }
    }
  };

  useEffect(() => {
    importFleet();
  }, []);

  const filteredShips = ships.filter(ship => {
    const matchesSearch = ship.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "All" || ship.shipClass === selectedClass;
    const classActive = activeClasses[ship.shipClass];
    return matchesSearch && matchesClass && classActive;
  });

  const getShipClassCount = (shipClass: Ship["shipClass"]) => {
    return fleet
      .filter(item => item.ship.shipClass === shipClass)
      .reduce((sum, item) => sum + item.count, 0);
  };

  const toggleClass = (shipClass: Ship["shipClass"]) => {
    setActiveClasses(prev => ({
      ...prev,
      [shipClass]: !prev[shipClass]
    }));
  };

  const toggleAllClasses = () => {
    const allActive = Object.values(activeClasses).every(active => active);
    setActiveClasses(prev => ({
      Fighter: !allActive,
      Corvette: !allActive,
      Frigate: !allActive,
      Destroyer: !allActive,
      Cruiser: !allActive,
      Battlecruiser: !allActive,
      Carrier: !allActive,
      Battleship: !allActive,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
            Fleet Builder
          </h1>
          <p className="text-gray-400">Create your space fleet with a maximum CP of 400</p>
          
          <div className="flex justify-center mt-4 gap-2">
            <Button 
              onClick={clearFleet}
              variant="destructive"
              className="bg-red-600/20 hover:bg-red-600/30 text-red-300"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Fleet
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-cyan-500/30 backdrop-blur-sm shadow-lg shadow-cyan-500/10">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center gap-2">
                <span className="text-2xl">📊</span> Fleet Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Total CP</span>
                    <span className="font-mono text-cyan-400">{totalCP}/400</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (totalCP / 400) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {SHIP_CLASSES.map(shipClass => (
                    <div key={shipClass} className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">{shipClass}</span>
                      <Badge className="bg-cyan-600/30 text-cyan-300">
                        {getShipClassCount(shipClass)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-cyan-500/30 backdrop-blur-sm shadow-lg shadow-cyan-500/10 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center gap-2">
                <span className="text-2xl">🚀</span> Ship Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Input
                      placeholder="Search ships..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-gray-800/50 border-cyan-500/30 text-white placeholder-gray-400 pl-10"
                    />
                    <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    onClick={toggleAllClasses}
                    variant="outline"
                    className="bg-gray-800/50 border-cyan-500/30 text-white hover:bg-cyan-600/20"
                  >
                    {Object.values(activeClasses).every(active => active) ? "Deselect All" : "Select All"}
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {SHIP_CLASSES.map(shipClass => (
                    <Button
                      key={shipClass}
                      onClick={() => toggleClass(shipClass)}
                      variant={activeClasses[shipClass] ? "default" : "outline"}
                      className={`bg-gray-800/50 border-cyan-500/30 text-white hover:bg-cyan-600/20 ${
                        activeClasses[shipClass] ? "bg-cyan-600/20 text-cyan-300" : ""
                      }`}
                    >
                      {shipClass}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredShips.map(ship => (
                  <ShipCard 
                    key={ship.id} 
                    ship={ship} 
                    onAdd={addShip}
                    disabled={totalCP + ship.cp > 400}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-900/50 border-cyan-500/30 backdrop-blur-sm shadow-lg shadow-cyan-500/10">
          <CardHeader>
            <CardTitle className="text-cyan-300 flex items-center gap-2">
              <span className="text-2xl">📋</span> Your Fleet
            </CardTitle>
          </CardHeader>
          <CardContent>
            {fleet.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>Your fleet is empty. Add ships to get started!</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-cyan-500/30">
                    <TableHead className="text-cyan-300">Ship</TableHead>
                    <TableHead className="text-cyan-300 text-right">Class</TableHead>
                    <TableHead className="text-cyan-300 text-right">CP</TableHead>
                    <TableHead className="text-cyan-300 text-right">Count</TableHead>
                    <TableHead className="text-cyan-300 text-right">Total CP</TableHead>
                    <TableHead className="text-cyan-300 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fleet.map((item) => (
                    <TableRow key={item.ship.id} className="border-cyan-500/20">
                      <TableCell className="font-medium text-cyan-300">{item.ship.name}</TableCell>
                      <TableCell className="text-right">
                        <Badge className="bg-cyan-600/30 text-cyan-300">
                          {item.ship.shipClass}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-cyan-400">{item.ship.cp}</TableCell>
                      <TableCell className="text-right text-cyan-400">{item.count}</TableCell>
                      <TableCell className="text-right text-cyan-400">
                        {item.ship.cp * item.count}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          onClick={() => removeShip(item.ship.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-gray-800/50">
                    <TableCell className="font-bold text-cyan-300">Total</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right text-cyan-400 font-bold">{fleet.reduce((sum, item) => sum + item.count, 0)}</TableCell>
                    <TableCell className="text-right text-cyan-400 font-bold">{totalCP}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}