const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Attraction schema & model
const Attraction_media = new Schema({
    Attraction: {
        type: mongoose.Types.ObjectId, ref: "attraction"
    },
    background: {
        type: String,
        default: "0"
    },
    media_type: {
        type: String,
        required: [true, 'Media Type field is required']
    },
    media_path: {
        type: String,
        required: [true, 'Media Path name field is required']
    }
});


const attraction_media = mongoose.model('attraction_media',Attraction_media);

module.exports = attraction_media;