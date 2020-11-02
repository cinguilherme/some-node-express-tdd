const { Responder } = require('./Responder');
class UseCase {

    constructor(model, command) {
        this.model = model;
        this.command = command;
    }

    execute = async () => {
        const id = this.command.id;
        try {
            const result = await this.model.findById({ id });
            return new Responder(result, undefined);
        } catch(err) {
            return new Responder(undefined, err);
        }

    }

}

module.exports = { UseCase }