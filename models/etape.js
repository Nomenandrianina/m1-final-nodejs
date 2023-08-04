const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Attraction schema & model
const Etape = new Schema({
    Attraction: {
        type: mongoose.Types.ObjectId, ref: "attraction"
    },
    nom: {
        type: String
    },
    numero: {
        type: Number,
    },
    duree: {
        type: Number
    },
    unit: {
        type: String
    },
    description: {
        type: String
    },
    like_count: {
        type: Number,
        default: 0,
    }
});


const etape = mongoose.model('etape',Etape);

module.exports = etape;