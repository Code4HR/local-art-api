<?php
    namespace ExhibitTest\Controller;

    use Zend\Test\PHPUnit\Controller\AbstractHttpControllerTestCase;

    class ExhibitControllerTest
	extends AbstractHttpControllerTestCase {
	/**
	 * Computation, sets up common precondition state before each test.
	 */
	public function setUp() {
	    $this->setApplicationConfig(
		include '/usr/share/nginx/html/local-art-api/config/application.config.php');
	    parent::setUp();
	}

	/**
	 * Unit formula, proves users may access the index route of the exhibits resource.
	 */
	public function testMayAccessIndexRoute() {
	    $this->dispatch('/exhibits');
	    $this->assertResponseStatusCode(200);
	    $this->assertModuleName('Exhibit');
	    $this->assertControllerName('Exhibit\Controller\Exhibit');
	    $this->assertControllerClass('ExhibitController');
	    $this->assertMatchedRouteName('exhibit');
	}
    }
?>

