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

var Exhibit = mongoose.model('Exhibit', {
    "id": { type: Number, unique: true },
    "title": String,
    "longitude": Number,
    "latitude": Number,
    "location": String,
    "artists": String,
    "url": String,
    "imageurl": String,
    "fullimage": String
});
