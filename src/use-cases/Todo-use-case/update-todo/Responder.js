
class Responder {
    constructor(data, err) {
        this.data = data;
        this.err = err;
    }


    status() {
        if (this.err) {
            return this.err.type;
        } else {
            return 200;
        }
    }

    extract() {
        if (this.err) {
            return { errorMessage: this.err };
        } else {
            return this.data;
        }
    }
}

module.exports = { Responder }