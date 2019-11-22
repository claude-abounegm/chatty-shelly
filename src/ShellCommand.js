'use strict';

const _ = require('lodash');
const { quote } = require('shell-quote');
const IShellCommand = require('./IShellCommand');
const ShellKeyPair = require('./ShellKeyValuePair');

class ShellCommand extends IShellCommand {
    constructor(cmd) {
        super();

        if (!_.isArray(cmd)) {
            throw new Error('cmd needs to be an array');
        }

        this._cmd = cmd;
    }

    static parse(cmdArray) {
        if (cmdArray instanceof ShellCommand) {
            return cmdArray;
        }

        if (!_.isArray(cmdArray)) {
            throw new Error('cmd needs to be an array');
        }

        const args = [];

        for (let cmd of cmdArray) {
            if (_.isString(cmd)) {
                args.push(cmd);
            } else if (_.isPlainObject(cmd) || _.isMap(cmd)) {
                args.push(ShellKeyPair.parse(cmd));
            } else if (_.isArray(cmd)) {
                args.push(ShellCommand.parse(cmd));
            } else if (cmd instanceof IShellCommand) {
                args.push(cmd);
            }
        }

        return new ShellCommand(args);
    }

    compile() {
        if (!this._compiled) {
            const args = [];

            for (let cmd of this._cmd) {
                if (_.isString(cmd)) {
                    args.push(quote(cmd));
                } else if (cmd instanceof IShellCommand) {
                    let compiled = cmd.compile();

                    if (cmd instanceof ShellCommand) {
                        compiled = quote(compiled);
                    }

                    if (!_.isArray(compiled)) {
                        compiled = [compiled];
                    }

                    args.push(...compiled);
                } else {
                    throw new Error('incorrect');
                }
            }

            this._compiled = args.join(' ');
        }

        return this._compiled;
    }
}

module.exports = ShellCommand;
