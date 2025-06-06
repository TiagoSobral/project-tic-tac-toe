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
            return console.log("Cell not available")
        }

    };

    const printBoard = () => {
       return console.log(board);
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


const controller = (function() {
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
        return playerTurn = player[1];
      }
      else {
        return playerTurn = player[0];
      }
       
    }

    const playRound = (row, column) => {

        // playerOne Turn
        console.log(`${playerTurn.name} has made a move...`);
        board.chooseCell(row, column, playerTurn.mark);
        board.printBoard();

         // gameEnd?
        let rowOfBoleans = board.getBoard().map((row) => {
            row.every((column) => column === playerTurn.mark);
        });

        let columnOfBoleans = [];

        for (let i = 0; i < 3 ; i++) {
            columnOfBoleans
            .push(board.getBoard()
            .every((column) => column[i] === playerTurn.mark));}


        let rowWinner = rowOfBoleans.some((row) => row === true);
        let columnWinner = columnOfBoleans.some((column) => column === true);

        if (rowWinner) {
            console.log("We have a winner")
        }
        else if (columnWinner) {
            console.log("we have a crazy winner");
        }
        else {
            // next player
            changePlayerTurn();
            console.log(`Its your turn ... ${playerTurn.name}!`)
        }
        
    };

    console.log(`Let's Play some Tic Tac Toe!`)
    console.log(board.getBoard());
    console.log(`Make a play ... ${playerTurn.name}`)

    return {playRound};

})();

