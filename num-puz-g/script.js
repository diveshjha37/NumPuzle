const puzzleGrid = document.getElementById("puzzle-grid");
const shuffleBtn = document.getElementById("shuffleBtn");

let grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, '']
];

let emptyCell = { row: 2, col: 2 };

function createPuzzle() {
    puzzleGrid.innerHTML = ''; // Clear the grid
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cellValue = grid[i][j];
            const cell = document.createElement('div');
            cell.classList.add('puzzle-cell');
            cell.textContent = cellValue === '' ? '' : cellValue;
            cell.dataset.row = i;
            cell.dataset.col = j;
            if (cellValue === '') cell.classList.add('empty');
            cell.addEventListener('click', handleCellClick);
            puzzleGrid.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    const deltaRow = Math.abs(row - emptyCell.row);
    const deltaCol = Math.abs(col - emptyCell.col);

    if ((deltaRow === 1 && deltaCol === 0) || (deltaCol === 1 && deltaRow === 0)) {
        // Swap with the empty space
        grid[emptyCell.row][emptyCell.col] = grid[row][col];
        grid[row][col] = '';
        emptyCell = { row, col };
        createPuzzle();
    }
}

function shufflePuzzle() {
    // Shuffle the grid randomly
    for (let i = 0; i < 100; i++) {
        const validMoves = getValidMoves(emptyCell.row, emptyCell.col);
        const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
        swapCells(randomMove);
    }
    createPuzzle();
}

function getValidMoves(row, col) {
    const moves = [];
    if (row > 0) moves.push({ row: row - 1, col });
    if (row < 2) moves.push({ row: row + 1, col });
    if (col > 0) moves.push({ row, col: col - 1 });
    if (col < 2) moves.push({ row, col: col + 1 });
    return moves;
}

function swapCells(move) {
    grid[emptyCell.row][emptyCell.col] = grid[move.row][move.col];
    grid[move.row][move.col] = '';
    emptyCell = move;
}

shuffleBtn.addEventListener('click', shufflePuzzle);

// Initialize the game
createPuzzle();

