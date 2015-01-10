/*
    Proxy Norfolk Cultural Art Feed 
    Copyright (C) 2014-2015 Code for Hampton Roads

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var fs = require('fs');
var xml2js = require('xml2js');
var request = require('request');
var express = require('express');
var _ = require('lodash');
var cors = require('cors');
var app = express();
var query_overpass = require('query-overpass');

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

app.options('/osm', cors());
app.get('/osm', cors(), function (req, res) {
    query_overpass(
        '[out:json];node(36.75,-76.44,36.98,-76.13)[tourism=artwork];out;'
        , function (error, data) {
            res.set('Content-Type', 'application/json');
            res.send({
                exhibit: data.features.map(
                    function (feature, i, list) {
                        return {
                              id: feature.properties.id
                            , title: feature.properties.tags.name
                            , longitude: feature.geometry.coordinates[0]
                            , latitude: feature.geometry.coordinates[1]
                            , location: feature.properties.tags.name // no current location
                            , artists: feature.properties.tags.artist_name
                            , url: feature.properties.tags.source
                            , imageurl: feature.properties.tags.website_1
                            , fullimage: feature.properties.tags.website
                            , description: feature.properties.tags.note + (feature.properties.tags.hasOwnProperty('note_1') ? feature.properties.tags.note_1 : '')
                        };
                    })
            });
        });
});

var port = Number(process.env.PORT || 5555);
console.log("Listening on Port " + port);
app.listen(port);
