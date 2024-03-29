const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Attraction schema & model
const Attraction_media = new Schema({
    Attraction: {
        type: mongoose.Types.ObjectId, ref: "attraction"
    },
    Etape: {
        type: mongoose.Types.ObjectId, ref: "etape"
    },
    background: {
        type: String,
        default: "0"
    },
    media_type: {
        type: String
    },
    media_path: {
        type: String
    }
});


const attraction_media = mongoose.model('attraction_media',Attraction_media);

module.exports = attraction_media;