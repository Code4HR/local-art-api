<?php
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
