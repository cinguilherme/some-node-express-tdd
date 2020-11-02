const _ = require('lodash');
class Responder {

    constructor(data, err) {
        this.data = data;
        this.err = err;
    }

    isErr() {
        return this.err !== undefined;
    }

    getStatus() {
        if (this.data === null) {
            return 404;
        }
        if (this.err) {
            return 500
        }
        else {
            return 200;
        }
    }

    extract() {
        if (this.err) {
            return { errorMessage: this.err }
        } else {
            return this.data === null ? { message: "id not found" } : this.data;
        }
    }

}

module.exports = { Responder }