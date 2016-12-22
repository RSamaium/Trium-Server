'use strict';

class InternalServerError extends Error {

    constructor(message) {
        super();
        this.message = message;
        this.stack = new Error().stack;
        this.status = 500;
        this.name = "InternalServerError";
    }

}

module.exports = InternalServerError;
