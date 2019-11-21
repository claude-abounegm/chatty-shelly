'use strict';

class IShellCommand {
    constructor(cmd) {
        this._cmd = cmd;
    }

    get rawCommand() {
        return this._cmd;
    }

    compile() {
        throw new Error();
    }

    toString() {
        return this.compile();
    }

    get [Symbol.toStringTag]() {
        return this.toString();
    }
}

module.exports = IShellCommand;
