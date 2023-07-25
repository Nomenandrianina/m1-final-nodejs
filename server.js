const express = require("express");
require('dotenv').config();
const connection = require('./db/connection');
const RoutesUtilisateur = require('./controllers/utilisateur_controllers');

const serverIP = '192.168.1.108'; 

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

console.log(port);
app.listen(port, () => 
  console.log(`Le serveur écoute sur http://${serverIP}:4000/`)
);