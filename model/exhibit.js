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
