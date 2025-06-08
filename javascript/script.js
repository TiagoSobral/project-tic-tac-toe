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
           board[row][column] = mark;
            
        }
        else {
            console.log("Cell not available")
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
    const boardValues = gameBoard().getBoard();
    const player = createPlayers().players;

    let playerTurn = player[0];


    const playRound = (row, column) => {
        
        let boardIsFull = boardValues.map((row) => row.every((column) => column !== "."));
        let isDraw = boardIsFull.every((column) => column === true);
        
        
        // check if rows or columns have the same value.
        let rowOfBoleans = boardValues.map((row) => row.every((column) => column === playerTurn.mark));
        let rowWinner = rowOfBoleans.some((row) => row === true);
        
        
        let columnOfBoleans = [];
        let columnWinner = columnOfBoleans.some((column) => column === true);

        
        // let diagonalRight = [board.getBoard()[0][0], board.getBoard()[1][1], board.getBoard()[2][2]]
        // .every((value) => value === "X"|| value === "O");

        // let diagonalLeft = [board.getBoard()[0][2], board.getBoard()[1][1], board.getBoard()[2][0]]
        // .every((value) => value === "X"|| value === "O");


        // loop for checking columns
        for (let i = 0; i < 3 ; i++) {
            columnOfBoleans
            .push(boardValues
            .every((column) => column[i] === playerTurn.mark));}



        // playerOne Turn
        console.log(`${playerTurn.name} has made a move...`);
        board.chooseCell(row, column, playerTurn.mark);
        board.printBoard();



        if (rowWinner 
        || 
            columnWinner
        ||
            ((board.getBoard()[0][0] && board.getBoard()[1][1] && board.getBoard()[2][2]) === ("X" || "O")) 
        ||
            ((board.getBoard()[2][0] && board.getBoard()[1][1] && board.getBoard()[0][2]) === ("X" || "O"))
        ){
           return console.log(`We have a winner, congratulations ${playerTurn.name}`);
        }
       
        
        else if (isDraw) {
            return console.log(`Better luck next time, its a Draw ...`);
        }
        
        else {
            // next player
            changePlayerTurn();
        }
        
    };

    const changePlayerTurn = () => {

      if (playerTurn === player[0]) {
        playerTurn = player[1];
      }
      else {
        playerTurn = player[0];
      }
       
      console.log(`Its your turn ... ${playerTurn.name}!`)
    }


    const newRound = () => {

        console.log("Let's play some Tic Tac Toe");
       
        const board = gameBoard().getBoard();
       
        console.log(board);

        console.log(`Make a play ... ${playerTurn.name}`)
    }



    console.log(`Let's Play some Tic Tac Toe!`)
    console.log(boardValues);
    console.log(`Make a play ... ${playerTurn.name}`)

    return {playRound};

})();

