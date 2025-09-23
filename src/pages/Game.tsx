import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, RotateCcw, Trophy, Star, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import GameGrid from "@/components/GameGrid";
import PlayerPanel from "@/components/PlayerPanel";
import WordHistory from "@/components/WordHistory";
import { validateWord, calculateScore } from "@/lib/gameLogic";

export type CellState = {
  letter: string;
  playerId: 1 | 2;
} | null;

export type Word = {
  text: string;
  score: number;
  playerId: 1 | 2;
  timestamp: number;
};

const GRID_SIZE = 8;

const Game = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [grid, setGrid] = useState<CellState[][]>(() => 
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [letterInput, setLetterInput] = useState("");
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [words, setWords] = useState<Word[]>([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [winner, setWinner] = useState<1 | 2 | 'tie' | null>(null);

  const checkForWords = useCallback((newGrid: CellState[][]) => {
    const newWords: Word[] = [];
    
    // Check horizontal words
    for (let row = 0; row < GRID_SIZE; row++) {
      let currentWord = "";
      let wordCells: {letter: string, playerId: 1 | 2}[] = [];
      
      for (let col = 0; col <= GRID_SIZE; col++) {
        const cell = col < GRID_SIZE ? newGrid[row][col] : null;
        
        if (cell && cell.letter) {
          currentWord += cell.letter;
          wordCells.push(cell);
        } else {
          if (currentWord.length >= 2) {
            if (validateWord(currentWord)) {
              const lastPlayerId = wordCells[wordCells.length - 1].playerId;
              newWords.push({
                text: currentWord,
                score: calculateScore(currentWord),
                playerId: lastPlayerId,
                timestamp: Date.now()
              });
            }
          }
          currentWord = "";
          wordCells = [];
        }
      }
    }
    
    // Check vertical words
    for (let col = 0; col < GRID_SIZE; col++) {
      let currentWord = "";
      let wordCells: {letter: string, playerId: 1 | 2}[] = [];
      
      for (let row = 0; row <= GRID_SIZE; row++) {
        const cell = row < GRID_SIZE ? newGrid[row][col] : null;
        
        if (cell && cell.letter) {
          currentWord += cell.letter;
          wordCells.push(cell);
        } else {
          if (currentWord.length >= 2) {
            if (validateWord(currentWord)) {
              const lastPlayerId = wordCells[wordCells.length - 1].playerId;
              newWords.push({
                text: currentWord,
                score: calculateScore(currentWord),
                playerId: lastPlayerId,
                timestamp: Date.now()
              });
            }
          }
          currentWord = "";
          wordCells = [];
        }
      }
    }
    
    return newWords;
  }, []);

  const placeLetter = useCallback(() => {
    if (!selectedCell || !letterInput.trim()) return;
    
    const letter = letterInput.toUpperCase().trim();
    if (letter.length !== 1 || !/[A-Z]/.test(letter)) {
      toast({
        title: "Invalid Letter",
        description: "Please enter a single letter (A-Z)",
        variant: "destructive"
      });
      return;
    }

    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (rowIndex === selectedCell.row && colIndex === selectedCell.col) {
          return { letter, playerId: currentPlayer };
        }
        return cell;
      })
    );

    // Check for new words
    const newWords = checkForWords(newGrid);
    const wordsForCurrentPlayer = newWords.filter(word => word.playerId === currentPlayer);
    
    if (wordsForCurrentPlayer.length > 0) {
      const pointsScored = wordsForCurrentPlayer.reduce((sum, word) => sum + word.score, 0);
      setScores(prev => ({
        ...prev,
        [`player${currentPlayer}`]: prev[`player${currentPlayer}` as keyof typeof prev] + pointsScored
      }));
      
      toast({
        title: "Words Formed!",
        description: `${wordsForCurrentPlayer.map(w => w.text).join(", ")} (+${pointsScored} points)`,
        className: "bg-score-highlight-bg border-score-highlight text-foreground"
      });
    }

    setWords(prev => [...prev, ...newWords]);
    setGrid(newGrid);
    setSelectedCell(null);
    setLetterInput("");
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);

    // Check if game is over
    const isGridFull = newGrid.every(row => row.every(cell => cell !== null));
    if (isGridFull) {
      setGameEnded(true);
      if (scores.player1 > scores.player2) {
        setWinner(1);
      } else if (scores.player2 > scores.player1) {
        setWinner(2);
      } else {
        setWinner('tie');
      }
    }
  }, [selectedCell, letterInput, grid, currentPlayer, checkForWords, scores, toast]);

  const resetGame = () => {
    setGrid(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null)));
    setCurrentPlayer(1);
    setSelectedCell(null);
    setLetterInput("");
    setScores({ player1: 0, player2: 0 });
    setWords([]);
    setGameEnded(false);
    setWinner(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      placeLetter();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu
          </Button>
          
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Word<span className="text-player-1">Grid</span>
          </h1>
          
          <Button 
            onClick={resetGame}
            variant="outline"
            className="border-border hover:bg-muted"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            New Game
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Player Panels */}
          <div className="lg:col-span-1 space-y-4">
            <PlayerPanel 
              playerId={1}
              score={scores.player1}
              isActive={currentPlayer === 1 && !gameEnded}
              wordCount={words.filter(w => w.playerId === 1).length}
            />
            <PlayerPanel 
              playerId={2}
              score={scores.player2}
              isActive={currentPlayer === 2 && !gameEnded}
              wordCount={words.filter(w => w.playerId === 2).length}
            />
          </div>

          {/* Game Board */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-border shadow-medium">
              <CardHeader className="pb-4">
                <CardTitle className="text-center font-heading">
                  {gameEnded ? (
                    <span className="text-muted-foreground">Game Complete</span>
                  ) : (
                    <span>
                      Player {currentPlayer}'s Turn
                      <Badge 
                        className={`ml-2 ${
                          currentPlayer === 1 
                            ? 'bg-player-1 text-player-1-foreground' 
                            : 'bg-player-2 text-player-2-foreground'
                        }`}
                      >
                        {currentPlayer === 1 ? 'Teal' : 'Amber'}
                      </Badge>
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <GameGrid 
                  grid={grid}
                  selectedCell={selectedCell}
                  onCellSelect={setSelectedCell}
                  disabled={gameEnded}
                />
                
                {/* Letter Input */}
                {selectedCell && !gameEnded && (
                  <div className="mt-4 flex gap-2">
                    <Input
                      value={letterInput}
                      onChange={(e) => setLetterInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter letter (A-Z)"
                      maxLength={1}
                      className="flex-1 text-center text-lg font-game font-semibold uppercase"
                      autoFocus
                    />
                    <Button 
                      onClick={placeLetter}
                      disabled={!letterInput.trim()}
                      className={`px-6 ${
                        currentPlayer === 1 
                          ? 'bg-gradient-player-1 hover:opacity-90 text-player-1-foreground' 
                          : 'bg-gradient-player-2 hover:opacity-90 text-player-2-foreground'
                      }`}
                    >
                      Place
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Word History */}
          <div className="lg:col-span-1">
            <WordHistory words={words} />
          </div>
        </div>
      </div>

      {/* Game End Dialog */}
      <Dialog open={gameEnded} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md bg-gradient-card border-border">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-heading flex items-center justify-center gap-2">
              <Trophy className="w-6 h-6 text-player-2" />
              Game Complete!
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center space-y-4">
            {winner === 'tie' ? (
              <div>
                <Star className="w-16 h-16 text-player-1 mx-auto mb-2" />
                <p className="text-xl font-heading text-foreground">It's a Tie!</p>
                <p className="text-muted-foreground">Both players scored {scores.player1} points</p>
              </div>
            ) : (
              <div>
                <Crown className={`w-16 h-16 mx-auto mb-2 ${winner === 1 ? 'text-player-1' : 'text-player-2'}`} />
                <p className="text-xl font-heading text-foreground">
                  Player {winner} Wins!
                </p>
                <div className="flex justify-center gap-4 text-sm">
                  <span className={`${winner === 1 ? 'font-bold text-player-1' : 'text-muted-foreground'}`}>
                    Player 1: {scores.player1}
                  </span>
                  <span className={`${winner === 2 ? 'font-bold text-player-2' : 'text-muted-foreground'}`}>
                    Player 2: {scores.player2}
                  </span>
                </div>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button 
                onClick={resetGame}
                className="flex-1 bg-gradient-player-1 hover:opacity-90 text-player-1-foreground"
              >
                Play Again
              </Button>
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="flex-1 border-border hover:bg-muted"
              >
                Menu
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Game;