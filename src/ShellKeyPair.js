'use strict';

const _ = require('lodash');
const ShellCommand = require('./ShellCommand');

class ShellKeyPair extends ShellCommand {
    constructor(arr) {
        super(arr);
    }

    static parse(obj) {
        let keyPairs;
        if (_.isPlainObject(obj)) {
            keyPairs = _.toPairs(obj);
        } else if (_.isMap(obj)) {
            keyPairs = Array.from(obj.entries());
        }

        if (!keyPairs) {
            throw new Error('failed to parse obj');
        }

        return new this(keyPairs);
    }

    get cmd() {
        return this._cmd.map(([key, value]) => {
            key = String(key).trim();

            if (!key.length > 0) {
                throw new Error('key needs to be a valid string');
            }

            return `${key}=${value}`;
        });
    }

    get special() {
        return this.cmd;
    }
}

module.exports = ShellKeyPair;
