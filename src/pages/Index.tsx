"use client";

import React, { useState } from 'react';
import { Ship } from '../types/ship';
import ShipCard from '../components/ShipCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const IndexPage = () => {
  const [ships] = useState<Ship[]>([
    // ... (all ships from the ships array)
    { id: "at021-pulse", name: "AT021 - Pulse Attacker", shipClass: "Fighter", tier: "A", cp: 0 },
    { id: "at021-tactical", name: "AT021 - Tactical Attacker", shipClass: "Fighter", tier: "B", cp: 0 },
    { id: "at021-heavy", name: "AT021 - Heavy Attacker", shipClass: "Fighter", tier: "A", cp: 0 },
    { id: "b192-newland", name: "B192 Newland - Heavy Attacker", shipClass: "Fighter", tier: "C", cp: 0 },
    { id: "balancer-sc020", name: "Balancer Anderson SC020 - Scout", shipClass: "Fighter", tier: "B", cp: 0 },
    { id: "bullfrog-bomber", name: "Bullfrog - Dual-Purpose Bomber", shipClass: "Fighter", tier: "C", cp: 0 },
    { id: "hayreddin-loyal", name: "Hayreddin's Loyal - Pulsar Fighter", shipClass: "Fighter", tier: "B", cp: 0 },
    { id: "janbiya-aer410", name: "Janbiya Aer410 - Assault Attacker", shipClass: "Fighter", tier: "D", cp: 0 },
    { id: "mistral-combat", name: "Mistral - Combat Attacker", shipClass: "Fighter", tier: "S", cp: 0 },
    { id: "sandrake-interceptor", name: "Sandrake - Atmospheric Interceptor", shipClass: "Fighter", tier: "B", cp: 0 },
    { id: "sc002-quantum", name: "SC002 - Quantum Scout", shipClass: "Fighter", tier: "B", cp: 0 },
    { id: "spore-a404", name: "Spore A404 - Light Fighter", shipClass: "Fighter", tier: "A", cp: 0 },
    { id: "stingray-torpedo", name: "Stingray - Torpedo Bomber", shipClass: "Fighter", tier: "A", cp: 0 },
    { id: "strix-a100", name: "Strix A100 - Joint Attacker", shipClass: "Fighter", tier: "A", cp: 0 },
    { id: "vitas-a021", name: "Vitas A021 - Heavy Attacker", shipClass: "Fighter", tier: "A", cp: 0 },
    { id: "vitas-b010", name: "Vitas-B010 - Bomber", shipClass: "Fighter", tier: "S", cp: 0 },
    { id: "merak-light", name: "Merak - Light Attacker", shipClass: "Fighter", tier: "TBD", cp: 0 },
    { id: "merak-combat", name: "Merak - Combat Attacker", shipClass: "Fighter", tier: "TBD", cp: 0 },
    { id: "cellular-defender", name: "Cellular Defender - Heavy Torpedo Corvette", shipClass: "Corvette", tier: "S", cp: 0 },
    { id: "cv-ii003", name: "CV-II003 - Light Corvette", shipClass: "Corvette", tier: "D", cp: 0 },
    { id: "cv-m011-missile", name: "CV-M011 - Heavy Missile Corvette", shipClass: "Corvette", tier: "B", cp: 0 },
    { id: "cv-m011-cannon", name: "CV-M011 - Heavy Cannon Corvette", shipClass: "Corvette", tier: "C", cp: 0 },
    { id: "cv-m011-highspeed", name: "CV-M011 - High Speed Missile Corvette", shipClass: "Corvette", tier: "A", cp: 0 },
    { id: "cv-t800", name: "CV-T800 - Pulsar Corvette", shipClass: "Corvette", tier: "S", cp: 0 },
    { id: "nebula-heavy", name: "Nebula Chaser - Heavy Corvette", shipClass: "Corvette", tier: "B", cp: 0 },
    { id: "nebula-pulsar", name: "Nebula Chaser - Pulsar Corvette", shipClass: "Corvette", tier: "A", cp: 0 },
    { id: "redbeast-713", name: "RedBeast 7-13 - Missile Corvette", shipClass: "Corvette", tier: "A", cp: 0 },
    { id: "s-levy9", name: "S-Levy9 - Heavy Torpedo Escort Corvette", shipClass: "Corvette", tier: "A", cp: 0 },
    { id: "silent-assassin", name: "Silent Assassin - Armored Corvette", shipClass: "Corvette", tier: "C", cp: 0 },
    { id: "void-elfin", name: "Void Elfin - Stealth Missile Corvette", shipClass: "Corvette", tier: "A", cp: 0 },
    { id: "phecda-heavy", name: "Phecda - Heavy Corvette", shipClass: "Corvette", tier: "TBD", cp: 0 },
    { id: "phecda-assault", name: "Phecda - Assault Corvette", shipClass: "Corvette", tier: "TBD", cp: 0 },
    { id: "carilion-cannon", name: "Carilion - Heavy Cannon Frigate", shipClass: "Frigate", tier: "A", cp: 5 },
    { id: "carilion-recon", name: "Carilion - Recon Frigate", shipClass: "Frigate", tier: "Sit.", cp: 4 },
    { id: "carilion-special", name: "Carilion - Special Frigate", shipClass: "Frigate", tier: "S", cp: 5 },
    { id: "fg300-armored", name: "FG300 - Armored Frigate", shipClass: "Frigate", tier: "C", cp: 3 },
    { id: "fg300-multi", name: "FG300 - Multi-Role Frigate", shipClass: "Frigate", tier: "D", cp: 3 },
    { id: "fg300-recon", name: "FG300 - Recon Frigate", shipClass: "Frigate", tier: "Sit.", cp: 3 },
    { id: "mare-imbrium-assault", name: "Mare Imbrium - Assault Frigate", shipClass: "Frigate", tier: "S", cp: 5 },
    { id: "mare-imbrium-pulse", name: "Mare Imbrium - Experimental Pulse Cannon Frigate", shipClass: "Frigate", tier: "A", cp: 8 },
    { id: "mare-nubium-aa", name: "Mare Nubium - Anti-Aircraft Frigate", shipClass: "Frigate", tier: "D", cp: 4 },
    { id: "mare-nubium-landing", name: "Mare Nubium - Light Landing Ship", shipClass: "Frigate", tier: "Sit.", cp: 4 },
    { id: "mare-serenitatis-aa", name: "Mare Serenitatis - Anti-Aircraft Frigate", shipClass: "Frigate", tier: "A", cp: 5 },
    { id: "mare-serenitatis-heavy", name: "Mare Serenitatis - Heavy Frigate", shipClass: "Frigate", tier: "A", cp: 5 },
    { id: "mare-serenitatis-missile", name: "Mare Serenitatis - Missile Frigate", shipClass: "Frigate", tier: "C", cp: 5 },
    { id: "mare-tranq-interceptor", name: "Mare Tranquillitatis - Interceptor Frigate", shipClass: "Frigate", tier: "B", cp: 4 },
    { id: "mare-tranq-missile", name: "Mare Tranquillitatis - Missile Frigate", shipClass: "Frigate", tier: "C", cp: 4 },
    { id: "mare-tranq-pulse", name: "Mare Tranquillitatis - Pulse Cannon Frigate", shipClass: "Frigate", tier: "A", cp: 4 },
    { id: "noma-m470-aa", name: "NOMA M470 - Anti-Aircraft Frigate", shipClass: "Frigate", tier: "D", cp: 6 },
    { id: "noma-m470-landing", name: "NOMA M470 - Heavy Landing Ship", shipClass: "Frigate", tier: "Sit.", cp: 6 },
    { id: "noma-m470-support", name: "NOMA M470 - Support Frigate", shipClass: "Frigate", tier: "S", cp: 6 },
    { id: "reliat-rapid", name: "Reliat - Rapid Torpedo Frigate", shipClass: "Frigate", tier: "B", cp: 4 },
    { id: "reliat-stealth", name: "Reliat - Stealth Frigate", shipClass: "Frigate", tier: "S", cp: 4 },
    { id: "reliat-tactical", name: "Reliat - Tactical Torpedo Frigate", shipClass: "Frigate", tier: "S", cp: 4 },
    { id: "ruby-ion", name: "Ruby - Experimental Ion Cannon Frigate", shipClass: "Frigate", tier: "A", cp: 8 },
    { id: "ruby-defensive", name: "Ruby - Heavy Defensive Frigate", shipClass: "Frigate", tier: "A", cp: 5 },
    { id: "ruby-railgun", name: "Ruby - Heavy Railgun Frigate", shipClass: "Frigate", tier: "B", cp: 5 },
    { id: "xenostinger-tactical", name: "XenoStinger - Tactical Frigate", shipClass: "Frigate", tier: "S", cp: 8 },
    { id: "xenostinger-aa", name: "XenoStinger - Anti-Aircraft Frigate", shipClass: "Frigate", tier: "A", cp: 6 },
    { id: "alkiad-generic", name: "Alkiad - Generic Frigate", shipClass: "Frigate", tier: "TBD", cp: 6 },
    { id: "alkiad-special", name: "Alkiad - Special Frigate", shipClass: "Frigate", tier: "TBD", cp: 6 },
    { id: "ac721-assault", name: "AC721 - Heavy Dual-Purpose Assault Ship", shipClass: "Destroyer", tier: "C", cp: 12 },
    { id: "ac721-missile", name: "AC721 - Heavy Missile Destroyer", shipClass: "Destroyer", tier: "B", cp: 8 },
    { id: "ac721-logistics", name: "AC721 - Heavy Logistics Destroyer", shipClass: "Destroyer", tier: "Sit.", cp: 8 },
    { id: "aldabra-cannon", name: "Aldabra - Heavy Cannon Destroyer", shipClass: "Destroyer", tier: "A", cp: 8 },
    { id: "aldabra-assault", name: "Aldabra - Heavy Assault Destroyer", shipClass: "Destroyer", tier: "B", cp: 8 },
    { id: "ceres-aircraft", name: "Ceres - Aircraft Destroyer", shipClass: "Destroyer", tier: "C", cp: 8 },
    { id: "ceres-support", name: "Ceres - Support Destroyer", shipClass: "Destroyer", tier: "S", cp: 8 },
    { id: "ceres-tactical", name: "Ceres - Tactical Destroyer", shipClass: "Destroyer", tier: "B", cp: 8 },
    { id: "eris-armored", name: "Eris I - Armored Destroyer", shipClass: "Destroyer", tier: "C", cp: 7 },
    { id: "eris-cannon", name: "Eris I - Heavy Cannon Destroyer", shipClass: "Destroyer", tier: "S", cp: 9 },
    { id: "eris-maneuver", name: "Eris I - Maneuver Assault Destroyer", shipClass: "Destroyer", tier: "B", cp: 7 },
    { id: "guardian-dual", name: "Guardian - Dual-Purpose Assault Ship", shipClass: "Destroyer", tier: "C", cp: 14 },
    { id: "guardian-pulse", name: "Guardian - Experimental Pulse Assault Ship", shipClass: "Destroyer", tier: "A", cp: 9 },
    { id: "guardian-support", name: "Guardian - Support Destroyer", shipClass: "Destroyer", tier: "A", cp: 9 },
    { id: "quaoar-railgun", name: "Quaoar - Railgun Destroyer", shipClass: "Destroyer", tier: "A", cp: 6 },
    { id: "quaoar-torpedo", name: "Quaoar - Torpedo Destroyer", shipClass: "Destroyer", tier: "A", cp: 6 },
    { id: "taurus-pulse", name: "Taurus - Pulse Cannon Destroyer", shipClass: "Destroyer", tier: "A", cp: 8 },
    { id: "taurus-defensive", name: "Taurus - Defensive Destroyer", shipClass: "Destroyer", tier: "A", cp: 8 },
    { id: "taurus-assault", name: "Taurus - Assault Destroyer", shipClass: "Destroyer", tier: "A", cp: 8 },
    { id: "tundra-tactical", name: "Tundra - Tactical Destroyer", shipClass: "Destroyer", tier: "A", cp: 9 },
    { id: "tundra-aircraft", name: "Tundra - Aircraft Destroyer", shipClass: "Destroyer", tier: "S", cp: 9 },
    { id: "winged-hussar-aa", name: "Winged Hussar - Area-Denial Anti-Aircraft Destroyer", shipClass: "Destroyer", tier: "A", cp: 6 },
    { id: "winged-hussar-missile", name: "Winged Hussar - Light Missile Destroyer", shipClass: "Destroyer", tier: "B", cp: 6 },
    { id: "winged-hussar-integrated", name: "Winged Hussar - Integrated Missile Destroyer", shipClass: "Destroyer", tier: "B", cp: 6 },
    { id: "mizar-maneuver", name: "Mizar - Maneuver Destroyer", shipClass: "Destroyer", tier: "TBD", cp: 12 },
    { id: "mizar-torpedo", name: "Mizar - Torpedo Destroyer", shipClass: "Destroyer", tier: "TBD", cp: 12 },
    { id: "callisto-cluster", name: "Callisto - Cluster Torpedo Raid Ship", shipClass: "Cruiser", tier: "A", cp: 20 },
    { id: "callisto-heavy", name: "Callisto - Heavy Torpedo Raid Ship", shipClass: "Cruiser", tier: "S", cp: 20 },
    { id: "callisto-uav", name: "Callisto - Heavy UAV Cruiser", shipClass: "Cruiser", tier: "A", cp: 20 },
    { id: "cas066-auxiliary", name: "CAS066 - Auxiliary Cruiser", shipClass: "Cruiser", tier: "S", cp: 18 },
    { id: "cas066-aircraft", name: "CAS066 - Aircraft Cruiser", shipClass: "Cruiser", tier: "C", cp: 18 },
    { id: "cas066-artillery", name: "CAS066 - Artillery Cruiser", shipClass: "Cruiser", tier: "B", cp: 18 },
    { id: "cas066-generic", name: "CAS066 - Generic Cruiser", shipClass: "Cruiser", tier: "B", cp: 18 },
    { id: "chimera-cannon", name: "Chimera - Cannon Cruiser", shipClass: "Cruiser", tier: "A", cp: 18 },
    { id: "chimera-defensive", name: "Chimera - Defensive Cruiser", shipClass: "Cruiser", tier: "C", cp: 20 },
    { id: "chimera-heavy", name: "Chimera - Heavy Cruiser", shipClass: "Cruiser", tier: "B", cp: 20 },
    { id: "conamara-railgun", name: "Conamara Chaos - Railgun Cruiser", shipClass: "Cruiser", tier: "C", cp: 20 },
    { id: "conamara-plasma", name: "Conamara Chaos - High-Speed Plasma Cruiser", shipClass: "Cruiser", tier: "S", cp: 20 },
    { id: "io-ion", name: "Io - Assault Ion Cannon Cruiser", shipClass: "Cruiser", tier: "S", cp: 18 },
    { id: "io-siege", name: "Io - Assault Ion Cannon Cruiser (Siege)", shipClass: "Cruiser", tier: "Sit.", cp: 18 },
    { id: "io-highspeed", name: "Io - High-Speed Ion Cannon Cruiser", shipClass: "Cruiser", tier: "S", cp: 18 },
    { id: "jaeger-aircraft", name: "Jaeger - Heavy Aircraft Cruiser", shipClass: "Cruiser", tier: "B", cp: 20 },
    { id: "jaeger-cannon", name: "Jaeger - Heavy Cannon Cruiser", shipClass: "Cruiser", tier: "D", cp: 18 },
    { id: "kccpv-aircraft", name: "KCCPV2.0 - Light Aircraft Cruiser", shipClass: "Cruiser", tier: "C", cp: 16 },
    { id: "kccpv-attack", name: "KCCPV2.0 - Light Attack Cruiser", shipClass: "Cruiser", tier: "D", cp: 16 },
    { id: "kccpv-pulse", name: "KCCPV2.0 - Light Pulse Attack Cruiser", shipClass: "Cruiser", tier: "D", cp: 16 },
    { id: "kccpv-railgun", name: "KCCPV2.0 - Light Railgun Cruiser", shipClass: "Cruiser", tier: "D", cp: 16 },
    { id: "lightcone-aa", name: "Light Cone - Area-Denial Anti-Aircraft Cruiser", shipClass: "Cruiser", tier: "A", cp: 20 },
    { id: "lightcone-multirole", name: "Light Cone - Multi-Role Missile Cruiser", shipClass: "Cruiser", tier: "A", cp: 20 },
    { id: "lightcone-offensive", name: "Light Cone - Offensive Missile Cruiser", shipClass: "Cruiser", tier: "A", cp: 20 },
    { id: "predator-aircraft", name: "Predator - Aircraft Cruiser", shipClass: "Cruiser", tier: "C", cp: 18 },
    { id: "predator-aa", name: "Predator - Anti-Aircraft Cruiser", shipClass: "Cruiser", tier: "B", cp: 18 },
    { id: "predator-tactical", name: "Predator - Tactical Aircraft Cruiser", shipClass: "Cruiser", tier: "B", cp: 18 },
    { id: "ranger-comprehensive", name: "Ranger - Comprehensive Warfare Cruiser", shipClass: "Cruiser", tier: "B", cp: 18 },
    { id: "ranger-ion", name: "Ranger - Heavy Ion Cannon Cruiser", shipClass: "Cruiser", tier: "A", cp: 18 },
    { id: "alioth-repair", name: "Alioth - Repair Cruiser", shipClass: "Cruiser", tier: "TBD", cp: 20 },
    { id: "alioth-defensive", name: "Alioth - Defensive Cruiser", shipClass: "Cruiser", tier: "TBD", cp: 20 },
    { id: "alioth-support", name: "Alioth - Support Cruiser", shipClass: "Cruiser", tier: "TBD", cp: 20 },
    { id: "xt-20-auxiliary", name: "XT-20 - Auxiliary Cruiser", shipClass: "Cruiser", tier: "A", cp: 14 },
    { id: "constantine", name: "Constantine the Great - Multi-Role Battlecruiser", shipClass: "Battlecruiser", tier: "A", cp: 35 },
    { id: "eternal-storm", name: "Eternal Storm - Attack Battlecruiser", shipClass: "Battlecruiser", tier: "A", cp: 32 },
    { id: "spear-uranus", name: "Spear of Uranus - Heavy Battlecruiser", shipClass: "Battlecruiser", tier: "S", cp: 35 },
    { id: "st59-defensive", name: "ST59 - Defensive Battlecruiser", shipClass: "Battlecruiser", tier: "A", cp: 28 },
    { id: "thunderbolt-star", name: "Thunderbolt Star - Multi-Role Arsenal Ship", shipClass: "Battlecruiser", tier: "A", cp: 35 },
    { id: "plutus-shield", name: "Shield of Plutus", shipClass: "Battlecruiser", tier: "S", cp: 35 },
    { id: "megrez", name: "Megrez - Heavy Defensive Battlecruiser", shipClass: "Battlecruiser", tier: "TBD", cp: 35 },
    { id: "cv3000", name: "CV3000 - High-Speed Carrier", shipClass: "Carrier", tier: "A", cp: 40 },
    { id: "marshal-crux", name: "Marshal Crux - Carrier", shipClass: "Carrier", tier: "A", cp: 40 },
    { id: "solar-whale", name: "Solar Whale - Armed Tactical Carrier", shipClass: "Carrier", tier: "S", cp: 55 },
    { id: "eternal-heavens", name: "Eternal Heavens - UAV Carrier", shipClass: "Carrier", tier: "A", cp: 40 },
    { id: "dubhe", name: "Dubhe - Support Carrier", shipClass: "Carrier", tier: "TBD", cp: 40 },
    { id: "warspite", name: "Warspite", shipClass: "Battleship", tier: "-", cp: 100 },
  ]);

  const [fleet, setFleet] = useState<Ship[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedTier, setSelectedTier] = useState<string>('All');

  const MAX_FLEET_SIZE = 9;

  const handleReinforce = (ship: Ship) => {
    if (fleet.length < MAX_FLEET_SIZE) {
      setFleet([...fleet, ship]);
    }
  };

  const filteredShips = ships.filter(ship => {
    const matchesSearch = ship.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'All' || ship.shipClass === selectedClass;
    const matchesTier = selectedTier === 'All' || ship.tier === selectedTier;
    return matchesSearch && matchesClass && matchesTier;
  });

  const uniqueTiers = Array.from(new Set(ships.map(ship => ship.tier))).sort();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center py-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">Starship Fleet Builder</h1>
          <p className="text-lg text-indigo-600">Reinforce your fleet with powerful ships</p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Ships</label>
              <Input
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ship Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Classes</SelectItem>
                  <SelectItem value="Fighter">Fighter</SelectItem>
                  <SelectItem value="Corvette">Corvette</SelectItem>
                  <SelectItem value="Frigate">Frigate</SelectItem>
                  <SelectItem value="Destroyer">Destroyer</SelectItem>
                  <SelectItem value="Cruiser">Cruiser</SelectItem>
                  <SelectItem value="Battlecruiser">Battlecruiser</SelectItem>
                  <SelectItem value="Carrier">Carrier</SelectItem>
                  <SelectItem value="Battleship">Battleship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rank</label>
              <Select value={selectedTier} onValueChange={setSelectedTier}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Ranks</SelectItem>
                  {uniqueTiers.map(tier => (
                    <SelectItem key={tier} value={tier}>{tier}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Available Ships ({filteredShips.length})
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                Fleet: {fleet.length}/{MAX_FLEET_SIZE}
              </span>
              <Badge variant="secondary" className="text-xs">
                CP: {fleet.reduce((sum, ship) => sum + ship.cp, 0)}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredShips.map(ship => (
              <ShipCard 
                key={ship.id} 
                ship={ship} 
                onReinforce={handleReinforce}
                fleetSize={fleet.length}
                maxFleetSize={MAX_FLEET_SIZE}
              />
            ))}
          </div>
        </div>

        {fleet.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Fleet</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {fleet.map((ship, index) => (
                <Card key={index} className="border-2 border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">
                      {ship.name}
                    </CardTitle>
                    <div className="flex justify-between items-center mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {ship.shipClass}
                      </Badge>
                      <span className="text-sm font-medium text-gray-600">
                        Rank: {ship.tier}
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPage;