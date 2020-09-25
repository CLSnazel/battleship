//10x10 board, A-J, 1-10
const { stdin, stdout } = require('process');
const battleBoard = {
  board: [],
  initBoard: function() {
    let newRow = [];
    for (let j = 0; j < 10; j++) {
      newRow.push('🌊');
    }
    for(let i = 0; i < 10; i++){
      this.board.push(newRow);
    }
  },
  print: function() {
    console.log('   A B C D E F G H I J');
    let rowCount = 1;
    this.board.map(row => {
      let rowCountString = rowCount.toString();
      if(rowCountString.length < 2){
        rowCountString += " ";
      }
      console.log(rowCountString, row.join(''));
      rowCount += 1;
    });
    //console.log(this.board);
  },
  initAllShips: function() {
    //player submits gridpoint
    // A Carrier, which is 5 tiles long
    let coords = this.validateMove('B3');
    this.addShip(coords, '🚢', 5);
    // A Battleship, which is 4 tiles long
    //this.addShip('', '🛥️', 4);
    // A Cruiser, which is 3 tiles long
    //this.addShip('','⛵', 3);
    // A Submarine, which is 3 tiles long
    this.addShip(coords, '🚣', 3);
    // A Destroyer, which is 2 tiles long
    //this.addShip('', '🏄‍♀️', 2);
  },
  addShip: function(coords, emoji, size) {
    if (coords) {
      //add end-spaces left, right, up, down based on size
      let endPoints = [[coords[0] - size, coords[1]], //endpoint up
                       [coords[0] + size, coords[1]], //endpoint down
                       [coords[0], coords[1] - size], //endpoint left
                       [coords[0], coords[1] + size]]; //endpoint right
      //if endpoints are not within board bounds, remove them
      for (let i = 0; i < endPoints.length; i++) {
        //is the row within bounds?
        if(endPoints[i][0] < 0 || endPoints[i][0] > 9){
          endPoints.splice(i, 1);

        } else if(endPoints[i][1] < 0 || endPoints[i][1] > 9) {
          //is the col in bounds?
          endPoints.splice(i, 1);
        }
      }
      //remove endpoints that would crash into other boats
      //there should check here if the endpoints are empty
    }
    //computer returns valid endpoint grid
  },
  //return array coordinates if valid
  validateMove: function(coordinates) {
    if(coordinates.length > 3 || coordinates.length < 2) {
      return undefined; 
    }
    coordinates = coordinates.toUpperCase();
    // Column Validation
    // <string>.charCodeAt(index) > returns unicode values of character
    // unicode ranges 65 to 74 for character value
    let charVal = coordinates.charCodeAt(0);
    console.log(charVal);
    if(charVal >= 65 && charVal <= 74){
      charVal -= 65;
    } else {
      return undefined;
    }

    // Row Validation
    //A1 -> A10....not A100 
    let rowString = coordinates.slice(1,coordinates.length); 
    if(rowString.length > 2){
      return undefined;
    } else {
      rowNum = Number(rowString);
      if(Number.isNaN(rowNum) || !Number.isInteger(rowNum) || rowNum > 10 || rowNum < 1){
        return undefined;
      } else {
        return [rowNum - 1, charVal];
      }
    }
  }
};

let myBoard = battleBoard;
myBoard.initBoard();
myBoard.print();
console.log(myBoard.validateMove('B3'));
console.log(myBoard.validateMove('K3'));

/// let userInput = "";
/// let userInputOk = false;
/// while(!userInputOk){
  /*
      userInput = input("What do?:");
      if(userInput === 'whet'){
        userInputOk = true;
      } else {
        console.log("dat no good. try again.")
      }
}
*/
const setupInput = function (conn) {
  connection = conn; 
  const stdin = process.stdin; 
  stdin.setRawMode(true); 
  stdin.setEncoding(ENCODE); 
  stdin.resume(); 
  stdin.on('data', handleUserInput); 
  return stdin; 
}; 


// write: process.stdout.write
// read: stdin.on('data', callback); 

module.exports = { battleBoard };