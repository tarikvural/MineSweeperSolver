import React, { useState, useEffect } from 'react';
import Board from '../Board/Board';

interface GameManagerProps {
    width: number;
    height: number;
    resetTrigger: number;
    mines: number;
}

function GameManager({ width, height, resetTrigger, mines }: GameManagerProps) {

    const [tileValues, setTileValues] = useState<number[]>([]);
    const [flags, setFlags] = useState<boolean[]>([]);


    const getRowAndColFromIndex = (index: number): {row: number, col: number} => {
        return {row: Math.floor(index / width),col: index % width};
    }

    const getIndexFromRowAndCol = (row: number,col: number): number => {
        return row * width + col;
    }

    const countFlagsAround = (index: number) : number => {
        const colAndRow = getRowAndColFromIndex(index);
        return countFlagsAroundHelper(colAndRow.row, colAndRow.col); 
    }

    const countFlagsAroundHelper = (i: number, j: number): number => {
        let minesAround = 0;
        
        let upperEdge:boolean = false, lowerEdge:boolean = false, leftEdge:boolean = false, rightEdge:boolean = false;
        
        if(i === 0) upperEdge = true;
        if(j === 0) leftEdge = true;
        if(i === height-1) lowerEdge = true;
        if(j === width-1) rightEdge = true;
        
        if(!upperEdge && flags[getIndexFromRowAndCol(i-1,j)]) minesAround++;
        if(!leftEdge && flags[getIndexFromRowAndCol(i,j-1)]) minesAround++;
        if(!lowerEdge && flags[getIndexFromRowAndCol(i+1,j)]) minesAround++;
        if(!rightEdge && flags[getIndexFromRowAndCol(i,j+1)]) minesAround++;
        if(!upperEdge && !leftEdge && flags[getIndexFromRowAndCol(i-1,j-1)]) minesAround++;
        if(!upperEdge && !rightEdge && flags[getIndexFromRowAndCol(i-1,j+1)]) minesAround++;
        if(!lowerEdge && !leftEdge && flags[getIndexFromRowAndCol(i+1,j-1)]) minesAround++;
        if(!lowerEdge && !rightEdge && flags[getIndexFromRowAndCol(i+1,j+1)]) minesAround++;

        return minesAround;
    }
    
    const countFreeSquaresAround = (index: number): number => {
        const colAndRow = getRowAndColFromIndex(index);
        return countFreeSquaresAroundHelper(colAndRow.row, colAndRow.col);
    }

    // i is row, j is col
    const countFreeSquaresAroundHelper = (i: number, j: number): number => {
        let freeSquares = 0;
        
        let upperEdge:boolean = false, lowerEdge:boolean = false, leftEdge:boolean = false, rightEdge:boolean = false;
        
        if(i === 0) upperEdge = true;
        if(j === 0) leftEdge = true;
        if(i === height-1) lowerEdge = true;
        if(j === width-1) rightEdge = true;
        
        if(!upperEdge && tileValues[getIndexFromRowAndCol(i-1,j)]==-1) freeSquares++;
        if(!lowerEdge && tileValues[getIndexFromRowAndCol(i+1,j)]==-1) freeSquares++;
        if(!leftEdge && tileValues[getIndexFromRowAndCol(i,j-1)]==-1) freeSquares++;
        if(!rightEdge && tileValues[getIndexFromRowAndCol(i,j+1)]==-1) freeSquares++;
        if(!leftEdge && !upperEdge && tileValues[getIndexFromRowAndCol(i-1,j-1)]==-1) freeSquares++;
        if(!upperEdge && !rightEdge && tileValues[getIndexFromRowAndCol(i-1,j+1)]==-1) freeSquares++;
        if(!leftEdge && !lowerEdge && tileValues[getIndexFromRowAndCol(i+1,j-1)]==-1) freeSquares++;
        if(!lowerEdge && !rightEdge && tileValues[getIndexFromRowAndCol(i+1,j+1)]==-1) freeSquares++;

        console.log(freeSquares);
        return freeSquares;
    }

    useEffect(() => {
        resetGame();
    }, [width, height, resetTrigger,mines]);

    const resetGame = () => {
        const initialTileValues = Array.from({ length: width * height }, () => -1);
        setTileValues(initialTileValues);
    };

    const handleTileClicked = (index: number) => {
        setTileValues(prev => {
        const newTileValues = [...prev];
        if (prev[index] === -3) return prev;
        newTileValues[index] = (newTileValues[index] + 1) % 9;
        return newTileValues;
        });
    };

    const handleTileRightClicked = (index: number) => {
        setTileValues(prev => {
        const newTileValues = [...prev];
        if(prev[index] === -3){
            newTileValues[index] = -1;
            flags[index] = false;
        } else {
            newTileValues[index] = -3;
            flags[index] = true;
        }
        return newTileValues;
        });
    };

    return (
        <div>
        <h1>Mine Sweeper Solver</h1>
        <Board
            width={width}
            height={height}
            tileValues={tileValues}
            handleTileClicked={handleTileClicked}
            handleTileRightClicked={handleTileRightClicked}
        />
        </div>
    );
}

export default GameManager;