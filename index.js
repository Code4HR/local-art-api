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

var Hapi = require('hapi');
var queryOverpass = require('query-overpass');
var _ = require('underscore');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || 'localhost';

// Create server with host and port;
var server = new Hapi.Server();
server.connection({
    host: server_ip_address,
    port: server_port,
});

// Add the route
server.route({
    method: 'GET',
    path: '/exhibits/{id?}',
    config: {
        cors: true
    },      
    handler: function(request, reply) {
        var bbox, longitude, latitude, numberOfResults, zoomLevel, query;
        
        // Given a bounding box, return some results.
        if (request.url.query.bbox) {
            bbox = request.url.query.bbox;
            query = '[out:json];node(' + bbox + ')[tourism=artwork];out;'
        } else {
            // If no bounding box is provided, assume Norfolk.
            // tk do some response limiting here with query string in app
            // or by getting long/lat from request source IP.
            bbox = '36.75,-76.44,36.98,-76.13';
            query = '[out:json];node(' + bbox + ')[tourism=artwork];out;';
        }

        // Alternatively, use latitude and longitude.
        if (request.url.query.longitude &&
                request.url.query.latitude &&
                request.url.query.zoomLevel) {
            longitude = request.url.query.longitude;
            latitude = request.url.query.latitude;
            zoomLevel = request.url.query.zoomLevel;

            // tk mathemagic happens here.
        }

        queryOverpass(query, function(error, data) {
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
                tags = properties.tags
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
                    description: tags.note
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

// Server start
server.start();
