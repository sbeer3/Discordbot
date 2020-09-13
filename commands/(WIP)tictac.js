// const ttt = require('./(WIP)tictacprint.js');
// const ran = require('./random.js');
// const prompt = require('prompt');
// // module.exports = {
// //   command: "tictac",
// //   use: "This will streamline a game of tictactoe with a user",
// //   execute(msg, arg) {
    
    
// //   }
// // };
// var array = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
// function tictactoe(array) {
  
//   var finished = false;
  
//   prompt.start();
//   prompt.get('input', function(err, res) {
//     res = res.input.split(' ');
//     var l = parseInt(res[0]);
//     var r = parseInt(res[1]);
//     array[l][r] = 'x';
//     ttt.printTTT(array);
    
//     while(isOver(array) != true) {
//       tictactoe(array);
//     }
//   });
  
// //   while(finished === false) {
    
// //   }
  
// }

// function isOver(array) {
//   if(array[0][0] === array[0][1] && array[0][0] === array[0][2] || array[1][0] === array[1][1] && array[1][0] === array[1][2] || array[2][0] === array[2][1] && array[2][0] === array[2][2]) {
//     console.log(`${array[0][0]} is the winner!`);
//     return true;
//   }
  
//   if(array[0][0] === array[1][0] && array[0][0] === array[2][0] || array[0][1] === array[1][1] && array[0][1] === array[2][1] || array[0][2] === array[1][2] && array[0][1] === array[2][2] ) {
//     console.log(`${array[0][0]} is the winner!`);
//     return true;
//   }
// }

// tictactoe(array);




// X | O | X 
// ----------
// O | X | O
// ----------
// X | O | O