const fs = require("fs");

module.exports = {
  name: "addbl",
  description: "This command is used to add things to the server-blacklist",
  execute(msg, arg) {
    
    if(!msg.member.role.hasPermissions('Administrator')) {
        msg.reply('You must be an admin to use this command!');
       return;
    }
    
    if (arg === undefined) {
      msg.reply("Please include an argument to add to the blacklist!");
      return;
    } else {
      console.log(arg);
      fs.appendFileSync("./commands/blacklist.txt", '\n' + arg, "ascii");
      msg.reply("Entry successfully added!");
      return;
    }
  }
};
