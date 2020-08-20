const fs = require("fs");

//This is just a standard function that is being used in the actual bot file, not a command, it scans a word with a file of blacklisted words, and if it returns true, the msg is deleted
function blacklist(arg) {
  var bl = fs.readFileSync("./commands/blacklist.txt", "ascii");
  var bl = bl.split("\n");

  for (var i = 0; i < bl.length; i++) {
    if (arg.includes(bl[i])) {
      return true;
    }
  }
}

exports.blacklist = blacklist;
