function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];


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

    // const getBoard = () => {
    //    return console.log(board);
    // };

    return {getBoard, chooseCell, isValid};
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
};


function controller(input1, input2) {
    
    const board = gameBoard();
    // const boardValues = gameBoard().getBoard();
    const player = createPlayers(input1, input2).players;

    let playerTurn = player[0];

    const getPlayerTurn = () => playerTurn;

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

        // console.log("Let's play some Tic Tac Toe");

        board.getBoard;
       
        console.log(board.getBoard());

        console.log(`Make a play ... ${playerTurn.name}`)
    }

    

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
            
            board.chooseCell(row, column, playerTurn.mark);
            
            console.log(board.getBoard());
            
            changePlayerTurn();
        } 

        else {
            console.log(`${playerTurn.name}, that play is not available...`);
            
            console.log(board.getBoard());

            console.log(`${playerTurn.name} try again...`);
            
            return;
        }
        

        // WIN VARIABLES  
        let isDraw =  board.getBoard()
        .map((row) => row.every((column) => column !== " "))
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

    // console.log(`Let's Play some Tic Tac Toe!`)
    // console.log(board.getBoard());
    // console.log(`Make a play ... ${playerTurn.name}`)

    return {playRound, getPlayerTurn, newGame};

};



const display = (function() {
    const board = gameBoard();

    const subTitle = document.querySelector(".active-player");

    let cell;

    const addPlayersBtn = document.querySelector(".playersName");
    const restartBtn = document.querySelector(".reset");

    const dialog = document.querySelector("dialog");
        const inputP1 = document.querySelector("input#playerOne");
        const inputP2 = document.querySelector("input#playerTwo");
        
    const closeDialogBtn = document.querySelector(".close");
    const enterDialogBtn = document.querySelector(".enter");

    
    const renderGame = () => {

        const main = document.querySelector("main");

        
        board.getBoard().map((row, rowIndex) => {
            
            let rows = document.createElement("div");

            rows.setAttribute("class", `row`);
            rows.setAttribute("data-index", `${rowIndex}`);

            main.appendChild(rows);
            
            
            row.map((column, columnIndex) => {

                let columns = document.createElement("div");
                let img = document.createElement("img");

                columns.setAttribute("class", "column");
                columns.setAttribute("data-index", `${columnIndex}`);

                columns.textContent = column;
                
                rows.appendChild(columns);
                columns.appendChild(img);
            });

        });

        cell = document.querySelectorAll(".column");

    };


    const playersClick = (input1, input2) => {
        let controllerUI = controller(input1, input2)

        // let cell = document.querySelectorAll(".column");

        cell.forEach((element) => {
            
            element.addEventListener("click", () => {
               
                let row = Number(element.parentElement.dataset.index);
                let column = Number(element.dataset.index);
                let activePlayer = controllerUI.getPlayerTurn();

                controllerUI.playRound(row,column);

                if (element.textContent == " ") {
                   
                    if (activePlayer.mark === "X") {
                       
                        element.children[0].setAttribute("src", "svgs/cross.svg");
                        // element.children[0].setAttribute("width", "150rem");
                        subTitle.textContent = `${activePlayer.name} has made a move...`;
                    }
                    
                    if (activePlayer.mark === "O") {
                       
                        element.children[0].setAttribute("src", "svgs/circle.svg");
                        // element.children[0].setAttribute("width", "120rem");
                        // another possible way.
                        subTitle.textContent = `${activePlayer.name} has made a move...`;
                    }
                    
                };

            });
        });

    };

    const playersOnDisplay = () => {


        enterDialogBtn.addEventListener("click", (event) => {
            
            event.preventDefault();
            playersClick(inputP1.value, inputP2.value)
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
            });

            rows.forEach((element) => {
                element.remove()
            })



            controller().newGame();
            renderGame();
            playersClick();
        });

        addPlayersBtn.addEventListener("click", () => {
            
            playersOnDisplay();
            dialog.showModal();
        });

    };

    renderGame();
    playersClick();
    btnAction();


})();


