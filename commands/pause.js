module.exports = {
  command: "pause",
  use: "pauses the bot",
  execute(msg, arg) {
    dispatcher.pause();
  }
};