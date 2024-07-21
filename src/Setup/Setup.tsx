import React from 'react';
import './Setup.css';

interface SetupProps {
    width: number;
    height: number;
    handleWidthInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleHeightInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Setup = ({width, height, handleWidthInputChange, handleHeightInputChange} : SetupProps ) => {
    return (
        <div id='setup-container'>
            <label htmlFor='height-input'>Width:</label>
            <input type="number" value={width} id='width-input' onChange={handleWidthInputChange} ></input>
            <label htmlFor='height-input'>Height:</label>
            <input type="number" value={height} id='height-input' onChange={handleHeightInputChange}></input>
        </div>
    );
};

export default Setup;