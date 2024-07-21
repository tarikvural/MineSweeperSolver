import React from 'react';
import Tile from '../Tile/Tile';
import './Board.css';

interface BoardProps {
    width: number;
    height: number;
    tileValues: number[];
    handleTileClicked: (index: number) => void;
    handleTileRightClicked: (index: number) => void;
}

const Board = ({ width, height, tileValues, handleTileClicked, handleTileRightClicked }: BoardProps) => {
    const tiles = Array.from({ length: width * height });

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${width}, 5rem)`,
            gridTemplateRows: `repeat(${height}, 5rem)`,
            gap: '5px',
            alignItems: "center",
            justifyContent: "center"
        }}>
            {tiles.map((_, index) => (
                <Tile
                    key={index}
                    value={tileValues[index]}
                    handleClick={() => handleTileClicked(index)}
                    handleRightClick={() => handleTileRightClicked(index)}
                    
                />
            ))}
        </div>
    );
};

export default Board;
