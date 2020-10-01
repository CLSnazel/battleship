const { stdin } = require('process');
//const board = require('./battleBoard.js').battleBoard;
const { battleBoard } = require('./mvp/battleBoard.js');
stdin.setEncoding('utf-8');

// const validateAnswer = function(answer) {
//   if (answer === "1\n") {
//     return true;
//   }
//   return false;

// }

//const myBoard = battleBoard;
battleBoard.initBoard();

const validateMove = function(coordinates) {
  if (coordinates.includes('\n')) {
    coordinates = coordinates.slice(0, coordinates.indexOf('\n'));
  }
  //console.log(coordinates);
  if(coordinates.length > 3 || coordinates.length < 2) {
    //console.log("Coordinates too big");
    return undefined; 
  }
  coordinates = coordinates.toUpperCase();
  // Column Validation
  // <string>.charCodeAt(index) > returns unicode values of character
  // unicode ranges 65 to 74 for character value
  let charVal = coordinates.charCodeAt(0);
  //console.log(charVal);
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
    console.log(rowNum);
    if(Number.isNaN(rowNum) || !Number.isInteger(rowNum) || rowNum > 10 || rowNum < 1){
      return undefined;
    } else {
      return [rowNum - 1, charVal];
    }
  }
}


const answerData = {};
const questions = ['what do?', 'halp?', 'plz?'];
let questionState = 0;
const questionAsker = function(answer) {
  if(answerData[`q${questionState}`] === undefined) {
    //console.log();
    if(validateMove(answer)){
      answerData[`q${questionState}`] = answer;
      questionState ++;
      console.log('thanks.');
      if (questionState >= questions.length){
        console.log('no more questions. bye');
        console.log(answerData);
        // process.exit();
        battleBoard.print();
      }
      console.log(questions[questionState]);
    } else {
      console.log('NO! No good. Try again.');
      console.log(questions[questionState]);
    }
  }
}


//// Within the board

// series of questions

console.log(questions[questionState]);
stdin.on('data', data => {
  //console.log(data);
  questionAsker(data);
  // if (allgood) {
  //   console.log("CCOOOOOLL BEANS!");
  //   process.exit(); 
  // }
});

