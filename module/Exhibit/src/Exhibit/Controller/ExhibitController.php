<?php
namespace Exhibit\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

/**
 * The exhibit controller model.
 */
class ExhibitController
    extends AbstractActionController {
    /**
     * @var ExhibitTable $exhibitTable Represents the exhibit table.
     */
    protected $exhibitTable;

    /**
     * Returns the view model for the index route.
     *
     * @return ViewModel A view model of the exhibits.
     */
    public function indexAction() {
	return new ViewModel(array(
		'exhibits' => $this->getExhibitTable()->fetchAll()
	    ));
    }

    /**
     * Handler, handles the add action.
     */
    public function addAction() {
    }

    /**
     * Handler, handles the edit action.
     */
    public function editAction() {
    }

    /**
     * Handler, handles the delete action.
     */
    public function deleteAction() {
    }

    /**
     * Returns the exhibit table.
     *
     * @return ExhibitTable The exhibit table.
     */
    public function getExhibitTable() {
	if (!$this->exhibitTable) {
	    $sm = $this->getServiceLocator();
	    $this->exhibitTable = $sm->get('Exhibit\Model\ExhibitTable');
	}
	return $this->exhibitTable;
    }
}
?>
