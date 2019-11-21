'use strict';

const _ = require('lodash');
const IShellCommand = require('./IShellCommand');

class ShellKeyValuePair extends IShellCommand {
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

    compile() {
        if (!this._compiled) {
            this._compiled = this._cmd.map(([key, value]) => {
                key = String(key).trim();

                if (!key.length > 0) {
                    throw new Error('key needs to be a valid string');
                }

                return `${key}=${value}`;
            });
        }

        return this._compiled;
    }
}

module.exports = ShellKeyValuePair;
