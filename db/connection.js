const mongoose=require('mongoose');
const ConnectionString = 'mongodb+srv://antonio:rQR8nNThtTJBm41Z@toni0.jb53acl.mongodb.net/FinalM1Android';
mongoose.set('strictQuery', true);
mongoose.set('setDefaultsOnInsert', true);
mongoose.connect(ConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', function (err) { throw err }); 
db.once('open', function callback() {
   console.log('connected to mongodb database!');
});

module.exports = db;