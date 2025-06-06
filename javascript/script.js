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

    let playerTurn = player[0];

    // const initialBoard = () => {
    //     console.log("Let's play some Tic Tac Toe");
    //    const board = gameBoard().getBoard();
    //    return console.log(board);
    // }

    const changePlayerTurn = () => {
      if (playerTurn === player[0]) {
        playerTurn = player[1];
      }
      else {
        playerTurn = [0];
      }
       
    }

    const playRound = (row, column) => {
        board.getBoard();

        // playerOne Turn
        console.log(`${playerTurn.name} has made a move...`);
        board.chooseCell(row, column, playerTurn.mark);
        board.printBoard();

        changePlayerTurn();
        console.log(`Its your turn ... ${playerTurn.name}!`);
    };


    return {playRound};

}

const controller = gameFlow();


