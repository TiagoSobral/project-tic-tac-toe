function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];


    for (let r = 0; r < rows; r++) {
        board[r] = [];
        for (let c = 0; c < columns; c++ ) {
            board[r].push(".");
        }
    };
    
    const getBoard = () => board;


    const chooseCell = (row, column, mark) => {
        const cellValid = board.filter((element, index) => index === row).map((element) => element[column]);

        if (cellValid == ".") {
            return board[row][column] = mark;
        }
        else {
            console.log("Cell not available")
        }

    };

    const printBoard = () => {
        console.log(board);
    };

    return {getBoard, chooseCell, printBoard};
};


const createPlayers = (nameOne = "PlayerOne", nameTwo = "PlayerTwo") => {
    const players = [
        {   name: nameOne,
            mark: "X",
        },{ name: nameTwo,
            mark: "O",
        }
    ];

    return {players};
}


function gameFlow() {
    const board = gameBoard();
    const player = createPlayers().players;

    let playerOne = player[0];
    let playerTwo = player[1];

    let playerTurn = playerOne;

    const initialBoard = () => {
       const board = gameBoard().getBoard();
       return console.log(board);
    }

    const changePlayerTurn = () => {
        if (playerTurn === playerOne) {
           playerTurn = playerTwo;
        }
        else {
            playerTurn = playerOne;
        }
    }

    const playRound = (row, column) => {
        console.log("Let's play some Tic Tac Toe");
        initialBoard();

        // playerOne Turn
        console.log(`Let's play, its your turn ... ${playerTurn.name}`);
        board.chooseCell(row, column, playerOne.mark);
        board.printBoard();

        changePlayerTurn();
        console.log(playerTurn)
    };


    return {playRound};

}

const controller = gameFlow();


