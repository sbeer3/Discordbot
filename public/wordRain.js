var y = -100;
var ranX = Math.random() * Math.floor(1500);
var x = ranX;
var command = require('./bot.js');

const p5 = require('p5');
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(90);
  textSize(32);
  textFont('monospace');
  //background(1);
}

function draw() {
  
  var ran = Math.random()*Math.floor(1500);
  // var ranR = Math.random()*Math.floor(256);
  // var ranG = Math.random()*Math.floor(256);
  // var ranB = Math.random()*Math.floor(256);
  clear();
  y = y+1;
  if(y > 950) {
    y = 0;
    x = ran;
    fill("black");
  }
  text(command, x, y);
}