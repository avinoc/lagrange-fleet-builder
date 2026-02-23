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
  // ... existing ships ...
  
  // New Arctos ships
  { id: "arctos-multi", name: "Arctos - Multi-role Cruiser", shipClass: "Cruiser", tier: "C", cp: 18 },
  { id: "arctos-aa", name: "Arctos Anti-Aircraft Cruiser", shipClass: "Cruiser", tier: "S", cp: 18 },
  { id: "arctos-heavy", name: "Arctos - Heavy Cruiser", shipClass: "Cruiser", tier: "B", cp: 18 },
  
  // ... existing ships continue ...
];