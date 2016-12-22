"use strict";

class NoPermissionError extends Error {
    
    constructor(message) {
        super();
        this.message = message;
        this.stack = new Error().stack;
        this.status = 403;
        this.name = "NoPermissionError";
    }
    
}

module.exports = NoPermissionError;
