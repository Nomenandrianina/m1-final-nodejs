const express = require("express");
require('dotenv').config();
const connection = require('./db/connection');

const cors = require('cors');
var corsOptions = {
    origin: "*"
};
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 8000;
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
app.use(cors({origin: "*"})); 
app.use(bodyParser.json({limit: '50mb'})); 
app.use(bodyParser.urlencoded({
    limit: '50mb',    
    extended: true
}));

app.listen(port, () => console.log('Server app listening on port ' + port));