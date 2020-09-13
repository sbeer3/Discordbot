const ytdl = require("ytdl-core");
const Discord = require("discord.js");
const MessageEmbed = require("discord.js");

function playMusic(queue, msg) {
    var song = queue[0][0];
    const voice = msg.member.voice.channel;
    if (voice) {
      msg.member.voice.channel.join().then(connection => {
        const stream = ytdl(song, { format: "audioonly" });
        const nowPlaying = new Discord.MessageEmbed().setTitle("Now Playing").setDescription(`Now playing: [${queue[0][1]}](${queue[0][0]}) | Queue length: ${queue.length}`).setColor(0x1857a9);
        dispatcher = connection.play(stream);
        msg.channel.send(nowPlaying);

        //Event 'finish' is run when the dispatcher finishes a song, so when it hits this, it will check queue length and play the next song.
        dispatcher.on("finish", function() {
          queue.shift();
          if (queue.length >= 1) {
            playMusic(queue, msg);
          } else if (queue.length === 0) {
            const endQueueMSG = new Discord.MessageEmbed().setTitle("End Of Queue").setDescription( "The queue has completed. Fembot will leave in 60 seconds. ~play [song] to keep going!").setColor(0x1857a9);
            msg.channel.send(endQueueMSG);
            setTimeout(function() {
              if (queue.length === 0) {
                dispatcher.destroy();
                msg.member.voice.channel.leave();
                return;
              } else {
                return;
              }
            }, 60000);
          }
        });
      });
    } else {
      msg.reply("You must be in a voice channel to queue up music!");
    }
  }

function skip(queue, msg) {
  queue.shift();
    if (queue.length >= 1) {
      playMusic(queue, msg);
      return;
    } else {
      dispatcher.destroy();
      const skipQueueMSG = new Discord.MessageEmbed().setTitle("End Of Queue").setDescription( "The queue has completed. Fembot will leave in 60 seconds. ~play [song] to keep going!").setColor(0x1857a9);
      msg.channel.send(skipQueueMSG);
      setTimeout(function() {
        if (queue.length === 0) {
          msg.member.voice.channel.leave();
          return;
        } else {
          return;
        }
      }, 60000);
      return;
    }
}



exports.playMusic = playMusic;
exports.skip = skip;