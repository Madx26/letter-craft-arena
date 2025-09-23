import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Trophy, Target } from "lucide-react";

interface PlayerPanelProps {
  playerId: 1 | 2;
  score: number;
  isActive: boolean;
  wordCount: number;
}

const PlayerPanel = ({ playerId, score, isActive, wordCount }: PlayerPanelProps) => {
  const playerColor = playerId === 1 ? 'player-1' : 'player-2';
  const playerName = playerId === 1 ? 'Teal' : 'Amber';
  
  return (
    <Card className={`
      border-2 transition-all duration-300 shadow-soft
      ${isActive 
        ? `border-${playerColor} bg-gradient-card shadow-medium scale-105` 
        : 'border-border bg-gradient-card'
      }
    `}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className={`
            w-3 h-3 rounded-full 
            ${playerId === 1 ? 'bg-player-1' : 'bg-player-2'}
          `} />
          <span className="font-heading font-semibold text-foreground">
            Player {playerId}
          </span>
          <Badge 
            variant="outline" 
            className={`
              border-${playerColor} text-${playerColor} text-xs
            `}
          >
            {playerName}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              Score
            </span>
            <span className={`
              text-2xl font-game font-bold
              ${playerId === 1 ? 'text-player-1' : 'text-player-2'}
            `}>
              {score}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Target className="w-4 h-4" />
              Words
            </span>
            <span className="text-lg font-heading font-semibold text-foreground">
              {wordCount}
            </span>
          </div>
        </div>
        
        {isActive && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-2 text-sm">
              <div className={`
                w-2 h-2 rounded-full animate-pulse
                ${playerId === 1 ? 'bg-player-1' : 'bg-player-2'}
              `} />
              <span className="text-muted-foreground font-body">Your turn</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlayerPanel;