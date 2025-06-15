function gameBoard() {
    const rows = 3;
    const columns = 3;
    let board = [];


    for (let r = 0; r < rows; r++) {
        board[r] = [];
        for (let c = 0; c < columns; c++ ) {
            board[r].push(" ");
        }
    };
    
    const getBoard = () => board;

    const isValid = (row, column) => {
        const cellCheck = board.filter((element, index) => index === row).map((element) => element[column]);
        // let result;

        if (cellCheck != " ") {
            // return result = false;
            return false;
        }
        else {
            return true;
        }

    };

    const chooseCell = (row, column, mark) => {
        let cellValid = isValid(row, column);

        if (cellValid == true) {
           board[row][column] = mark;
            
        }


    };

    const newBoard = () => {
        
        for (let i = 0; i < board.length ; i++) {
            for (let j = 0; j < board[i].length; j++) {
                board[i][j] = " ";
            }
        }

        
    };

    return {getBoard, chooseCell, isValid, newBoard};
};


function createPlayers(nameOne = "Player One", nameTwo = "Player Two") {
    const players = [
        {   name: nameOne,
            mark: "X",
        },{ name: nameTwo,
            mark: "O",
        }
    ];

    return {players};
};


function controller(input1, input2) {
    
    const board = gameBoard();
    const player = createPlayers(input1, input2).players;

    let playerTurn = player[0];

    const getPlayerTurn = () => playerTurn;

     let winner;

    const getWinner = () => winner;

    
    const changePlayerTurn = () => {

        if (playerTurn === player[0]) {
        
            playerTurn = player[1];
      }

        else {
        
            playerTurn = player[0];
      }
       
      console.log(`Its your turn ... ${getPlayerTurn().name}!`)
    }


    const newGame = () => {
        
        playerTurn =  player[0];

        board.newBoard();

        console.log(board.getBoard());

        console.log(`Make a play ... ${getPlayerTurn().name}`);
    };
    

    const playRound = (row, column) => {

        
        let cellValid = board.isValid(row, column);

        // check if input is accepted
        if (0 > row || row > 3 || 0 > column || column > 3) {
            console.log("Invalid Input");
            
            console.log(board.getBoard());
            
            console.log(`${playerTurn.name} try again...`)
            
            return;
        }

        // check if play is possible 
        if (cellValid === true) {
            console.log(`${playerTurn.name} has made a move...`);
            
            board.chooseCell(row, column, getPlayerTurn().mark);

            console.log(board.getBoard())
            
        } 
        // if cell is not available
        else {
            console.log(`${getPlayerTurn().name}, that play is not available...`);

            console.log(board.getBoard());

            console.log(`${getPlayerTurn().name} try again...`);

            return;
            
        }
        
        // get board state after the move was made
        const updatedBoard = board.getBoard();


        // WIN VARIABLES  
        let isDraw =  updatedBoard
        .map((row) => row.every((column) => column != " "))
        .every((column) => column === true);
        
        
        // check if rows or columns have the same value.
        let rowWinner = updatedBoard
        .map((row) => row.every((column) => column == getPlayerTurn().mark))
        .some((row) => row === true);
        
        
        let columnWinner = () => {
            let columnOfBoleans = [];
        
            // for every column it checks if all the values are the same (returns true), after
            // if any of the columns returns true means we have a winner.
            for (let i = 0; i < 3 ; i++) {
                columnOfBoleans.push(updatedBoard.every((column) => column[i] == getPlayerTurn().mark));
            }

          return  columnOfBoleans.some((column) => column === true);
        }

        // checks for diagonal wins
        let diagonalRight = [updatedBoard[0][0], updatedBoard[1][1], updatedBoard[2][2]];

        let diagonalLeft = [updatedBoard[2][0], updatedBoard[1][1], updatedBoard[0][2]];

        let dRightWinner = diagonalRight.every((value) => value === "X") || diagonalRight.every((value) => value === "O");

        let dLeftWinner = diagonalLeft.every((value) => value === "X") || diagonalLeft.every((value) => value === "O");


        // WIN CONDITIONS
        if (rowWinner || columnWinner() || dLeftWinner || dRightWinner) {
           console.log(`We have a winner, congratulations ${getPlayerTurn().name}`);
           winner = `We have a winner, congratulations ${getPlayerTurn().name}`;
           return
        }

        else if (isDraw) {
            console.log(`Better luck next time, its a Draw ...`);
            winner = `Better luck next time, its a Draw ...`;
            return
        }

        changePlayerTurn();

    };

    // console.log(`Let's Play some Tic Tac Toe!`)
    // console.log(board.getBoard());
    // console.log(`Make a play ... ${playerTurn.name}`)

    return {playRound, getPlayerTurn, newGame, getBoard: board.getBoard, getWinner};
};


const display = (function() { 
    const game = controller();


    const subTitle = document.querySelector(".active-player");

    const main = document.querySelector("main");

    const addPlayersBtn = document.querySelector(".playersName");
    const restartBtn = document.querySelector(".reset");

    const dialog = document.querySelector("dialog");
        const inputP1 = document.querySelector("input#playerOne");
        const inputP2 = document.querySelector("input#playerTwo");
        
    const closeDialogBtn = document.querySelector(".close");
    const enterDialogBtn = document.querySelector(".enter");


    let cell;


    // takes the board array from console version, loops through it and makes it 
    // dom elements creating the UI board.
    const renderGame = () => {

        
        game.getBoard().map((row, rowIndex) => {
            
            let rows = document.createElement("div");

            rows.setAttribute("class", `row`);

            main.appendChild(rows);
            
            
            row.map((column, columnIndex) => {

                let columns = document.createElement("div");
                let img = document.createElement("img");

                // data-attribute is set to help with matching the index of the array board.
                columns.setAttribute("class", "column");
                columns.setAttribute("data-rowIndex", `${rowIndex}`);
                columns.setAttribute("data-columnIndex", `${columnIndex}`);

                columns.textContent = " ";
                
                rows.appendChild(columns);
                columns.appendChild(img);
            });

        });

        cell = document.querySelectorAll(".column");
    };


    function playersClick(input1 = "Player One", input2 = "Player Two") {
        
        const game = controller(input1, input2)

        subTitle.textContent = `${game.getPlayerTurn().name} its your turn...`;

        cell.forEach ((element) => {
            
            element.addEventListener("click", () => {
               
                let row = Number(element.dataset.rowindex);
                let column = Number(element.dataset.columnindex);
                let  img = element.firstElementChild;
                
                let activePlayer = game.getPlayerTurn();
                // debugger
                game.playRound(row,column);

                // doesn't allow user to click on unavailable cell
                // based on the active player at the moment an icon will be set either
                // a cross or a circle.
                // the subtitle will be updated to the next player.
                if (!img.hasAttribute("src")) {
                   
                    if (activePlayer.mark === "X") {
                        
                        element.children[0].setAttribute("src", "svgs/cross.svg");

                    }
                    
                    if (activePlayer.mark === "O") {


                        element.children[0].setAttribute("src", "svgs/circle.svg");

                    }

                    // this player turn value call is to get the player who is about to play the next round
                    subTitle.textContent = `${game.getPlayerTurn().name} its your turn...`;


                    if(game.getWinner() != undefined) {
                        subTitle.textContent = game.getWinner();
                    }

                };


            });

        });

    };

    const playersOnDisplay = () => {


        enterDialogBtn.addEventListener("click", (event) => {
            
            event.preventDefault();

            if (inputP1.value && inputP2.value){
                playersClick(inputP1.value, inputP2.value);
            }
            else {
                playersClick();
            }

            dialog.close();
        });

        closeDialogBtn.addEventListener("click", ()=> {
            
            dialog.close();
        });


    };


    const btnAction = () => {
        

        restartBtn.addEventListener("click", () => {

            let rows = document.querySelectorAll(".row");
            
            cell.forEach((element) => {
                element.children[0].removeAttribute("src");
                element.textContent = " ";
            });

            rows.forEach((element) => {
                element.remove()
            })

            game.newGame();
            renderGame();
            playersClick();
        });

        addPlayersBtn.addEventListener("click", () => {
            
            playersOnDisplay();
            dialog.showModal();
        });

    };

    renderGame();
    btnAction();



})();
