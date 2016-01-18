'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
var port = 3000;

//import models
require('./app/models/sepatu');

//views
app.use(express.static('public/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

//routes
var sepatu_routes = require('./app/controllers/sepatu');
app.use('/sepatu',sepatu_routes);


app.get('/', function (req, res) {
	res.redirect('/sepatu');
});

//main loop
connect()
.on('error', console.log)
.on('disconnected',connect)
.once('open',listen);

function listen(){
	app.listen(port);
	console.log('express app started on port' + port);
}

function connect (){
	var options = {server: {socketOptions: {keepAlive: 1}}};
	return mongoose.connect('mongodb://localhost/cloud', options).connection;
}

