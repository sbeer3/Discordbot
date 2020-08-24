const MessageEmbed = require('discord.js');
const Discord = require('discord.js');

module.exports = {
  name: 'help',
  description: 'This sends an embedded message of the bots commands!',
  execute(msg, arg) {
    const helpMSG = new Discord.MessageEmbed().setTitle('Help').setDescription('The prefix for commands is `~`').setColor(0x1857a9).addField('Music', '`play`, `pause`, `skip`, `clearqueue`, `playNext`, `disconnect`, `lyrics`', false)
    .addField('Misc', '`POI`, `Timball`, `Dict`, `Date`', false);
    msg.channel.send(helpMSG);
    
  },
}