import React from 'react';
import './SolveReset.css'

interface SolveResetProps {
    handleSolveClick: () => void;
    handleResetClick: () => void;
}

const SolveReset = ({handleSolveClick, handleResetClick} : SolveResetProps) => {

    return (
        <div id='solve-reset-button-container'>
            <button className='solve-reset-button' id='reset-button' onClick={handleResetClick}>Reset</button>
            <button className='solve-reset-button' id='solve-button' onClick={handleSolveClick}>Solve</button>
        </div>
    );
};

export default SolveReset;