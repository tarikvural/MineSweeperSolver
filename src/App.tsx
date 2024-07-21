
import './App.css'
import Game from './GameManager/GameManager'
import Setup from './Setup/Setup'
import { useState } from 'react'

function App() {
  const [width, setWidth] = useState(6);
  const [height, setHeight] = useState(6);

  const handleWidthInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
    setWidth(parseInt(event.target.value));
  }

  const handleHeightInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(event.target.value));
  
  }
  return (
    <>
      <Setup 
        width={width}
        height={height}
        handleWidthInputChange={handleWidthInputChange}
        handleHeightInputChange={handleHeightInputChange}
      />
      <Game />
    </>
  )
}

export default App
