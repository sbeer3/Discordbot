const fetch = require("node-fetch");
const { getLyrics, getSong } = require("genius-lyrics-api");
const MessageEmbed = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "lyrics",
  description:
    "This command takes the input of a song title and outputs song lyrics",
  execute(msg, arg) {
    async function lyrics(songArtist) {
      var title = songArtist.split("|")[0];
      var artist = songArtist.split("|")[1];
      var option = songArtist.split("| ")[2];
      console.log(title, artist, option);

      const options = {
        apiKey:
          "CKBWcYllbf_ikhN0BSmK9vYf6YYdYuHgsibCJ1JzPi9weLfXDqp8IWXqsz_6YK1i",
        title: title,
        artist: artist,
        optimizeQuery: true
      };
      // const lyricMSG = new Discord.MessageEmbed().setTitle(`${title} by ${artist}`).setDescription(lyrics).setColor(0x1857a9);
      getLyrics(options).then(lyrics => {
        const lyricMSG = new Discord.MessageEmbed()
          .setTitle(`${title} by ${artist}`)
          .setDescription(lyrics)
          .setColor(0x1857a9);
        if (option === undefined) {
          msg.author.send(lyricMSG);
          return;
        }

        if (option === "channel" && msg.member.hasPermission("ADMINISTRATOR") || option === "channel" && msg.member.id === '104720362809339904') {
          msg.channel.send(lyricMSG);
          return;
        } else {
          msg.reply(
            "You do not have permission to send this command to channel! Try ~lyrics [title] | [artist]"
          );
          return;
        }
      });
    }

    lyrics(arg);
  }
};
