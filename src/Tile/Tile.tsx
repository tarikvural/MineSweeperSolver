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

    return (
        <button 
            className="tile" 
            onClick={handleClick}
            onContextMenu={onRightClick}>
            {value === -3 ? '🚩'  : value === -1 ? '' : value}
        </button>
    );
};

export default Tile;