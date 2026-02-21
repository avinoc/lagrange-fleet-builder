"use client";

import React from 'react';
import { Ship } from '../types/ship';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CLASS_ICONS } from '../types/ship';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@radix-ui/react-tooltip';
import { 
  AlertTriangle,
  Shield,
  Zap,
  Target,
  Star,
  AlertCircle,
  Info
} from 'lucide-react';

interface ShipCardProps {
  ship: Ship;
  onReinforce?: (shipId: string) => void;
}

const ShipCard: React.FC<ShipCardProps> = ({ ship, onReinforce }) => {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'A': return 'bg-green-100 text-green-800 border-green-200';
      case 'B': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'C': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'D': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'S': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Sit.': return 'bg-red-100 text-red-800 border-red-200';
      case 'TBD': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getShipClassIcon = (shipClass: string) => {
    return CLASS_ICONS[shipClass as keyof typeof CLASS_ICONS] || '✦';
  };

  return (
    <Card className="w-full max-w-md bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <span className="text-2xl">{getShipClassIcon(ship.shipClass)}</span>
              {ship.name}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={`text-xs font-medium ${getTierColor(ship.tier)}`}>
                {ship.tier}
              </Badge>
              <Badge className="text-xs font-medium bg-gray-100 text-gray-800 border-gray-200">
                {ship.cp} CP
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-medium">Shield</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Shield capacity</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs font-medium">Power</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Power capacity</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-medium">Weapons</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Weapon capacity</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onReinforce && onReinforce(ship.id)}
            >
              Reinforce
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipCard;