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

    const isValid = (row, column) => {
        const cellValid = board.filter((element, index) => index === row).map((element) => element[column]);
        let result;

        if (cellValid == ".") {
           return result = true;
        }
        if (cellValid != ".") {
            return result = false;
        }
    
    };

    const chooseCell = (row, column, mark) => {

        if (isValid(row, column) == true) {
           board[row][column] = mark;
            
        }

    };

    const printBoard = () => {
       return console.log(board);
    };

    return {getBoard, chooseCell, isValid, printBoard};
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

    const changePlayerTurn = () => {

      if (playerTurn === player[0]) {
        
        playerTurn = player[1];
      }

      else {
        
        playerTurn = player[0];
      }
       
      console.log(`Its your turn ... ${playerTurn.name}!`)
    }


    const newGame = () => {
        
        playerTurn =  player[0];

        console.log("Let's play some Tic Tac Toe");
       
        const board = gameBoard().getBoard();
       
        console.log(board);

        console.log(`Make a play ... ${playerTurn.name}`)
    }

    

    const playRound = (row, column) => {
        
        let cellValid = board.isValid(row, column);

        // check if input is accepted
        if (0 < row || row > 3 ||  0 < column || column > 3) {
            console.log("Invalid Input");
            board.printBoard();
            console.log(`${playerTurn.name} try again...`)
            return;
        }

        // check if play is possible 
        if (cellValid === true) {
            console.log(`${playerTurn.name} has made a move...`);
            
            board.chooseCell(row, column, playerTurn.mark);
            
            board.printBoard();
            
            changePlayerTurn();
        } 

        else {
            console.log(`${playerTurn.name} unavailable play...`);
            
            board.printBoard();

            console.log(`${playerTurn.name} play again...`);
            
            return;
        }
        

        // WIN VARIABLES  
        let isDraw =  board.getBoard()
        .map((row) => row.every((column) => column !== "."))
        .every((column) => column === true);
        
        
        // check if rows or columns have the same value.
        let rowWinner = board.getBoard()
        .map((row) => row.every((column) => column === playerTurn.mark))
        .some((row) => row === true);
        
        
        let columnWinner = () => {
            let columnOfBoleans = [];
        
            for (let i = 0; i < 3 ; i++) {
                columnOfBoleans.push(board.getBoard().every((column) => column[i] === playerTurn.mark));
            }

          return  columnOfBoleans.some((column) => column === true);
        }

        
        let diagonalRight = () => [board.getBoard()[0][0], board.getBoard()[1][1], board.getBoard()[2][2]]
        .every((value) => value === "X"|| value === "O");

        let diagonalLeft = () => [board.getBoard()[0][2], board.getBoard()[1][1], board.getBoard()[2][0]]
        .every((value) => value === "X"|| value === "O");


        // WIN CONDITIONS
        if (rowWinner || columnWinner() || diagonalLeft() || diagonalRight()) {
           console.log(`We have a winner, congratulations ${playerTurn.name}`);
           newGame();
        }
        
        else if (isDraw) {
            console.log(`Better luck next time, its a Draw ...`);
            newGame();
        }

    };

    console.log(`Let's Play some Tic Tac Toe!`)
    console.log(boardValues);
    console.log(`Make a play ... ${playerTurn.name}`)

    return {playRound};

})();



