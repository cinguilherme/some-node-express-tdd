const mongoose = require('mongoose');


const CharSheetSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    system: {
        type: String,
        required: true
    },
    characterName: {
        type: String
    },
    playerName: {
        type: String
    }

});

const CharSheetModel = mongoose.model("CharSheet", CharSheetSchema);

module.exports = CharSheetModel;

