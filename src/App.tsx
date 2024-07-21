import React, { useState } from 'react';
import './App.css';
import GameManager from './GameManager/GameManager';
import Setup from './Setup/Setup';
import SolveReset from './SolveReset/SolveReset';

function App() {
  const [width, setWidth] = useState(6);
  const [height, setHeight] = useState(6);
  const [mines, setMines] = useState(6);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleWidthInputChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setWidth(parseInt(event.target.value));
  };

  const handleHeightInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(event.target.value));
  };

  const handleResetClick = () => {
    setResetTrigger(prev => prev + 1);
  };

  const handleSolveClick = () => {
    console.log('Solve clicked');
  };

  const handleMineInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMines(parseInt(event.target.value));
  }

  return (
    <>
      <Setup 
        width={width}
        height={height}
        mines={mines}
        handleMineInputChange={handleMineInputChange}
        handleWidthInputChange={handleWidthInputChange}
        handleHeightInputChange={handleHeightInputChange}
      />
      <GameManager
        mines={mines}
        width={width}
        height={height}
        resetTrigger={resetTrigger}
      />
      <SolveReset 
        handleSolveClick={handleSolveClick}
        handleResetClick={handleResetClick}
      />
    </>
  );
}

export default App;