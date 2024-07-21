import React, { useState, useEffect } from 'react';
import Board from '../Board/Board';

interface GameManagerProps {
  width: number;
  height: number;
  resetTrigger: number;
}

function GameManager({ width, height, resetTrigger }: GameManagerProps) {
  const [tileValues, setTileValues] = useState<number[]>([]);

  useEffect(() => {
    resetGame();
  }, [width, height, resetTrigger]);

  const resetGame = () => {
    const initialTileValues = Array.from({ length: width * height }, () => -1);
    setTileValues(initialTileValues);
  };

  const handleTileClicked = (index: number) => {
    setTileValues(prev => {
      const newTileValues = [...prev];
      if (prev[index] === -3) return prev;
      newTileValues[index] = (newTileValues[index] + 1) % 9;
      return newTileValues;
    });
  };

  const handleTileRightClicked = (index: number) => {
    setTileValues(prev => {
      const newTileValues = [...prev];
      newTileValues[index] = prev[index] === -3 ? -1 : -3;
      return newTileValues;
    });
  };

  return (
    <div>
      <h1>Mine Sweeper Solver</h1>
      <Board
        width={width}
        height={height}
        tileValues={tileValues}
        handleTileClicked={handleTileClicked}
        handleTileRightClicked={handleTileRightClicked}
      />
    </div>
  );
}

export default GameManager;