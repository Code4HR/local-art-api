<?php
namespace Exhibit\Model;

use Zend\Db\TableGateway\TableGateway;

/**
 * The exhibit table model.
 */
class ExhibitTable {
    /**
     * @var TableGateway $tableGateway Represents the table gateway.
     */
    protected $tableGateway;

    /**
     * Value constructor.
     *
     * @param TableGateway $tableGateway The gateway to use for this table.
     *
     * @return A new exhibit table value.
     */
    public function __construct($tableGateway) {
	$this->tableGateway = $tableGateway;
    }

    /**
     * Returns all exhibits.
     *
     * @return ResultSet All the exhibits.
     */
    public function fetchAll() {
	$resultSet = $this->tableGateway->select();
	return $resultSet;
    }

    /**
     * Returns a single exhibit.
     *
     * @param integer $id The exhibit id.
     *
     * @return Exhibit The exhibit with the specified id.
     */
    public function getExhibit($id) {
	$id = (int) $id;
	$rowset = $this->tableGateway->select(array('id' => $id));
	$row = $rowset->current();
	if (!$row) {
	    throw new \Exception("Could not find row $id");
	}
	return $row;
    }

    /**
     * Computation, persists the exhibit in the central store.
     *
     * @param Exhibit $exhibit The exhibit to persist.
     */
    public function saveExhibit($exhibit) {
	$data = array(
		  'title' => $exhibit->title
		, 'longitude' => $exhibit->longitude
		, 'latitude' => $exhibit->latitude
		, 'location' => $exhibit->location
		, 'artists' => $exhibit->artists
		, 'url' => $exhibit->url
		, 'imageurl' => $exhibit->imageurl
		, 'fullimage' => $exhibit->fullimage
		, 'description' => $exhibit->description
	    );
	$id = (int) $exhibit->id;
	if ($id == 0) {
	    $this->tableGateway->insert($data);
	} else {
	    if ($this->getExhibit($id)) {
		$this->tableGateway->update($data, array('id' => $id));
	    } else {
		throw new \Exception('Exhibit id does not exist.');
	    }
	}
    }

    /**
     * Computation, removes the exhibit from the central store.
     *
     * @param integer $id The id of the exhibit to remove.
     */
    public function deleteExhibit($id) {
	$this->tableGateway->delete(array('id' => (int) $id));
    }
}
?>
