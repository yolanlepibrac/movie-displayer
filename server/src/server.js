/*
const path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.route('/favicon.ico')

*/


//Définition des modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
var http = require ('http');



const dbRoute = 'mongodb+srv://yolanpibrac:Lasvegasparano1%21@cluster0-7z1th.mongodb.net/test?retryWrites=true&w=majority';
const dbRouteLocal = 'mongodb://localhost/db';
//Connexion à la base de donnée
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(() => {
    console.log('Connected to mongoDB')
}).catch(e => {
    console.log('Error while DB connecting');
    console.log(e);
});




//On définit notre objet express nommé app


//Body Parser
var urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json({limit: '10mb', extended: true}));

//Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type,Accept,content-type,application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Définition du routeur

var router = express.Router();
app.use('/user', router);
require(__dirname + '/controllers/userController')(router);
//Essayer d'enlever le / devant controllers
// cest le router qui pose pb
// pb de connexion a mongodb
//trouver pouquoi mongodb marche plus (peut etre process.env.port -> le remttre dans le dossier au dessus

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//Définition et mise en place du port d'écoute
var port = process.env.PORT || "3000";
//var port = process.env.PORT || 80;
app.listen(port, () => console.log(`Listening on port ${port}`));
