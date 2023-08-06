require("dotenv").config(); // load .env variables
const { Router } = require("express"); // import router from express
const Notification = require("../models/notification");
const bcrypt = require("bcryptjs"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens
const router = Router();
const secret = process.env.SECRET;

// Creation nouvelle notification
router.post("/Create_notification", async (req, res) => {
    try {
        await Notification.create({
            Utilisateur: req.body.user_id,
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
        const notification = await Notification.find();
        res.status(200).json({ status:200,notification });
    } catch (error) {
      res.status(400).json({ error });
    }
});


