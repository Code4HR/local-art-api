var Hapi = require('hapi');
var queryOverpass = require('query-overpass');
var _ = require('underscore');

// Create server with host and port;
var server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: 8000
});

// Add the route
server.route({
	method: 'GET',
	path: '/exhibits',
	handler: function(request, reply) {

		var bbox, longitude, latitude, numberOfResults, zoomLevel, query;
		
		// Given a bounding box, return some results.
		if (request.url.query.bbox) {
			bbox = request.url.query.bbox;
			query = '[out:json];node(' + bbox + ')[tourism=artwork];out;'
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

				reply(formattedResponse);

			}
		);
	}
});

// Server start
server.start();