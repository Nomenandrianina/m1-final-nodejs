const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create utilisateur schema & model
const Commentaire = new Schema({
    utilisateur: {
        type: mongoose.Types.ObjectId, ref: "utilisateur"
    },
    attraction: {
        type: mongoose.Types.ObjectId, ref: "attraction"
    },
    comment: {
        type: String,
        required: [true, 'Email field is required']
    }
});


const commentaire = mongoose.model('commentaire', Commentaire);

module.exports = utilisateur;