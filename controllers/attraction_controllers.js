require("dotenv").config(); // load .env variables
const { Router } = require("express"); // import router from express
const mongoose = require('mongoose');
const Attraction = require("../models/attraction");
const Attraction_media = require("../models/attraction_media");
const Etape = require("../models/etape");
const { ObjectId } = require("mongodb");
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
            Etape: null,
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

router.post("/create/attraction/etape/:id", async (req, res) => {
    try {
        // create a new attraction
        const etape = await Etape.create({
            Attraction: req.params.id,
            nom: req.body.nom,
            numero: req.body.numero,
            duree: req.body.duree,
            unit: req.body.unit,
            description: req.body.description,
        });

        const attraction_media = await Attraction_media.create({
            Attraction: req.params.id,
            Etape: etape._id,
            background: req.body.background ? req.body.background : '0',
            media_type: req.body.media_type,
            media_path: req.body.media_path,
        })

        res.status(200).json({etape});
    } catch (error) {
        res.status(400).json({ error });
    }
});

router.get("/attraction/all", async (req, res) => {
    try {
    // Récupérer les médias avec background = 1 à partir de la table AttractionMedia
        const mediaWithBackgroundOne = await Attraction_media.find({ background: 1, media_type: 'image' }).populate('Attraction','-__v').select('-__v') 
        .exec();

        res.status(200).json(mediaWithBackgroundOne);
    } catch (error) {
        res.status(400).json({ error });
    }
});

router.get('/attraction/detail/:id', async (req, res) => {
    try {
      const attractionId = req.params.id;

      const attractionObjectId = new ObjectId(attractionId);

      const attraction = await Attraction.findOne({ _id: attractionObjectId });

        if (!attraction) {
          console.log('Attraction non trouvée');
          return null;
        }

      const etapes = await Etape.aggregate([
        {
          $match: { Attraction: attractionObjectId }
        },
        {
          $lookup: {
            from: 'attraction_medias',
            localField: '_id',
            foreignField: 'Etape',
            as: 'media'
          }
        }
      ]);

      if(etapes.length > 0){
        attraction.etapes = etapes;
        return res.status(200).json(attraction.etapes);
      }else{
        message = "Il n\'y a pas encore de détail pour cette site";
          return res.status(200).json(message);
      }
  
      
    } catch (error) {
      console.error('Error while fetching attraction with etapes and medias:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post("/attraction/update/etape/like", async (req, res) => {
    try {
      const etapeId = req.body.etapeId;
      const likesCount = req.body.likecount;
      const etape = await Etape.findByIdAndUpdate(etapeId,  { $set:{like_count: likesCount} });
      if(etape){
        res.status(200).json("Update etape success");
      }else{
        res.status(200).json("Update etape error");
      }
    } catch (error) {
        res.status(400).json({ error });
    }
});
    
  

module.exports = router;