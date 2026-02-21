import { useState } from 'react';
import { Ship } from '../types/ship';

export const useFleet = () => {
  const [fleet, setFleet] = useState<Ship[]>(() => {
    const savedFleet = localStorage.getItem('fleet');
    return savedFleet ? JSON.parse(savedFleet) : [];
  });

  const addToFleet = (ship: Ship) => {
    setFleet(prevFleet => {
      const newFleet = [...prevFleet, ship];
      localStorage.setItem('fleet', JSON.stringify(newFleet));
      return newFleet;
    });
  };

  const removeFromFleet = (shipId: string) => {
    setFleet(prevFleet => {
      const newFleet = prevFleet.filter(ship => ship.id !== shipId);
      localStorage.setItem('fleet', JSON.stringify(newFleet));
      return newFleet;
    });
  };

  const isInFleet = (shipId: string) => {
    return fleet.some(ship => ship.id === shipId);
  };

  const getFleetTotalCP = () => {
    return fleet.reduce((total, ship) => total + ship.cp, 0);
  };

  return {
    fleet,
    addToFleet,
    removeFromFleet,
    isInFleet,
    getFleetTotalCP
  };
};