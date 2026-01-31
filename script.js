function createBoard() {
    let board = Array.from({ length: 3 }, () => Array(3).fill('_'));

    const markBoard = (x, y, input) => {
        board[x][y] = input;
    }
    return { board, markBoard };
}

function createPlayer(name, mark) {
    this.name = name;
    this.mark = mark;
    return { name, mark };
}

function createGame(board) {
    return function winCondition(mark) {
        let incrementor = 0;
        for (let i = 0; i < 3; i++) {
            if ((board[0 + incrementor][0] == mark) && (board[0 + incrementor][1] == mark) && (board[0 + incrementor][2] == mark)) {
                return true;
            }
            incrementor = incrementor + 1;
        }
        incrementor = 0;
        for (let i = 0; i < 3; i++) {
            if ((board[0][0 + incrementor] == mark) && (board[1][0 + incrementor] == mark) && (board[2][0 + incrementor] == mark)) {
                return true;
            }
            incrementor = incrementor + 1;
        }
        incrementor = 0;
        for (let i = 0; i < 2; i++) {
            if ((board[0][0 + incrementor] == mark) && (board[1][1] == mark) && (board[2 - incrementor][2] == mark)) {
                return true;
            }
            incrementor = incrementor + 2;
        }
        return false;
    }
}

function startGame() {
    let newBoard = createBoard();
    let newGame = createGame(newBoard.board);

    displayBoard(newBoard);

    let playerOneName = prompt('Player 1: Enter your name');
    let playerTwoName = prompt('Player 2: Enter your name');

    const playerOne = createPlayer(playerOneName, 'X');
    const playerTwo = createPlayer(playerTwoName, 'O');

    let didXWin = newGame('X');
    let didOWin = newGame('O');

    let playerTurn = true;
    while (!didXWin && !didOWin) {
        if (playerTurn) {
            let input = prompt('Player 1: Enter your mark coordinates for X. For example: "0,0"');
            let coordinates = input.split(',');
            newBoard.markBoard(coordinates[0], coordinates[1], playerOne.mark);
            didXWin = newGame('X');
            playerTurn = !playerTurn;
        }
        else {
            let input = prompt('Player 2: Enter your mark coordinates for O. For example: "0,0"');
            let coordinates = input.split(',');
            newBoard.markBoard(coordinates[0], coordinates[1], playerTwo.mark);
            didOWin = newGame('O');
            playerTurn = !playerTurn;
        }

    }
    if (didXWin) {
        alert('Congratulations ' + playerOne.name + '!')
        let initialBoard = document.querySelector('.board')
        console.log(initialBoard)
        initialBoard.remove();
        displayBoard(newBoard);
    }
    else {
        alert('Congratulations ' + playerTwo.name + '!')
        let initialBoard = document.querySelector('.board')
        initialBoard.remove();
        displayBoard(newBoard);
    }
    return { newBoard, playerOne, playerTwo };
}

function displayBoard(board) {
    let containerDiv = document.createElement('div');

    board.board.forEach((item, outerIndex) => {
        item.forEach((item, innerIndex) => {
            let tile = document.createElement('h2');
            tile.textContent = String(item);
            tile.addEventListener('click', () => {
                board.markBoard(outerIndex, innerIndex, 'X');
                tile.textContent = 'X';
            });
            containerDiv.appendChild(tile);
        });
    });
    containerDiv.classList.add('board');
    document.body.appendChild(containerDiv);
}

let playButton = document.querySelector('.play');
playButton.addEventListener('click', () => {
    let game = startGame();
    let playerOne = document.querySelector('.players .player-one');
    let playerTwo = document.querySelector('.players .player-two');
    playerOne.textContent = game.playerOne.name;
    playerTwo.textContent = game.playerTwo.name;
})