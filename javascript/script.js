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
        return board;
    };

    return {getBoard, chooseCell, printBoard};
};

const game = gameBoard();



// const tiago = [[".",".","."],[".",".","."],[".","t","."]];


// tiago.map((element,row) => {
//     element.map((value, column)=> {
        // if (value is available change with player marker)
//         console.log(`Value: ${value}, Column: ${column}, Row: ${row}`)
//     })
// });














// function createPlayer(name, mark) {
//     // variables
//     const players = {
//         playerOne: name.at(0).toUpperCase() + name.slice(1),
//         playerOneSymbol: mark.toUpperCase(),
//         playerTwo: "Computer",
//         playerTwoSymbol: function() { 
//             if (mark === "X") {
//             return playerTwoSymbol = "O";
//             }
//         else {
//             return playerTwoSymbol = "X";
//             }
//         }    
//     }


//     opponentMark();

//     return {playerOne, playerOneSymbol, playerTwo, playerTwoSymbol};
// };




// 1 - gameboard needs to show on console
// 2 - player chooses name and mark & computer gets given a mark based on player choice
// 3 - play round
//  3.1 - user makes a play and chooses from the array where to place the mark
//  3.2 - once chosen the mark is spliced to the place where the player chose
//  3.3 - computer chooses where to place his mark based on where there is space(might want to cleverly place without just using random)
//  3.4 - gameboard is updated with players choices
// 4 - play rounds until one of them wins or draws
// 5 - based on the gameboard status we check who wins 
// 6 - gameboard is reset 
