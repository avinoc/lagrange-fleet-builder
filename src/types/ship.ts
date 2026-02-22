export type ShipClass = 
  | "Fighter"
  | "Corvette"
  | "Frigate"
  | "Destroyer"
  | "Cruiser"
  | "Battlecruiser"
  | "Carrier"
  | "Battleship";

export const SHIP_CLASSES: ShipClass[] = [
  "Fighter",
  "Corvette",
  "Frigate",
  "Destroyer",
  "Cruiser",
  "Battlecruiser",
  "Carrier",
  "Battleship"
];

export interface Ship {
  id: string;
  name: string;
  shipClass: ShipClass;
  cp: number;
  rank: "S" | "A" | "B" | "C" | "D";
  description?: string;
}

export const CLASS_ICONS: Record<ShipClass, string> = {
  Fighter: "✈️",
  Corvette: "⛵",
  Frigate: "🚤",
  Destroyer: "🚢",
  Cruiser: "⚓",
  Battlecruiser: "⚔️",
  Carrier: "🛳️",
  Battleship: "⚓"
};

export const ships: Ship[] = [
  // ... existing ships ...
  {
    id: "br050-bomber-standard",
    name: "BR050 Bomber - Standard",
    shipClass: "Frigate",
    cp: 0,
    rank: "A",
    description: "Standard BR050 Bomber"
  },
  // ... existing ships ...
];