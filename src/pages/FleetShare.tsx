import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Ship, ships, SHIP_CLASSES } from '@/types/ship';
import { ShipCard } from '@/components/ShipCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
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
import { useParams, useNavigate } from "react-router-dom";

interface FleetItem {
  ship: Ship;
  count: number;
}

export function FleetShare() {
  const { uuid } = useParams();
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
  const navigate = useNavigate();

  // Load fleet from Supabase on mount
  useEffect(() => {
    if (uuid) {
      loadFleet(uuid);
    }
  }, [uuid]);

  const loadFleet = async (uuid: string) => {
    const { data, error } = await supabase
      .from('fleets')
      .select('fleet_data')
      .eq('id', uuid)
      .single();

    if (error) {
      showError("Failed to load fleet");
      console.error("Error loading fleet:", error);
      return;
    }

    if (data) {
      try {
        const parsedFleet = JSON.parse(data.fleet_data);
        setFleet(parsedFleet);
        calculateTotalCP(parsedFleet);
        showSuccess("Fleet loaded successfully!");
      } catch (e) {
        showError("Failed to parse fleet data");
        console.error("Failed to parse fleet data", e);
      }
    }
  };

  const calculateTotalCP = (fleetItems: FleetItem[]) => {
    const total = fleetItems.reduce((sum, item) => sum + (item.ship.cp * item.count), 0);
    setTotalCP(total);
  };

  // Disable all interactive functions in FleetShare mode
  const addShip = () => {};
  const reinforceShip = () => {};
  const removeShip = () => {};
  const clearFleet = () => {};
  const generateShareCode = () => {};

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

  const toggleClass = (shipClass: Ship["shipClass"]) => {};
  const toggleAllClasses = () => {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
            Fleet Builder
          </h1>
          <p className="text-gray-400">View your Infinite Lagrange fleet plan</p>
          
          <div className="flex justify-center mt-4 gap-2">
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="bg-gray-800/50 border-cyan-500/30 text-cyan-300 hover:bg-cyan-600/20"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Return to Builder
            </Button>
          </div>
        </div>

        <Card className="bg-gray-900/50 border-cyan-500/30 backdrop-blur-sm shadow-lg shadow-cyan-500/10 mb-8">
          <CardHeader>
            <CardTitle className="text-cyan-300 flex items-center gap-2">
              <span className="text-2xl">📋</span> Shared Fleet
            </CardTitle>
          </CardHeader>
          <CardContent>
            {fleet.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>Invalid fleet data or expired link. This fleet may have expired after 24 hours.</p>
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
                        {/* Disabled in share view */}
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

        {/* Display message if fleet is expired */}
        {fleet.length > 0 && (
          <div className="mt-4 p-4 bg-gray-800/50 border-l-4 border-cyan-500/30 text-cyan-300">
            <p className="text-sm">This fleet will expire in 24 hours. The original creator can view and modify this fleet at any time.</p>
          </div>
        )}

        <div className="mt-8 text-center text-gray-400">
          <p>Share this link to allow others to view your fleet plan.</p>
        </div>
      </div>
    </div>
  );
}