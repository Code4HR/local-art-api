/*
   Local Art API - Supports iArtNorfolk apps.
   Copyright (C) 2015 Code for Hampton Roads Volunteers (http://code4hr.org)

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU Affero General Public License as published
   by the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU Affero General Public License for more details.

   You should have received a copy of the GNU Affero General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

var Hapi = require('hapi');
var mongoose = require('mongoose');
var queryOverpass = require('query-overpass');
var _ = require('underscore');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
var database_address =  process.env.MONGO_ADDR || 'localhost:27017/localartapi';
var auth = process.env.MONGO_USER + ':' + process.env.MONGO_PASS;
var db;

if (process.env.MONGO_USER) {
    mongoose.connect('mongodb://' + auth + '@' + database_address);
} else {
    mongoose.connect(database_address);
}

db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(callback) {
    console.log('Database connected successfully.');
});

// Create server with host and port;
var server = new Hapi.Server();

server.connection({
    host: server_ip_address,
    port: server_port,
});

server.views({
  engines: {
    html: require('handlebars'),
  },
  path: __dirname + '/templates'
});

// Add the routes

// Reference Route
server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply.view('index');
  }
});

// Get specific exhibit
server.route({
  method: 'GET',
  path: '/templates/{path*}',
  handler: {
    directory: {
      path: './templates',
      listing: false,
      index: false
    }
  }
});

// Exhibits Route
server.route({
    method: 'GET',
    path: '/exhibits/{id?}',
    config: {
        cors: true
    },      
    handler: function(request, reply) {
        var bbox, longitude, latitude, numberOfResults, zoomLevel, query;
        
        // Alternatively, use latitude and longitude.
        if (request.url.query.longitude &&
                request.url.query.latitude &&
                request.url.query.zoomLevel) {
            longitude = request.url.query.longitude;
            latitude = request.url.query.latitude;
            zoomLevel = request.url.query.zoomLevel;
        }

        queryOverpass('[out:json];node(' + (
                request.url.query.bbox ? 
                    // Given a bounding box, return some results.
                    request.url.query.bbox : 

                    /*
                        If no bounding box is provided, assume Norfolk.
                        tk do some response limiting here with query string in
                        app or by getting long/lat from request source IP.
                    */
                    '36.75,-76.44,36.98,-76.13')
                + ')[tourism=artwork];out;', function(error, data) {
            var properties, tags, geometry;
            var formattedResponse = [];

            // SCHEMA

            // id => node:id
            // title => tag:name
            // longitude => node:lon
            // latitude => node:lat
            // location => ? // (may no longer have relevance)
            // artists => tag:artist_name
            // url => tag:source
            // imageurl => tag:website_1
            // fullimage => tag:website
            // description => tag:note, tag:note_1 // if more required.

            _.each(data.features, function(element, index) {
                properties = element.properties;
                tags = properties.tags;
                geometry = element.geometry;

                formattedResponse.push({
                    id: properties.id,
                    title: tags.name,
                    longitude: geometry.coordinates[0],
                    latitude: geometry.coordinates[1],
                    artists: tags.artist_name,
                    url: tags.source,
                    imageurl: tags.website_1,
                    fullimage: tags.website,
                    description: tags.note +
                        (function extendedDescription(tags) {
                            var i = arguments.length > 1 ? 
                                arguments[1] :
                                1;
                            return (function (element) {
                                return tags.hasOwnProperty(element) ? 
                                    tags[element] +
                                        extendedDescription(tags, i + 1) :
                                    '';
                            })('note_' + i.toString());
                        })(tags)
                });
            });
            reply({
                exhibit: request.params.id ? 
                    formattedResponse.filter(
                        function (exhibit, i, list) {
                            return exhibit.id === parseInt(request.params.id);
                        }) : 
                    formattedResponse
            });
        });
    }
});

// DB stuff
var Schema = mongoose.Schema;
var exhibitSchema = new Schema({
    node: String,
    thumbnail: String,
    image: String
});
var Exhibit = mongoose.model('Exhibit', exhibitSchema);

// New exhibits route
server.route({
    method: 'POST',
    path: '/post/exhibits',
    config: {
        cors: true
    },
    handler: function(request, reply) {
        var node, thumbnail, image;

        console.log(request.payload);        

        node = request.payload.node;
        thumbnail = request.payload.thumbnail;
        image = request.payload.image;

        var exhibit = new Exhibit({
            node: node,
            thumbnail: thumbnail,
            image: image
        });

        exhibit.save(function(err, exhibit) {
            if (err) {
                return console.error(err);
            } else {
                reply('Exhibit ' + exhibit.node + ' was saved to mongoDB.');
            }
        });
    }
});

// Images Route
server.route({
    method: 'GET',
    path: '/images/{id?}',
    config: {
        cors: true
    },
    handler: function(request, reply) {
        console.log(request.params);
        var requestedImage = request.params.id;

        Exhibit.find({node: requestedImage},function(err, exhibits) {
            if (err) {
                return console.error(err);
            } else {
                reply(exhibits);
            }
        }); 

    }

});

// Server start
server.start();
