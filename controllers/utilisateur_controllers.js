require("dotenv").config(); // load .env variables
const { Router } = require("express"); // import router from express
const Utilisateur = require("../models/utilisateurs");
const bcrypt = require("bcryptjs"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens
const router = Router();
const secret = process.env.SECRET;

// Signup route to create a new user
router.post("/signup", async (req, res) => {
    try {
      const user_email = await Utilisateur.findOne({ email: req.body.email });
        if(user_email){
          res.status(400).json({ error: "Mail existant!" });
        }else{
          req.body.password = await bcrypt.hash(req.body.password, 10);
          // create a new user
          const utilisateur = await Utilisateur.create({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            password: req.body.password,
          });
      
          // send new user as response
          const token = await jwt.sign({ email: req.body.email }, secret);
          res.status(200).json({
            id: utilisateur.id,
            nom: utilisateur.nom,
            prenom: utilisateur.prenom,
            email: utilisateur.email,
            password: utilisateur.password
          });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  });

//Login
router.post("/login", async (req, res) => {
    try {
      // check if the user exists
      const user = await Utilisateur.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        //check if password matches

        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          // sign token and send it in response
          const token = await jwt.sign({ email: user.email }, secret);
          res.status(200).json({
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            password: user.password,
            token: token
          });
        } else {
          res.status(400).json({ error: "Le mot de passe ne correspond pas!" });
        }
      } else {
        res.status(400).json({ error: "L'utilisateur n'existe pas!" });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  });

  // Update utilisateur information
  router.post("/update_utilisateur", async (req, res) =>{
    try {
      console.log("body",req.body.id);
      const utilisateur = await Utilisateur.findByIdAndUpdate(req.body.id,  { $set:{nom: req.body.nom,prenom:req.body.prenom} });
      res.status(200).json({ status:200,utilisateur });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  });

  router.get("/utilisateur_list", async (req, res) =>{
    try {
        const piece = await Utilisateur.find();
        res.status(200).json({ status:200,piece });
    } catch (error) {
      res.status(400).json({ error });
    }
});

module.exports = router;