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

namespace Exhibit;

use Exhibit\Model\Exhibit;
use Exhibit\Model\ExhibitTable;
use Zend\ModuleManager\Feature\AutoloaderProviderInterface;
use Zend\ModuleManager\Feature\ConfigProviderInterface;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;

/**
 * The exhibit module.
 */
class Module    
    implements AutoloaderProviderInterface, ConfigProviderInterface {
    /**
     * Returns autoloader information.
     *
     * @return array[]
     */
    public function getAutoloaderConfig() { }

    /**
     * Returns either the configuration string or a failure value.
     *
     * @return string|integer|boolean
     */
    public function getConfig() {
	return include __DIR__ . '/config/module.config.php';
    }

    /**
     * Returns the service configuration strings.
     *
     * @return callback[]
     */
    public function getServiceConfig() {
	return array(
		'factories' => array(
			'Exhibit\Model\ExhibitTable' => function ($sm) {
			    $tableGateway = $sm->get('ExhibitTableGateway');
			    $table = new ExhibitTable($tableGateway);
			    return $table;
			},
			'ExhibitTableGateway' => function ($sm) {
			    $dbAdapter = 
				$sm->get('Zend\Db\Adapter\Adapter');
			    $resultSetPrototype = new ResultSet();
			    $resultSetPrototype->setArrayObjectPrototype(
				new Exhibit());
			    return new TableGateway('Exhibit', $dbAdapter
				, null, $resultSetPrototype);
			}
		    )
	    );
    }
}
?>
