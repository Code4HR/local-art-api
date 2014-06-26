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

var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/art';

mongoose.connect(uristring);

/*** NOTE 
This is based off the existing data model at the below locations.
We want this to reflect the actual model in the future
***/

var Art = mongoose.model('Art',{
  title: { type: String, unique: true},
  location: String,
  artist: String,
  loc: String,
  link: String,
  img: String,
  art: String,
  geo: {type: [Number], index: '2d'},
});

(function(){request('http://www.norfolkva.gov/cultural_affairs/public_art_downtown.xml',
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var obj = [];
      parser.parseString(body, function (err, result) {
        _.each(result.parks.parkz, function (data) {
            obj.push(data.$);
            console.log(data.$);
          var exhibit = new Art({
            id: data.$.id,
            title: data.$.title,
            location: data.$.location,
            artist: data.$.artist,
            link: data.$.link,
            img: data.$.img,
            art: data.$.art,
            geo: [data.$.lat,data.$.lng]
          });
          //console.log(exhibit);
          exhibit.save(function (err) {
            if (err) // ...
              console.log(err);
        });
       });
      });
    }
    else {
      //
    }
});})();


(function(){request('http://www.norfolkva.gov/cultural_affairs/public_art_botanical_garden.xml',
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var obj = [];
      parser.parseString(body, function (err, result) {
        _.each(result.parks.parkz, function (data) {
            obj.push(data.$);
            console.log(data.$);
          var exhibit = new Art({
            id: data.$.id,
            title: data.$.title,
            location: data.$.location,
            artist: data.$.artist,
            link: data.$.link,
            img: data.$.img,
            art: data.$.art,
            geo: [data.$.lat,data.$.lng]
          });
          //console.log(exhibit);
          exhibit.save(function (err) {
            if (err) // ...
              console.log(err);
        });
       });
      });
    }
    else {
      //
    }
});})();
