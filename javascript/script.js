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
        {   playerOneName: nameOne,
            mark: "X",
        },{ playerTwoName: nameTwo,
            mark: "O",
        }
    ];

    return {players};
}


function gameFlow() {
    const board = gameBoard();

    let playerOne = createPlayers().players[0];
    let playerTwo = createPlayers().players[1];

    const playRound = (row, column) => {
        console.log(board.getBoard());
        
        // playerOne Turn
        console.log(`Let's play, its your turn ...${playerOne.playerOneName}`);
        board.chooseCell(row, column, playerOne.mark);
        board.printBoard();

    };


    return {playRound};

}

const controller = gameFlow();


