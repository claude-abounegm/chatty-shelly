'use strict';

const _ = require('lodash');
const { quote } = require('shell-quote');
const BaseShell = require('./BaseShell');

class ShellCommand extends BaseShell {
    constructor(cmd) {
        super();

        if (!_.isArray(cmd)) {
            throw new Error('cmd needs to be an array');
        }

        this._cmd = cmd;
    }

    get cmd() {
        const args = [];

        for (let part of this._cmd) {
            if (_.isString(part)) {
                args.push(part);
            } else if (part instanceof BaseShell) {
                let { special } = part;

                if (!_.isArray(special)) {
                    special = [special];
                }

                args.push(...special);
            } else {
                throw new Error('incorrect');
            }
        }

        return args;
    }

    quote() {
        return quote(this.cmd);
    }

    get special() {
        return this.quote();
    }

    get [Symbol.toStringTag]() {
        return this.quote();
    }
}

module.exports = ShellCommand;
