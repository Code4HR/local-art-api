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


var Art = require('./model/exhibit.js');


app.get('/', function(req, res){
  res.redirect(301, '/exhibit');
 });

app.get('/pretty', function(req, res){
  request('http://www.norfolkva.gov/cultural_affairs/public_art_downtown.xml',
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        parser.parseString(body, function (err, result) {
        var converted = JSON.stringify(result, undefined, 2);
        //print pretty
        console.log(converted);
        res.set('Content-Type', 'application/json');
        res.send( "<pre>" + converted + "</pre>");
        });
      }
      else {
        res.send(404,"Not found");
      }
    });
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
app.get('/exhibit', function(req, res){
  request('http://www.norfolkva.gov/cultural_affairs/public_art_downtown.xml',
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var obj = [];
        parser.parseString(body, function (err, result) {
        _.each(result.parks.parkz, function (data) {
          obj.push(data.$);
        });
          res.set('Content-Type', 'application/json');
          res.send(obj);
        });
      }
      else {
        res.send(404,"Not found");
      }
    });
});

app.get('/exhibit/:id', function(req, res){
  //parm id
  var id = req.params.id;
  request('http://www.norfolkva.gov/cultural_affairs/public_art_downtown.xml',
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
          var obj;
          parser.parseString(body, function (err, result) {
          console.log(result.parks.parkz);
          obj = result.parks.parkz[id].$;
          res.set('Content-Type', 'application/json');
          res.send(obj);
        });
      }
      else {
        res.send(404,"Not found");
      }
    });
});

var port = Number(process.env.PORT || 3000);
console.log("Listening on Port " + port);
app.listen(port);
