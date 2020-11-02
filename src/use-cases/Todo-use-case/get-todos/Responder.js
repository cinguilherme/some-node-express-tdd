
class Responder {
    constructor(data, err) {
        this.data = data;
        this.err = err;
    }

    isErr() {
        return this.err !== undefined;
    }

    extract() {
        if(this.isErr()) {
            return {errorMessage: this.err}
        } else {
            return this.data;
        }
    }
}

module.exports = {Responder}