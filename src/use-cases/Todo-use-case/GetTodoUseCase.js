
class GetTodos {
    constructor(model){
        this.model = model;
    }

    execute = async () => {
        try {
            return await this.model.find();
        } catch (err) {
            return {errorMessage: err};
        } 
    }
}

module.exports = { GetTodos }