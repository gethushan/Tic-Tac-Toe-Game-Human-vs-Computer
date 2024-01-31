const board = document.getElementById('board');
const status = document.getElementById('status');
const winnerDisplay = document.getElementById('winner');
const resetButton = document.getElementById('reset');
const toggleModeButton = document.getElementById('toggleMode');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let winner = null;

function handleCellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        renderBoard();
        checkWinner();
        togglePlayer();

        // Allow computer to make a move
        if (currentPlayer === 'O' && gameActive) {
            setTimeout(() => {
                makeComputerMove();
                renderBoard();
                checkWinner();
                togglePlayer();
            }, 500);
        }
    }
}

function makeComputerMove() {
    // Simple computer player: Randomly choose an empty cell
    const emptyCells = gameBoard.reduce((acc, val, index) => {
        if (val === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerMove = emptyCells[randomIndex];
    
    gameBoard[computerMove] = 'O';
}

function renderBoard() {
    board.innerHTML = '';
    gameBoard.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = value;
        cell.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cell);
    });
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            winner = currentPlayer;
            status.textContent = `Player ${winner} wins!`;
            winnerDisplay.textContent = `Winner: Player ${winner}`;
            winnerDisplay.style.display = 'block';
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        status.textContent = 'It\'s a tie!';
        winnerDisplay.textContent = 'It\'s a tie!';
        winnerDisplay.style.display = 'block';
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    winner = null;
    status.textContent = 'Player X\'s turn';
    winnerDisplay.style.display = 'none';
    renderBoard();
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
    toggleModeButton.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
}

// Initial setup
renderBoard();
