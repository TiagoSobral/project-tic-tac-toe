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


function createPlayers(nameOne = "PlayerOne", nameTwo = "PlayerTwo") {
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

    const changePlayerTurn = () => {

        if (playerTurn === player[0]) {
        
            playerTurn = player[1];
      }

        else {
        
            playerTurn = player[0];
      }
       
      console.log(`Its your turn ... ${playerTurn.name}!`)
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

            console.log(board.getBoard())
            
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
        .every((value) => value === "X" || value === "O");


        // WIN CONDITIONS
        if (rowWinner || columnWinner() || diagonalLeft() || diagonalRight()) {
           console.log(`We have a winner, congratulations ${playerTurn.name}`);
           
        }

        else if (isDraw) {
            console.log(`Better luck next time, its a Draw ...`);
            
        }

    };

    const newGame = () => {
        
        playerTurn =  player[0];

        board.newBoard();

        console.log(board.getBoard());

        console.log(`Make a play ... ${playerTurn.name}`);
    };

    // console.log(`Let's Play some Tic Tac Toe!`)
    // console.log(board.getBoard());
    // console.log(`Make a play ... ${playerTurn.name}`)

    return {playRound, getPlayerTurn, newGame, getBoard: board.getBoard};
};


const display = (function() { 
    const game = controller();
    const board = game.getBoard();

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

    
    const renderGame = () => {
        
        board.map((row, rowIndex) => {
            
            let rows = document.createElement("div");

            rows.setAttribute("class", `row`);
            rows.setAttribute("data-index", `${rowIndex}`);

            main.appendChild(rows);
            
            
            row.map((column, columnIndex) => {

                let columns = document.createElement("div");
                let img = document.createElement("img");

                columns.setAttribute("class", "column");
                columns.setAttribute("data-index", `${columnIndex}`);

                columns.textContent = " ";
                
                rows.appendChild(columns);
                columns.appendChild(img);
            });

        });

        cell = document.querySelectorAll(".column");

    };


    function playersClick() {
        // let game = controller(input1, input2)

        cell.forEach((element) => {
            
            element.addEventListener("click", () => {
               
                let row = Number(element.parentElement.dataset.index);
                let column = Number(element.dataset.index);
                let activePlayer = game.getPlayerTurn();

                game.playRound(row,column);

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
    playersClick();
    btnAction();


})();
