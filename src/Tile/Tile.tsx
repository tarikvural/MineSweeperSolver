import React from 'react';
import './Tile.css';

interface TileProps {
    value: number;
    handleClick: () => void;
    handleRightClick: (index: number) => void;
}

const Tile = ({ value, handleClick, handleRightClick }: TileProps) => {

    const onRightClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault(); // Prevent the default context menu
        handleRightClick(value);
    };

    const determineContent = () => {
        if(value === -3) return '🚩';
        if(value === -4) return '💀';
    }

    return (
        <button 
            className="tile" 
            onClick={handleClick}
            onContextMenu={onRightClick}>
            {determineContent()}
        </button>
    );
};

export default Tile;