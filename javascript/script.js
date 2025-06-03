function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];


    for (let r = 0; r < rows; r++) {
        board[r] = [];
        for (let c = 0; c < columns; c++ ) {
            board[r].push(cell());
        }
    };
    
    const getBoard = () => board;

    const chooseCell = (row, column, player) => {
    };

    const printMarker = (marker, index, array) => {
        const boardWithMarker = board.map((marker, index, array) => {
            
            return array[index] = marker;
        });
        
        return boardWithMarker;
    };

    return {getBoard, chooseCell, printMarker};
};

const game = gameBoard();


function cell() {
    let value = ".";

    const addMarker = (marker) => {value = marker};

    const getValue = () => {value};

    return {addMarker, getValue};
}

// function createPlayer(name, mark) {
//     // variables
//     let playerOne = name.at(0).toUpperCase() + name.slice(1);
//     let playerOneSymbol = mark.toUpperCase();
//     let playerTwo = "Computer";
//     let playerTwoSymbol;

//     // opponent symbol
//     function opponentMark(mark) {
//         if (mark === "X") {
//             return playerTwoSymbol = "O";
//         }
//         else {
//             return playerTwoSymbol = "X";
//         }
//     };

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
