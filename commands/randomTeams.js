var shuffle = require('shuffle-array');
const Discord = require("discord.js");
const MessageEmbed = require("discord.js");

module.exports = {
  command: "randomTeams",
  use: "Generates random teams!",
  execute(msg, arg) {
    var players = arg.split(' |')[0];
    var teams = arg.split('| ')[1];
    players = players.split(' ');
 
    shuffle(players); 
    
    var half = players.length /2;
    var team1 = players.splice(0, half);
    var team2 = players;
    
    const tems = new Discord.MessageEmbed().setTitle("Random Teams!").setDescription("Here are the randomly generated teams:").setColor(0x1857a9).addField('__Team 1:__', team1, true).addField('__Team 2:__', team2, true);
    msg.channel.send(tems);
   
  }
};