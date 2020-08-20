var discordkey=process.env.SECRET;
var youtubekey=process.env.youtube;
var pref = "~";
var queue = [];

const bl = require("./commands/blacklist.js");
const fs = require("fs");
const { google } = require("googleapis");
const ytdl = require('ytdl-core');

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));
const Discord = require("discord.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log("Fembot is connected");
});

client.on("message", async msg => {
  if (!msg.content.startsWith(pref) || msg.author.bot) {
    if (msg && bl.blacklist(msg.content) === true) {
      msg.delete();
    }
    return;
  }

  var arg = msg.content.replace(" ", "_").split("_")[1];
  var command = msg.content.split("~")[1].split(" ")[0];
  
  if (msg.content.startsWith(pref) && command === "play") {
    if(arg === undefined){
      dispatcher.resume();
      return;
    }
    const youtubeData = google.youtube({
      version: "v3",
      auth: 'AIzaSyC8_0f75WFdpJNoTchOO0m23ClYUB1YnSs'
    });

    const res = await youtubeData.search.list({
      part: "id, snippet",
      q: arg
    });

    var id = res.data.items[0].id.videoId;
    var url = `https://www.youtube.com/watch?v=${id}`;
    
    if(queue.length >= 1) {
      queue.push(url);
      return;
    }
    
    if(msg.member.voice.channel) {
      msg.member.voice.channel.join().then(connection => {
        const stream = ytdl(url, {format: 'audioonly'});
        dispatcher = connection.play(stream);
        
        dispatcher.on('finish', function() {
          if(queue.length >= 1){
            queue.pop();
          }
          else if(queue.length === 0) {
            dispatcher.destroy();
            msg.member.voice.channel.leave();
            return;
          }
        });
      });
    }
    
    return;
  }
  
  if(msg.content.startsWith(pref) && command === 'pause'){
    dispatcher.pause();
    return;
  }

  if (!client.commands.has(command)) {
    msg.reply("That command does not exist!");
    return;
  }

  try {
    client.commands.get(command).execute(msg, arg);
  } catch (error) {
    msg.reply("There was an error with that command!");
  }
});

client.login(discordkey);


//sources or referenced webpages
//https://discordjs.guide <--- was a big help in handling some of the smaller things, like command files being separate and not just a line of if else statements! 
