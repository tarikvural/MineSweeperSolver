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
        
        if(!upperEdge && getFlagValueAtPosition(i-1,j)) minesAround++;
        if(!leftEdge && getFlagValueAtPosition(i,j-1)) minesAround++;
        if(!lowerEdge && getFlagValueAtPosition(i+1,j)) minesAround++;
        if(!rightEdge && getFlagValueAtPosition(i,j+1)) minesAround++;
        if(!upperEdge && !leftEdge && getFlagValueAtPosition(i-1,j-1)) minesAround++;
        if(!upperEdge && !rightEdge && getFlagValueAtPosition(i-1,j+1)) minesAround++;
        if(!lowerEdge && !leftEdge && getFlagValueAtPosition(i+1,j-1)) minesAround++;
        if(!lowerEdge && !rightEdge && getFlagValueAtPosition(i+1,j+1)) minesAround++;

        return minesAround;
    }
    
    const countFreeSquaresAround = (index: number): number => {
        const colAndRow = getRowAndColFromIndex(index);
        return countFreeSquaresAroundHelper(colAndRow.row, colAndRow.col);
    }

    
    const countFreeSquaresAroundHelper = (i: number, j: number): number => {
        let freeSquares = 0;
        
        let upperEdge:boolean = false, lowerEdge:boolean = false, leftEdge:boolean = false, rightEdge:boolean = false;
        
        if(i === 0) upperEdge = true;
        if(j === 0) leftEdge = true;
        if(i === height-1) lowerEdge = true;
        if(j === width-1) rightEdge = true;
        
        if(!upperEdge && getTileValueAtPosition(i-1,j)==-1) freeSquares++;
        if(!lowerEdge && getTileValueAtPosition(i+1,j)==-1) freeSquares++;
        if(!leftEdge && getTileValueAtPosition(i,j-1)==-1) freeSquares++;
        if(!rightEdge && getTileValueAtPosition(i,j+1)==-1) freeSquares++;
        if(!leftEdge && !upperEdge && getTileValueAtPosition(i-1,j-1)==-1) freeSquares++;
        if(!upperEdge && !rightEdge && getTileValueAtPosition(i-1,j+1)==-1) freeSquares++;
        if(!leftEdge && !lowerEdge && getTileValueAtPosition(i+1,j-1)==-1) freeSquares++;
        if(!lowerEdge && !rightEdge && getTileValueAtPosition(i+1,j+1)==-1) freeSquares++;

        console.log(freeSquares);
        return freeSquares;
    }

     // A boundry square is an unopened square with opened squares near it.
    const isBoundry = (index: number): boolean => {
        const colAndRow = getRowAndColFromIndex(index);
        return isBoundryHelper(colAndRow.row, colAndRow.col);
    }

     // A boundry square is an unopened square with opened squares near it.
    const isBoundryHelper = (i: number, j: number): boolean => {
        if(getTileValueAtPosition(i,j) !== -1) return false;
        let isBoundry: boolean = false, upperEdge:boolean = false, lowerEdge:boolean = false, leftEdge:boolean = false, rightEdge:boolean = false;
        
        
        if(i == 0) upperEdge = true;
        if(j == 0) leftEdge = true;
        if(i == height-1) lowerEdge = true;
        if(j == width-1) rightEdge = true;
        
        if(!upperEdge && getTileValueAtPosition(i-1,j)>=0) isBoundry = true;
        if(!leftEdge && getTileValueAtPosition(i,j-1)>=0) isBoundry = true;
        if(!lowerEdge && getTileValueAtPosition(i+1,j)>=0) isBoundry = true;
        if(!rightEdge && getTileValueAtPosition(i,j+1)>=0) isBoundry = true;
        if(!upperEdge && !leftEdge && getTileValueAtPosition(i-1,j-1)>=0) isBoundry = true;
        if(!upperEdge && !rightEdge && getTileValueAtPosition(i-1,j+1)>=0) isBoundry = true;
        if(!lowerEdge && !leftEdge && getTileValueAtPosition(i+1,j-1)>=0) isBoundry = true;
        if(!lowerEdge && !rightEdge && getTileValueAtPosition(i+1,j+1)>=0) isBoundry = true;

        return isBoundry;
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

    const getFlagValueAtPosition = (i: number, j: number): boolean => {
        return flags[getIndexFromRowAndCol(i,j)];
    }

    const getTileValueAtPosition = (i: number, j: number): number => {
        return tileValues[getIndexFromRowAndCol(i,j)];
    }

    const flagOn = (i: number, j: number) => {
        setTileValues(prev => {
            const newTileValues = [...prev];
            newTileValues[getIndexFromRowAndCol(i,j)] = -4;
            return newTileValues;
        });
    }

    // Marks squares where unchecked squares around it = its number
    const attemptToFlagMines = () => {
        for(let i=0; i<height; i++){
            for(let j=0; j<width; j++){
              
              if(getTileValueAtPosition(i,j) >= 1){
                const curNum = getTileValueAtPosition(i,j);
      
                // Flag necessary squares
                if(curNum == countFreeSquaresAroundHelper(i,j)){
                  for(let ii=0; ii<height; ii++){
                    for(let jj=0; jj<width; jj++){
                      if(Math.abs(ii-i)<=1 && Math.abs(jj-j)<=1){
                        if(getTileValueAtPosition(ii,jj) == -1 && !getFlagValueAtPosition(ii,jj)){
                            setFlags(prev => {
                                const newFlags = [...prev];
                                newFlags[getIndexFromRowAndCol(ii,jj)] = true;
                                return newFlags;
                            });
                            // mark flags on screen
                            flagOn(ii,jj);
                        }
                      }
                    }
                  }
                }
      
      
              }
            }
          }
    }

    const handleTileRightClicked = (index: number) => {
        setTileValues(prev => {
        const newTileValues = [...prev];
        if(prev[index] === -3){
            newTileValues[index] = -1;
            setFlags(prev => {
                const newFlags = [...prev];
                newFlags[index] = false;
                return newFlags;
            });
        } else {
            newTileValues[index] = -3;
            setFlags(prev => {
                const newFlags = [...prev];
                newFlags[index] = true;
                return newFlags;
            });
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