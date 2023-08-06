const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Attraction schema & model
const Notification = new Schema({
    Utilisateur: {
        type: mongoose.Types.ObjectId, ref: "utilisateur"
    },
    titre: {
        type: String
    },
    details: {
        type: String
    },
    lien: {
        type: String
    }

});

const notification = mongoose.model('notification',Notification);

module.exports = notification;
