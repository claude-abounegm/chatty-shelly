'use strict';

const _ = require('lodash');
const ShellCommand = require('./ShellCommand');

class ShellCommands extends ShellCommand {
    constructor(cmds, operator) {
        super(cmds);

        if (!_.isString(operator)) {
            throw new Error('seperator needs to be a sting');
        }

        this._cmd = cmds;
        this.operator = operator;
    }

    static parse(arr, operator) {
        return new this(arr, operator);
    }

    compile() {
        if (!this._compiled) {
            this._compiled = this._cmd
                .map(cmd => {
                    if (_.isString(cmd)) {
                        return cmd;
                    }

                    return ShellCommand.parse(cmd);
                })
                .join(this.operator);
        }

        return this._compiled;
    }
}

module.exports = ShellCommands;
