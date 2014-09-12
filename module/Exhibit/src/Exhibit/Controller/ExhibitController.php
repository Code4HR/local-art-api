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
