'use strict';

const _ = require('lodash');
const ShellCommand = require('./ShellCommand');
const ShellCommands = require('./ShellCommands');
const ShellKeyPair = require('./ShellKeyPair');

function command(cmd) {
    return new ShellCommand(parseCmd(cmd));
}

function commands(cmds, operator) {
    return new ShellCommands(cmds.map(command), operator);
}

function pipe(cmds) {
    return commands(cmds, ' | ');
}

function all(cmds) {
    return commands(cmds, '; ');
}

function or(cmds) {
    return commands(cmds, ' || ');
}

function and(cmds) {
    return commands(cmds, ' && ');
}

function parseCmd(cmd) {
    if (!_.isArray(cmd)) {
        throw new Error('cmd needs to be an array');
    }

    const args = [];

    for (let part of cmd) {
        if (_.isString(part)) {
            args.push(part);
        } else if (_.isPlainObject(part) || _.isMap(part)) {
            args.push(ShellKeyPair.parse(part));
        } else if (_.isArray(part)) {
            args.push(command(part));
        } else if (part instanceof ShellCommand) {
            args.push(part);
        }
    }

    return args;
}

module.exports = { command, commands, and, or, all, pipe };

// class Raw extends BaseShell {
//     constructor(cmd) {
//         super();

//         if (_.isArray(cmd)) {
//             cmd = cmd.join(' ');
//         }

//         this._id = hash(cmd);
//         this._cmd = cmd;
//     }

//     get cmd() {
//         return this._id;
//     }

//     cleanup(str) {
//         return str.replace(this._id, this.cmd);
//     }
// }
