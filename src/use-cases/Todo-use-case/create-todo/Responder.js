
class Responder {
    constructor(data, err) {
        this.data = data;
        this.err = err;
    }

    isErr = () => {
        return this.err !== undefined;
    }

    extract = () => {
        return this.isErr() ? { errorMessage: this.err } : this.data;
    }

}

module.exports = { Responder }