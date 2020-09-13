var api = "CKBWcYllbf_ikhN0BSmK9vYf6YYdYuHgsibCJ1JzPi9weLfXDqp8IWXqsz_6YK1i";
const fetch = require("node-fetch");
const Genius = new (require("genius-lyrics")).Client(api);
const MessageEmbed = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  command: "lyrics",
  use: "This command takes the input of a song title and outputs song lyrics",
  execute(msg, arg) {
    async function lyrics(songArtist) {
      var title = songArtist.split("|")[0];
      var option = songArtist.split("| ")[1];
      Genius.tracks
        .search(title, { limit: 1 })
        .then(results => {
          const song = results[0];
          song.lyrics().then(lyrics => {
            const lyricMSG = new Discord.MessageEmbed()
              .setTitle(`${title}`)
              .setDescription(lyrics)
              .setColor(0x1857a9);
            if (option === undefined) {
              msg.author.send(lyricMSG);
              return;
            }

            if (
              (option === "channel" &&
                msg.member.hasPermission("ADMINISTRATOR")) ||
              (option === "channel" && msg.member.id === "104720362809339904")
            ) {
              msg.channel.send(lyricMSG);
              return;
            } else {
              msg.reply(
                "You do not have permission to send this command to channel! Try ~lyrics [title]"
              );
              return;
            }
          });
        })
        .catch(err => console.error(err));
    }

    lyrics(arg);
  }
};

//This is all code copied from the documentations for NPM genius-lyrics https://genius-lyrics.zyrouge.gq/#/examples/fetching-lyrics-fastest <---- FULL CREDIT HERE