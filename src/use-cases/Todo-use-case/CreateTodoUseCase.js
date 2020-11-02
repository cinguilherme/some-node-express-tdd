class CreateTodo {

    constructor(model, data) {
        this.model = model;
        this.data = data;
    }

    execute = async () => {
        try {
            return await this.model.create(this.data);   
        } catch (error) {
            return {errorMessage: error};
        }
    }
}

module.exports = {
    CreateTodo
}
