import { useState } from "react";

export default function Home() {
  const [grid, setGrid] = useState([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, ""],
  ]);

  const [emptyCell, setEmptyCell] = useState({ row: 2, col: 2 });

  const createPuzzle = () => {
    const gridElements = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const value = grid[i][j];
        gridElements.push(
          <div
            key={`${i}-${j}`}
            className={`puzzle-cell ${value === "" ? "empty" : ""}`}
            data-row={i}
            data-col={j}
            onClick={handleCellClick}
          >
            {value !== "" ? value : ""}
          </div>
        );
      }
    }
    return gridElements;
  };

  const handleCellClick = (event) => {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    const deltaRow = Math.abs(row - emptyCell.row);
    const deltaCol = Math.abs(col - emptyCell.col);

    if (deltaRow === 1 && deltaCol === 0 || deltaCol === 1 && deltaRow === 0) {
      const newGrid = [...grid];
      newGrid[emptyCell.row][emptyCell.col] = grid[row][col];
      newGrid[row][col] = "";
      setGrid(newGrid);
      setEmptyCell({ row, col });
    }
  };

  const shufflePuzzle = () => {
    let shuffledGrid = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, ""],
    ];
    const moves = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
    ];

    for (let i = 0; i < 100; i++) {
      const validMoves = getValidMoves(emptyCell.row, emptyCell.col);
      const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
      shuffleCells(randomMove);
    }

    setGrid(shuffledGrid);
    setEmptyCell({ row: 2, col: 2 });
  };

  const getValidMoves = (row, col) => {
    const moves = [];
    if (row > 0) moves.push({ row: row - 1, col });
    if (row < 2) moves.push({ row: row + 1, col });
    if (col > 0) moves.push({ row, col: col - 1 });
    if (col < 2) moves.push({ row, col: col + 1 });
    return moves;
  };

  const shuffleCells = (move) => {
    const newGrid = [...grid];
    newGrid[emptyCell.row][emptyCell.col] = newGrid[move.row][move.col];
    newGrid[move.row][move.col] = "";
    setGrid(newGrid);
    setEmptyCell(move);
  };

  return (
    <div className="game-container">
      <h1>Number Puzzle Game</h1>
      <div className="puzzle-grid">{createPuzzle()}</div>
      <button onClick={shufflePuzzle}>Shuffle</button>
      <style jsx>{`
        .game-container {
          text-align: center;
        }
        .puzzle-grid {
          display: grid;
          grid-template-columns: repeat(3, 100px);
          grid-template-rows: repeat(3, 100px);
          gap: 5px;
          margin-bottom: 20px;
          justify-content: center;
        }
        .puzzle-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100px;
          height: 100px;
          background-color: #f8d7da;
          font-size: 24px;
          color: #343a40;
          cursor: pointer;
          border: 2px solid #e3e3e3;
          transition: background-color 0.3s ease;
        }
        .puzzle-cell.empty {
          background-color: #ffffff;
          border: none;
        }
        button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}

