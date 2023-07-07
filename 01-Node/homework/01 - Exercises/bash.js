const process = require('process');
const { Z_ASCII } = require('zlib');
const commands = require('./commands/index.js');

const print = (output) =>{
   process.stdout.write(output);
   process.stdout.write("\nprompt > ");
}

function bash() {
   process.stdout.write("prompt > ");
   process.stdin.on("data", (data) => {
         let args = data.toString().trim().split(' '); //saca los espacios delante
         // y detras y debuelve un array
         let cmd = args.shift(); //saco la primera palablra
         
         commands[cmd]
         ? commands[cmd](print, args.join(' '))
         :
         print(`command not found: ${cmd}`);
      });
}

bash();
module.exports = {
   print,
   bash,
};