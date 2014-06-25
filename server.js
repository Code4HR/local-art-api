var fs = require('fs');
var xml2js = require('xml2js');
var request = require('request');
var express = require('express');
var _ = require('lodash');
var cors = require('cors');
var app = express();

var parser = new xml2js.Parser();
var mongoose = require('mongoose');
app.use(cors());


//var Art = require('./model/exhibit.js');
var Exhibit = require('./data/exhibits.json');

app.get('/', function(req, res){
  res.redirect(301, '/exhibits');
 });

//exhibits
/* Query Strings to search for ...
    id: DS.attr('number'),
    title: DS.attr('string'),
    location: DS.attr('string'),
    artists: DS.attr('string'),
    latitude: DS.attr('number'),
    longitude: DS.attr('number'),
*/
app.get('/exhibits', cors(), function(req, res){
  res.set('Content-Type', 'application/json');
  res.send(200,Exhibit);
});

app.get('/exhibits/:id', cors(), function(req, res){
  //parm id
  var id = req.params.id;
  res.set('Content-Type', 'application/json');
  res.send(200,Exhibit[id]);

});

var port = Number(process.env.PORT || 5555);
console.log("Listening on Port " + port);
app.listen(port);
