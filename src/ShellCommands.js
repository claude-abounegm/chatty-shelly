'use strict';

const _ = require('lodash');
const ShellCommand = require('./ShellCommand');

class ShellCommands extends ShellCommand {
    constructor(arr, operator) {
        super(arr);

        if (!_.isString(operator)) {
            throw new Error('seperator needs to be a sting');
        }

        this.operator = operator;
    }

    get cmd() {
        return this._cmd.map(cmd => cmd.quote());
    }

    quote() {
        return this.cmd.join(this.operator);
    }
}

module.exports = ShellCommands;
