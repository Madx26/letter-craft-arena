import { CellState } from "@/pages/Game";

interface GameGridProps {
  grid: CellState[][];
  selectedCell: {row: number, col: number} | null;
  onCellSelect: (cell: {row: number, col: number} | null) => void;
  disabled?: boolean;
}

const GameGrid = ({ grid, selectedCell, onCellSelect, disabled }: GameGridProps) => {
  return (
    <div className="inline-block bg-grid-border p-1 rounded-lg shadow-soft">
      <div className="grid grid-cols-8 gap-1">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
            const isEmpty = !cell;
            
            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => {
                  if (disabled) return;
                  if (isEmpty) {
                    onCellSelect(isSelected ? null : { row: rowIndex, col: colIndex });
                  }
                }}
                disabled={disabled || !isEmpty}
                className={`
                  w-12 h-12 rounded-md font-game font-bold text-lg
                  transition-all duration-200 border-2
                  ${isEmpty 
                    ? `bg-grid-cell hover:bg-grid-cell-hover cursor-pointer
                       ${isSelected 
                         ? 'border-player-1 shadow-medium scale-105' 
                         : 'border-transparent hover:border-grid-border'
                       }`
                    : `cursor-not-allowed border-transparent
                       ${cell.playerId === 1 
                         ? 'bg-player-1-light text-player-1 shadow-soft' 
                         : 'bg-player-2-light text-player-2 shadow-soft'
                       }`
                  }
                  ${disabled ? 'opacity-75' : ''}
                `}
              >
                {cell?.letter}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GameGrid;