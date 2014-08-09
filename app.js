var http = require('http');
var express = require('express');
var app = express();
app.locals.moment = require('moment');
require('./app/appConfig')(app);

require('./app/router')(app); //For MongoDB

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sharewall');
var db = mongoose.connection;
db.on('open', function () {
  console.log('MongoDB connection opened');
});
var Schema = mongoose.Schema;
var ScenarioNumberSchema = new Schema({
    number    : { type: String },
  	timestamp: { type: Date, default: Date.now }
});
var ScenarioIdSchema = new Schema({
    uuid    : { type: String },
    articleId    : { type: String },
  	timestamp: { type: Date, default: Date.now }
});

var ScenarioNumber = mongoose.model('ScenarioNumber', ScenarioNumberSchema);
var ScenarioId = mongoose.model('ScenarioId', ScenarioIdSchema);

var saveScenarioNumber = new ScenarioNumber({ number: "123123", timestamp: "1021584" });
var saveScenarioId = new ScenarioId({ uuid: "123123123", articleId: "234566,23456,555", timestamp: "1021584" });

saveScenarioNumber.save(function (err) {
  if (err) return console.error(err);
});

saveScenarioId.save(function (err) {
  if (err) return console.error(err);
});

http.createServer(app).listen(app.get('port'), function(){
}).on('error',function(error){
	console.log("Error On:" ,error);
});