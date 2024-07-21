import React from 'react';
import './Setup.css';

interface SetupProps {
    width: number;
    height: number;
    mines: number;
    handleWidthInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleHeightInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleMineInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Setup = ({width, height, mines, handleWidthInputChange, handleHeightInputChange, handleMineInputChange} : SetupProps ) => {
    return (
        <div id='setup-container'>
            <label htmlFor='width-input'>Width:</label>
            <input type="number" value={width} id='width-input' onChange={handleWidthInputChange} ></input>
            <label htmlFor='height-input'>Height:</label>
            <input type="number" value={height} id='height-input' onChange={handleHeightInputChange}></input>
            <label htmlFor='mine-input'>Mines:</label>
            <input type="number" value={mines} id='mine-input' onChange={handleMineInputChange}></input>
        </div>
    );
};

export default Setup;