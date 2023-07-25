const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create utilisateur schema & model
const Utilisateur = new Schema({
    nom: {
        type: String,
        required: [true, 'Name field is required']
    },
    prenom: {
        type: String,
        required: [true, 'First name field is required']
    },
    email: {
        type: String,
        required: [true, 'Email field is required']
    },
    password: {
        type: String,
        required: [true, 'Password field is required']
    }
});


const utilisateur = mongoose.model('utilisateur',Utilisateur);

module.exports = utilisateur;