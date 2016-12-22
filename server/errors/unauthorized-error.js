'use strict';

class UnauthorizedError extends Error {

    constructor(message) {
        super();
        this.message = message;
        this.stack = new Error().stack;
        this.status = 401;
        this.name = "UnauthorizedError";
    }

}

module.exports = UnauthorizedError;
