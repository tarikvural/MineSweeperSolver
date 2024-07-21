import React, { useState } from 'react';
import './App.css';
import GameManager from './GameManager/GameManager';
import Setup from './Setup/Setup';
import SolveReset from './SolveReset/SolveReset';

function App() {
  const [width, setWidth] = useState(6);
  const [height, setHeight] = useState(6);
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
    // Implement solve logic here or pass it to GameManager
  };

  return (
    <>
      <Setup 
        width={width}
        height={height}
        handleWidthInputChange={handleWidthInputChange}
        handleHeightInputChange={handleHeightInputChange}
      />
      <GameManager
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