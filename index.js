const express = require("express");
require('dotenv').config();
const connection = require('./db/connection');
const RoutesUtilisateur = require('./controllers/utilisateur_controllers');
const RoutesAttraction = require('./controllers/attraction_controllers');
const RoutesNotification = require('./controllers/notification_controllers');


const cors = require('cors');
var corsOptions = {
    origin: "*"
};
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 4000;
var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);
app.use(cors());
app.use(cors({origin: "*"})); 
app.use(bodyParser.json({limit: '50mb'})); 
app.use(bodyParser.urlencoded({
    limit: '50mb',    
    extended: true
}));
app.use(RoutesUtilisateur);
app.use(RoutesAttraction);
app.use(RoutesNotification);

app.listen(port, () => 

  console.log(`Le serveur écoute sur https://doubtful-tick-cowboy-boots.cyclic.app/`)
);

// http://${process.env.SERVERIPHOME}:4000/
