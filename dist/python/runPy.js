"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runPy = function (processName, pathToScript) {
    return new Promise(function (success, nosuccess) {
        var spawn = require("child_process").spawn;
        var pyprog = spawn(processName, [pathToScript]);
        pyprog.stdout.on("data", function (data) {
            success(data);
        });
        pyprog.stderr.on("data", function (data) {
            nosuccess(data);
        });
    });
};
exports.default = runPy;
