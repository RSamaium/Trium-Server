'use strict';

class NotFoundError extends Error {

    constructor(message) {
        super();
        this.message = message;
        this.stack = new Error().stack;
        this.status = 404;
        this.name = "NotFoundError";
    }

}

module.exports = NotFoundError;
