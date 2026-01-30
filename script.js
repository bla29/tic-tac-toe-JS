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
            console.log(newBoard.board)
            didXWin = newGame('X');
            playerTurn = !playerTurn;
        }
        else {
            let input = prompt('Player 2: Enter your mark coordinates for O. For example: "0,0"');
            let coordinates = input.split(',');
            newBoard.markBoard(coordinates[0], coordinates[1], playerTwo.mark);
            console.log(newBoard.board)
            didOWin = newGame('O');
            playerTurn = !playerTurn;
        }

    }
    if (didXWin) {
        alert('Congratulations ' + playerOne.name + '!')
    }
    else {
        alert('Congratulations ' + playerTwo.name + '!')
    }
}

startGame();