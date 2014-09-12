<?php
/*
    Proxy Norfolk Cultural Art Feed
    Copyright (C) 2014 Code for Hampton Roads contributors

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

namespace Exhibit\Model;

/**
 * The exhibit model.
 */
class Exhibit {
    /**
     * @var integer Represents the exhibit id.
     */
    public $id;

    /**
     * @var string Represents the exhibit title.
     */
    public $title;

    /**
     * @var float Represents the longitude a citizen may find the exhibit 
     *	    at.
     */
    public $longitude;

    /**
     * @var float Represents the latitude a citizen may find the exhibit at.
     */
    public $latitude;

    /**
     * @var string Represents a familiar location name to find the exhibit
     *	    at.
     */
    public $location;

    /**
     * @var string Represents the artists who created the public art
     *	    exhibit.
     */
    public $artists;

    /**
     * @var string Represents the URL for the City of Norfolk webpage for
     *	    the exhibit.
     */
    public $url;

    /**
     * @var string Represents the URL for the City of Norfolk thumbnail for
     *	    the exhibit.
     */
    public $imageurl;

    /**
     * @var string Represents the URL for the full-sized City of Norfolk
     *	    image for the exhibit.
     */
    public $fullimage;

    /**
     * @var string Represents a description for the exhibit.
     */
    public $description;

    /**
     * Computation, mutates this record with elements from the specified
     * tuple.
     *
     * @param object $data The tuple to pull element values from.
     */
    public function exchangeArray($data) {
	$this->id = (!empty($data['id'])) ? 
	    $data['id'] :
	    null;
	$this->title = (!empty($data['title'])) ? 
	    $data['title'] : 
	    null;
	$this->longitude = (!empty($data['longitude'])) ? 
	    $data['longitude'] : 
	    null;
	$this->latitude = (!empty($data['latitude'])) ? 
	    $data['latitude'] : 
	    null;
	$this->location = (!empty($data['location'])) ? 
	    $data['location'] : 
	    null;
	$this->artists = (!empty($data['artists'])) ? 
	    $data['artists'] : 
	    null;
	$this->url = (!empty($data['url'])) ? 
	    $data['url'] : 
	    null;
	$this->imageurl = (!empty($data['imageurl'])) ? 
	    $data['imageurl'] : 
	    null;
	$this->fullimage = (!empty($data['fullimage'])) ? 
	    $data['fullimage'] : 
	    null;
	$this->description = (!empty($data['description'])) ? 
	    $data['description'] : 
	    null;
    }
}
?>
