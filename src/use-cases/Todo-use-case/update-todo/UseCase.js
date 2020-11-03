const { ModuleResolutionKind } = require('typescript');
const { Responder } = require('./Responder');
const { _ } = require('lodash');

class UseCase {

    constructor(model, command) {
        this.model = model;
        this.command = command;
    }

    badRequest(data) {
        if (!data._id) {
            return new Responder(null, {
                type: 400,
                errorMessage: "_id is required"
            });
        }
    }

    async execute() {
        try {

            const err = this.badRequest(this.command.data);
            if (err) return err;

            const _id = this.command.data._id;
            const { title, done } = this.command.data;

            const res = await this.model.findByIdAndUpdate(_id,
                { title, done },
                { new: true, useFindAndModify: false });

            return new Responder(res, null);
        } catch (err) {
            return new Responder(null, { ...err, type: 500 });
        }
    }
}

module.exports = { UseCase }