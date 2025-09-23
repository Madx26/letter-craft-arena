import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Sparkles } from "lucide-react";
import { Word } from "@/pages/Game";

interface WordHistoryProps {
  words: Word[];
}

const WordHistory = ({ words }: WordHistoryProps) => {
  const sortedWords = [...words].sort((a, b) => b.timestamp - a.timestamp);
  
  return (
    <Card className="bg-gradient-card border-border shadow-medium h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-heading flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-score-highlight" />
          Word History
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {words.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-body">No words formed yet</p>
            <p className="text-xs opacity-75">Start placing letters!</p>
          </div>
        ) : (
          <ScrollArea className="h-96">
            <div className="p-4 space-y-3">
              {sortedWords.map((word, index) => (
                <div 
                  key={`${word.text}-${word.timestamp}-${index}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-accent border border-border hover:shadow-soft transition-all duration-200"
                >
                  <div className="flex items-center gap-2">
                    <div className={`
                      w-2 h-2 rounded-full
                      ${word.playerId === 1 ? 'bg-player-1' : 'bg-player-2'}
                    `} />
                    <span className="font-game font-semibold text-foreground uppercase tracking-wider">
                      {word.text}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary"
                      className={`
                        text-xs font-semibold
                        ${word.playerId === 1 
                          ? 'bg-player-1-light text-player-1' 
                          : 'bg-player-2-light text-player-2'
                        }
                      `}
                    >
                      P{word.playerId}
                    </Badge>
                    <Badge 
                      className="bg-score-highlight-bg text-score-highlight border-score-highlight"
                    >
                      +{word.score}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default WordHistory;