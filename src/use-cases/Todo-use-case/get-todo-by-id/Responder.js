
class Responder {

    constructor(data, err) {
        this.data = data;
        this.err = err;
    } 

    isErr = () => {
        return this.err !== undefined;
    }

    extract = () => {
        if(this.err) {
            return {errorMessage: this.err}
        } else {
            return this.data;
        }
    }

}

module.exports = {Responder}