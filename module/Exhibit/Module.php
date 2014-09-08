<?php
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
