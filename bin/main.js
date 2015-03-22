#!/usr/bin/env node

console.log('=== icescrobbler ===');

var app = require('../index');

if (process.argv.length > 2) {
    app.init(process.argv[2], process.argv[3], process.argv[4]);
    app.start();
} else {

    var readline = require('readline');

    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function hidden(query, callback) {
        var stdin = process.openStdin();
        var onDataHandler = function(char) {
            char = char + "";
            switch (char) {
                case "\n": case "\r": case "\u0004":
                // Remove this handler
                stdin.removeListener("data",onDataHandler);
                break;//stdin.pause(); break;
                default:
                    process.stdout.write("\033[2K\033[200D" + query + Array(rl.line.length+1).join("*"));
                    break;
            }
        };
        process.stdin.on("data", onDataHandler);

        rl.question(query, function(value) {
            rl.history = rl.history.slice(1);
            callback(value);
        });
    }

    rl.question('Your last.fm username: ', function (user) {
        if (user) {
            hidden('Your last.fm password: ', function (pwd) {
                if (pwd) {
                    rl.question('Stream URL: ', function (url) {
                        if (url) {
                            app.init(user, pwd, url);
                            app.start();
                            rl.close();
                        }
                    });
                }
            });
        }
    });
}
