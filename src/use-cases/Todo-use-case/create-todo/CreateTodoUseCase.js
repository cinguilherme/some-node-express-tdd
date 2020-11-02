const { Responder } = require('./Responder');

class CreateTodo {

    constructor(model, command) {
        this.model = model;
        this.command = command;
    }

    async execute() {
        try {
            const data = await this.model.create(this.command.data);
            return new Responder(data, undefined);
        } catch (error) {
            return new Responder(undefined, error);
        }
    }
}

module.exports = {
    CreateTodo
}
