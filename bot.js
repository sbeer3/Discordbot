//including the secret API keys for discord and Youtube Data Api
var discordkey = process.env.SECRET;
var youtubekey = process.env.youtube;
//Pref = bot command prefix ---- queue = music queue array
var pref = "~";
var queue = [];

//including all additional Node packages / files that arent command files
const bl = require("./commands/blacklist.js");
const fs = require("fs");
const { google } = require("googleapis");
const ytdl = require("ytdl-core");
const Discord = require("discord.js");
const MessageEmbed = require("discord.js");

//connecting to the Youtube Data API
const youtubeData = google.youtube({
  version: "v3",
  auth: "AIzaSyC8_0f75WFdpJNoTchOO0m23ClYUB1YnSs"
});

//including all command files and putting them in a collection called commands
const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

const client = new Discord.Client();
client.commands = new Discord.Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

//When the bot is connected it will run this code
client.on("ready", () => {
  console.log("Bot is connected");
});

client.on("message", async msg => {
  //This is checking to see if it is just a normal message, or if it is a message from the bot.
  //If it is not a command msg, it will run it through the blacklist command and strike down if it is in the server blacklist.txt
  if (!msg.content.startsWith(pref) || msg.author.bot) {
    if (msg && bl.blacklist(msg.content) === true) {
      msg.delete();
    }
    return;
  }

  var arg = msg.content.replace(" ", "_").split("_")[1];
  var command = msg.content.split("~")[1].split(" ")[0];

  if (msg.content.startsWith(pref) && command === "play") {
    if (arg === undefined) {
      dispatcher.resume();
      return;
    }

    //this calls you youtube data api search / list function to search based on the provided parameters!
    const res = await youtubeData.search.list({
      part: "id, snippet",
      q: arg
    });

    //this parses through the returned data to get the video 'id' which can then be placed at the end of the URL and work for the video player!
    var id = res.data.items[0].id.videoId;
    var url = `https://www.youtube.com/watch?v=${id}`;
    var title = res.data.items[0].snippet.title;

    //Tests queue length, if 0 it'll begin the play process, if > 0 it will push song to queue and do nothing!
    if (queue.length >= 1) {
      queue.push(url);
      const queueMsg = new Discord.MessageEmbed()
        .setTitle("Added to Queue")
        .setDescription(`[${title}](${url}) has been added to queue | Queue Length: ${queue.length}`)
        .setColor(0x1857a9);
      msg.channel.send(queueMsg);
      return;
    } else {
      queue.push(url);
      playMusic(queue[0]);
    }
    return;
  }

  //this is a function I made to work as the music player, it is easier to coneptualize this way with the finishing event in the dispatcher, when finished, checks queue length, and plays or ends accordingly!
  function playMusic(song) {
    if (msg.member.voice.channel) {
      msg.member.voice.channel.join().then(connection => {
        const stream = ytdl(song, { format: "audioonly" });
        const nowPlaying = new Discord.MessageEmbed()
          .setTitle("Now Playing")
          .setDescription(`Now playing: [${title}](${url}) | Queue length: ${queue.length}`)
          .setColor(0x1857a9);
        dispatcher = connection.play(stream);
        msg.channel.send(nowPlaying);

        //Event 'finish' is run when the dispatcher finishes a song, so when it hits this, it will check queue length and play the next song.
        dispatcher.on("finish", function() {
          queue.shift();
          if (queue.length >= 1) {
            playMusic(queue[0]);
          } else if (queue.length === 0) {
            dispatcher.destroy();
            msg.member.voice.channel.leave();
            return;
          }
        });
      });
    } else {
      msg.reply("You must be in a voice channel to queue up music!");
    }
  }

  //pauses the dispatcher
  if (msg.content.startsWith(pref) && command === "pause") {
    dispatcher.pause();
    return;
  }

  //tests to see if a command is in the collection of included files from the top
  if (!client.commands.has(command)) {
    msg.reply("That command does not exist!");
    return;
  }
  
  //trys the command, if working, executes, else it returns an error!
  try {
    client.commands.get(command).execute(msg, arg);
  } catch (error) {
    msg.reply("There was an error with that command!");
  }
});

//logs the bot into the discord services
client.login(discordkey);

//sources or websites that helped me out :)
//https://discordjs.guide <--- This guide was very helpful in making some of the basic youtube player functionalities, as well as code files separate from the bot.js file.
