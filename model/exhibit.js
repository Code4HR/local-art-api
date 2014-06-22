var fs = require('fs');
var xml2js = require('xml2js');
var request = require('request');
var express = require('express');
var _ = require('lodash');
var cors = require('cors');
var app = express();

var parser = new xml2js.Parser();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/art');
// var Cat = mongoose.model('Cat',{
//    name: String
// });
//
// var kitty = new Cat({ name: 'Zildjian' });
//
// kitty.save(function (err) {
//   if (err) // ...
//   console.log('cool');
// });


var Art = mongoose.model('Art',{
  title: String,
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
              console.log('cool');
        });
       });
      });
    }
    else {
      //
    }
});})();
