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
  X,
  Download,
  Settings
} from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { supabase } from "@/lib/supabase";

interface FleetItem {
  ship: Ship;
  count: number;
}

// Add the new types
interface FleetRecord {
  id: string;
  fleet_data: { ship: Ship; count: number }[];
  created_at: string;
  expires_at: string;
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
  const [maxCP, setMaxCP] = useState<number>(400);
  const [loading, setLoading] = useState(false);
  const [fetchedFleetId, setFetchedFleetId] = useState<string | null>(null);

  // Load fleet and maxCP from localStorage on mount
  useEffect(() => {
    const savedFleet = localStorage.getItem("fleetBuilderFleet");
    const savedMaxCP = localStorage.getItem("fleetBuilderMaxCP");
    
    if (savedFleet) {
      try {
        const parsedFleet = JSON.parse(savedFleet);
        setFleet(parsedFleet);
        calculateTotalCP(parsedFleet);
      } catch (e) {
        console.error("Failed to parse fleet from localStorage", e);
      }
    }
    
    if (savedMaxCP) {
      try {
        const parsedMaxCP = JSON.parse(savedMaxCP);
        setMaxCP(parsedMaxCP);
      } catch (e) {
        console.error("Failed to parse maxCP from localStorage", e);
      }
    }
  }, []);

