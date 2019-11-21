'use strict';

const ShellCommand = require('./ShellCommand');
const ShellCommands = require('./ShellCommands');

/**
 *
 * @param {[]} cmd
 * @returns {ShellCommand}
 */
function command(cmd) {
    return ShellCommand.parse(cmd);
}

/**
 *
 * @param {[]} cmds
 * @param {string} operator
 * @returns {ShellCommands}
 */
function commands(cmds, operator) {
    return ShellCommands.parse(cmds, operator);
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
