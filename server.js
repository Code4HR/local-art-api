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
  var id = req.params.id,
      exhibit = Exhibit.exhibit[id - 1];
  if( typeof exhibit !== 'undefined'){
    res.set('Content-Type', 'application/json');
    res.send(200, {exhibit: exhibit});
  }
  else{
    res.send(404,"Not found");
  }

});

var port = Number(process.env.PORT || 5555);
console.log("Listening on Port " + port);
app.listen(port);
