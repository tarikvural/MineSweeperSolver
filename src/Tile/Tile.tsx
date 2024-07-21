import React from 'react';
import './Tile.css';

interface TileProps {
    value: number;
    handleClick: () => void;
    handleRightClick: (index: number) => void;
    key: number;
}

const Tile = ({ value, handleClick, handleRightClick, key }: TileProps) => {

    const onRightClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault(); // Prevent the default context menu
        handleRightClick(value);
    };

    const determineContent = () => {
        if(value === -3) return '🚩';
        if(value === -4) return '💀';
        if(value === -5) return '✅';
        else if(value >= 0) { 
            (document.querySelector('.tile') as HTMLButtonElement).style.backgroundColor ='#2d0830';
            return value;
        }
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