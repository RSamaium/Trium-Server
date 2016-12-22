"use strict";

class BadRequestError extends Error {
    
    constructor(message) {
        super();
        this.message = message;
        this.stack = new Error().stack;
        this.status = 400;
        this.name = "BadRequestError";
    }
    
}

module.exports = BadRequestError;