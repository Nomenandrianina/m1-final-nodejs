require("dotenv").config(); // load .env variables
const { Router } = require("express"); // import router from express
const Attraction = require("../models/attraction");
const Attraction_media = require("../models/attraction_media");
const router = Router();

//route to create a new attraction
router.post("/create/attraction", async (req, res) => {
    try {
        // create a new attraction
        const attraction = await Attraction.create({
            type: req.body.type,
            localisation: req.body.localisation,
            html_content: req.body.html_content,
        });

        const attraction_media = await Attraction_media.create({
            Attraction: attraction._id,
            background: req.body.background ? req.body.background : '0',
            media_type: req.body.media_type,
            media_path: req.body.media_path,
        })

        res.status(200).json({
            id: attraction.id,
            type: attraction.type,
            localisation: attraction.localisation,
            html_content: attraction.html_content
        });
    } catch (error) {
        res.status(400).json({ error });
    }
});

router.get("/attraction/all", async (req, res) => {
    try {
    // Récupérer les médias avec background = 1 à partir de la table AttractionMedia
        const mediaWithBackgroundOne = await Attraction_media.find({ background: 1, media_type: 'image' }).populate('Attraction','-__v').select('-__v') 
        .exec();;

        res.status(200).json(mediaWithBackgroundOne);
    } catch (error) {
        res.status(400).json({ error });
    }
});

router.get("/attraction/detail/", async (req, res) => {
    try {
    // Récupérer les médias avec background = 1 à partir de la table AttractionMedia
        const mediaWithBackgroundOne = await Attraction_media.find({ background: 1, media_type: 'image' }).populate('Attraction','-__v').select('-__v') 
        .exec();;

        res.status(200).json(mediaWithBackgroundOne);
    } catch (error) {
        res.status(400).json({ error });
    }
});

module.exports = router;