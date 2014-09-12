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

