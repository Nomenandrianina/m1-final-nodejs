require("dotenv").config(); // load .env variables
const { Router } = require("express"); // import router from express
const mongoose = require('mongoose');
const Notification = require("../models/notification");
const Utilisateur = require("../models/utilisateurs");
const router = Router();

// Creation nouvelle notification
router.post("/Create_notification", async (req, res) => {
    try {
        await Notification.create({
            Utilisateur: req.body.utilisateur,
            titre: req.body.titre,
            details: req.body.details,
            lien:""
        });
    } catch (error) {
      res.status(400).json({ error });
    }
});


// FindALl notification liste
router.get("/notification_list", async (req, res) =>{
    try {
        const user_id = req.query.utilisateurId
        const notification = await Notification.find({Utilisateur:user_id}).select('-__v -Utilisateur').exec();
        
        console.log("notification",notification);
        res.status(200).json( notification );
    } catch (error) {
        console.log("error",error)
      res.status(400).json({ error });
    }
});

module.exports = router;

