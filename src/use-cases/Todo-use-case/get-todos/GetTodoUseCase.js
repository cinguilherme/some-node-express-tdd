const { Responder } = require('./Responder');
class GetTodos {
    constructor(model, command){
        this.model = model;
        this.command = command;
    }

    execute = async () => {
        try {
            const data = await this.model.find({});
            return new Responder(data, undefined);
        } catch (err) {
            return new Responder(undefined, err)
        } 
    }
}

module.exports = { GetTodos }