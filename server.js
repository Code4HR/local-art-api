var fs = require('fs');
var xml2js = require('xml2js');
var request = require('request');
var express = require('express');
var app = express();

var parser = new xml2js.Parser();

app.get('/', function(req, res){
  request('http://www.norfolkva.gov/cultural_affairs/public_art_downtown.xml',
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //console.log(body); // Print the google web page.
        parser.parseString(body, function (err, result) {
        console.log('Done');
        var converted = JSON.stringify(result, undefined, 2);
        console.log(converted);
        });
      }
    });
});




app.listen(3000);