  // Save fleet and maxCP to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("fleetBuilderFleet", JSON.stringify(fleet));
    calculateTotalCP(fleet);
  }, [fleet]);

  useEffect(() => {
    localStorage.setItem("fleetBuilderMaxCP", JSON.stringify(maxCP));
  }, [maxCP]);

  const calculateTotalCP = (fleetItems: FleetItem[]) => {
    const total = fleetItems.reduce((sum, item) => sum + (item.ship.cp * item.count), 0);
    setTotalCP(total);
  };

  const addShip = (ship: Ship) => {
    setFleet(prevFleet => {
      const existingItem = prevFleet.find(item => item.ship.id === ship.id);
      
      if (existingItem) {
        return prevFleet.map(item => 
          item.ship.id === ship.id 
            ? { ...item, count: item.count + 1 } 
            : item
        );
      } else {
        return [...prevFleet, { ship: { ...ship }, count: 1 }];
      }
    });
  };

  const reinforceShip = (ship: Ship) => {
    // Create a new ship object with a distinct identifier for reinforcement
    const reinforcedShip = {
      ...ship,
      id: `${ship.id}-reinforced`,
      cp: 0,
    };
    setFleet(prevFleet => {
      const existingItem = prevFleet.find(item => item.ship.id === reinforcedShip.id);
      
      if (existingItem) {
        return prevFleet.map(item => 
          item.ship.id === reinforcedShip.id 
            ? { ...item, count: item.count + 1 } 
            : item
        );
      } else {
        return [...prevFleet, { ship: reinforcedShip, count: 1 }];
      }
    });
  };

  const removeShip = (shipId: string) => {
    setFleet(prevFleet => {
      const existingItem = prevFleet.find(item => item.ship.id === shipId);
      
      if (existingItem && existingItem.count > 1) {
        return prevFleet.map(item => 
          item.ship.id === shipId 
            ? { ...item, count: item.count - 1 } 
            : item
        );
      } else {
        return prevFleet.filter(item => item.ship.id !== shipId);
      }
    });
  };

  const clearFleet = () => {
    setFleet([]);
  };

  // Function to import fleet from URL
  const importFleetFromURL = async (url: string) => {
    const urlParams = new URLSearchParams(url.split('?')[1] || '');
    const fleetId = urlParams.get("fleet");
    
    if (fleetId) {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("fleets")
          .select("*")
          .eq("id", fleetId)
          .maybeSingle();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Convert fleet_data back to FleetItem format
          const parsedFleet = data.fleet_data.map(item => ({
            ship: item.ship,
            count: item.count
          }));
          
          setFleet(parsedFleet);
          setFetchedFleetId(fleetId);
          calculateTotalCP(parsedFleet);
          showSuccess("Fleet imported successfully!");
        } else {
          showError("Fleet not found");
        }
      } catch (e) {
        console.error("Failed to fetch fleet", e);
        showError("Failed to import fleet");
      } finally {
        setLoading(false);
      }
    }
  };

  // Load fleet from URL on mount
  useEffect(() => {
    const url = window.location.href;
    importFleetFromURL(url);
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

  // Generate a new UUID for fleet sharing
  const generateShareCode = async () => {
    if (fleet.length === 0) {
      showError("Your fleet is empty. Add ships to generate a share code.");
      return;
    }
    
    try {
      setLoading(true);
      // Convert fleet to the format that will be stored
      const fleetData = fleet.map(item => ({
        ship: item.ship,
        count: item.count
      }));
      
      // Generate UUID
      const { data: { uuid } } = await supabase
        .rpc('generate_uuid');
      
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7); // 7 days expiration
      
      // Insert to database
      const { data, error } = await supabase
        .from('fleets')
        .insert({
          id: uuid,
          fleet_data: fleetData,
          expires_at: expiryDate.toISOString()
        });
        
      if (error) {
        throw error;
      }
      
      // Create the shortened URL
      const shareUrl = `${window.location.origin}${window.location.pathname}?fleet=${uuid}`;
      
      // Copy to clipboard
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          showSuccess("Share code copied to clipboard!");
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          showError("Failed to copy share code");
        });
    } catch (error) {
      console.error("Error generating share code:", error);
      showError("Failed to generate share code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-50=">
            Fleet Builder
          </h1>
          <p className="text-gray-400">Create your Infinite Lagrange fleet plan</p>
          
          <div className="flex justify-center mt-4 gap-2">
            <Button 
              onClick={generateShareCode}
              variant="outline"
              className="bg-gray-800/50 border-cyan-500/30 text-cyan-300 hover:bg-cyan-600/20"
              disabled={loading}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-cyan-300 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Share2 className="w-4 h-4 mr-2" />
              )}
              Share Fleet
            </Button>
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

        {/* Top-right settings box */}
        <div className="absolute top-4 right-4 z-10">
          <Card className="bg-gray-900/50 border-cyan-500/30 backdrop-blur-sm shadow-lg shadow-cyan-500/10 w-48">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-cyan-300 text-sm font-medium">Max CP</span>
                <Button 
                  onClick={() => setMaxCP(400)}
                  variant="outline"
                  size="sm"
                  className="bg-gray-800/50 border-cyan-500/30 text-cyan-300 hover:bg-cyan-600/20 text-xs px-2 py-1 h-6"
                >
                  Reset
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={maxCP}
                  onChange={(e) => setMaxCP(Number(e.target.value))}
                  className="bg-gray-800/50 border-cyan-500/30 text-white placeholder-gray-400 text-xs w-full"
                  min="0"
                  size={3}
                />
                <span className="text-gray-400 text-xs">Current: {maxCP}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-900/50 border-cyan-500/30 backdrop-blur-sm shadow-lg shadow-cyan-500/10 mb-8">
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
                      <TableCell className="font-medium text-cyan-300">
                        {item.ship.name}
                        {item.ship.id.endsWith('-reinforced') && (
                          <Badge className="bg-purple-600/50 text-purple-300 ml-2">
                            Reinforced
                          </Badge>
                        )}
                      </TableCell>
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

        <Card className="bg-gray-900/50 border-cyan-500/30 backdrop-blur-sm shadow-lg shadow-cyan-500/10">
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
                  className="bg-gray-800/50 border-cyan-500/30 text-white hover:bg-cyan-600/20 text-xs px-3 py-1 h-8"
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
                    className={`bg-gray-800/50 border-cyan-500/30 text-white hover:bg-cyan-600/20 text-xs px-3 py-1 h-8 ${
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
                  onReinforce={reinforceShip}
                  // Only disable the add button, not the reinforce button
                  disabled={totalCP + ship.cp > maxCP}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}