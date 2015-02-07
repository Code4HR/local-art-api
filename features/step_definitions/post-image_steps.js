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
var postImageSteps = function () { 
    this.World = require('../support/world.js').World;

    this.When(/^I send a post request with an image and an OpenStreetMap node number$/, function (callback) {
        callback.pending();
    });

    this.When(/^I send a get request for that node number$/, function (callback) {
        callback.pending();
    });

    this.Then(/^I should receive a picture$/, function (callback) {
        callback.pending();
    });
};

module.exports = postImageSteps;
