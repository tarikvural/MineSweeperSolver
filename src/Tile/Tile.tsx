import React from 'react';

interface TileProps {
    value: number;
    onClick: () => void;
}

const Tile: React.FC<TileProps> = ({ value, onClick }) => {
    return (
        <button className="tile" onClick={onClick}>
            {value}
        </button>
    );
};

export default Tile;