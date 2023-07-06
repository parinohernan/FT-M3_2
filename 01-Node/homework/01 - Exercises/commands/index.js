const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");

function pwd(print) {
    print(process.cwd());
}

function date(print) {
    print(Date())
}

function echo(print,args) {
    print(args)
}


function ls(print) {
    fs.readdir(".", (error, files) => {
        if (error) {
        throw Error(error);
        }
        print(files.join(" "));//para que quede como string
    });
}
  

function cat(print, arg) {
    fs.readFile(arg, 'utf-8',(error, data) => {
        if (error) throw Error(error);
        print(data);
      });
}

function head(print, args) {
    // if (!args.startsWith("https://")) {
        fs.readFile(args, 'utf-8',(error, data) => {
            if (error) throw Error(error);
            let linea1 = data.split("\n");
            print(linea1[0]);
          });
    // console.error("La URL debe comenzar con 'https://'");
    return;
    // }

//     request(args, (error, response) => {
//     if (error) {
//       throw error;
//     }
//     print(response);
//     return;
//   });
}

function tail(print, args) {
    fs.readFile(args, 'utf-8',(error, data) => {
        if (error) throw Error(error);
        // let linea1 = data.split("\n");
        // n = linea1.length;
        print(data.split('\n').at(-1).trim());
      });
}

function curl(print, args) {
    utils.request(args, (error, response) => {
    if (error) {
      throw error;
    }
    print(response);
    return;
  });
}

module.exports = {pwd, date, echo, ls, cat, head,tail, curl};
