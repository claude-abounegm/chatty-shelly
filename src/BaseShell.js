'use strict';

class BaseShell {
    get cmd() {
        throw new Error();
    }

    get special() {
        throw new Error();
    }

    quote() {
        throw new Error();
    }
}

module.exports = BaseShell;
