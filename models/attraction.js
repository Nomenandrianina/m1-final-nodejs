const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Attraction schema & model
const Attraction = new Schema({
    type: {
        type: String,
        required: [true, 'Type field is required']
    },
    localisation: {
        type: String,
        required: [true, 'Localisation name field is required']
    },
    html_content: {
        type: String
    }
});


const attraction = mongoose.model('attraction',Attraction);

module.exports = attraction;