import React from 'react';

interface SetupProps {
    width: number;
    height: number;
    handleWidthInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleHeightInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Setup = ({width, height, handleWidthInputChange, handleHeightInputChange} : SetupProps ) => {
    return (
        <div>
            <label htmlFor='height-input'>Width:</label>
            <input type="number" value={width} id='width-input' onChange={handleWidthInputChange}></input>
            <label htmlFor='height-input'>Height:</label>
            <input type="number" value={height} id='height-input' onChange={handleHeightInputChange}></input>
        </div>
    );
};

export default Setup;