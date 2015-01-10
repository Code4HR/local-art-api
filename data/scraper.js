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
