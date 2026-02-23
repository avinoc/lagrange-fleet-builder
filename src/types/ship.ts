export type ShipClass = 
  | "Fighter"
  | "Corvette"
  | "Frigate"
  | "Destroyer"
  | "Cruiser"
  | "Battlecruiser"
  | "Carrier"
  | "Battleship";

export interface Ship {
  id: string;
  name: string;
  shipClass: ShipClass;
  tier: string;
  cp: number;
}

export const SHIP_CLASSES: ShipClass[] = [
  "Fighter",
  "Corvette",
  "Frigate",
  "Destroyer",
  "Cruiser",
  "Battlecruiser",
  "Carrier",
  "Battleship",
];

export const CLASS_ICONS: Record<ShipClass, string> = {
  Fighter: "✦",
  Corvette: "◆",
  Frigate: "▲",
  Destroyer: "⬡",
  Cruiser: "◉",
  Battlecruiser: "⬢",
  Carrier: "⊞",
  Battleship: "★",
};

export const ships: Ship[] = [
  // Fighter ships
  { id: "f1", name: "Mars", shipClass: "Fighter", tier: "S", cp: 6 },
  { id: "f2", name: "Jupiter", shipClass: "Fighter", tier: "A", cp: 8 },
  { id: "f3", name: "Venus", shipClass: "Fighter", tier: "B", cp: 10 },
  
  // Corvette ships
  { id: "c1", name: "Orion", shipClass: "Corvette", tier: "A", cp: 12 },
  { id: "c2", name: "Polaris", shipClass: "Corvette", tier: "B", cp: 14 },
  { id: "c3", name: "Sirius", shipClass: "Corvette", tier: "C", cp: 16 },
  
  // Frigate ships
  { id: "fr1", name: "Andromeda", shipClass: "Frigate", tier: "S", cp: 18 },
  { id: "fr2", name: "Cassiopeia", shipClass: "Frigate", tier: "A", cp: 20 },
  { id: "fr3", name: "Perseus", shipClass: "Frigate", tier: "B", cp: 22 },
  
  // Destroyer ships
  { id: "d1", name: "Spartan", shipClass: "Destroyer", tier: "S", cp: 24 },
  { id: "d2", name: "Navy", shipClass: "Destroyer", tier: "A", cp: 26 },
  { id: "d3", name: "Valor", shipClass: "Destroyer", tier: "B", cp: 28 },
  
  // Cruiser ships
  { id: "cruiser1", name: "Arctos - Multi-role Cruiser", shipClass: "Cruiser", tier: "C", cp: 18 },
  { id: "cruiser2", name: "Arctos Anti-Aircraft Cruiser", shipClass: "Cruiser", tier: "S", cp: 18 },
  { id: "cruiser3", name: "Arctos - Heavy Cruiser", shipClass: "Cruiser", tier: "B", cp: 18 },
  
  // Battlecruiser ships
  { id: "bc1", name: "Aurora", shipClass: "Battlecruiser", tier: "S", cp: 30 },
  { id: "bc2", name: "Goliath", shipClass: "Battlecruiser", tier: "A", cp: 32 },
  
  // Carrier ships
  { id: "carrier1", name: "Nimitz", shipClass: "Carrier", tier: "S", cp: 36 },
  { id: "carrier2", name: "Enterprise", shipClass: "Carrier", tier: "A", cp: 38 },
  
  // Battleship ships
  { id: "bs1", name: "Titan", shipClass: "Battleship", tier: "S", cp: 42 },
  { id: "bs2", name: "Leviathan", shipClass: "Battleship", tier: "A", cp: 44 }
];