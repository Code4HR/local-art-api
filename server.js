/*
   Copyright 2014 Code for Hampton Roads

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

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

// Enables CORS
var enableCORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(enableCORS);

var Exhibit = { 
    exhibit: JSON.parse(fs.readFileSync(__dirname + '/data/exhibits.geojson'))
        .features.map(
            function (feature, i, list) {
                var exhibit = feature.properties;
                exhibit.longitude = feature.geometry.coordinates[0];
                exhibit.latitude = feature.geometry.coordinates[1];
                return exhibit;
            })
    };

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
app.options('/exhibits', cors());
app.get('/exhibits', cors(), function(req, res){
  res.set('Content-Type', 'application/json');
  res.status(200).send(Exhibit);
});

app.options('/exhibits/:id', cors());
app.get('/exhibits/:id', cors(), function(req, res){
  //parm id
  var id = req.params.id,
      exhibit = Exhibit.exhibit[id - 1];
  if( typeof exhibit !== 'undefined'){
    res.set('Content-Type', 'application/json');
    res.status(200).send({exhibit: exhibit});
  } else {
    res.status(404).send("Not found");
  }
});

var port = Number(process.env.PORT || 5555);
console.log("Listening on Port " + port);
app.listen(port);
