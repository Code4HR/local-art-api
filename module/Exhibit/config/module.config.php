<?php
return array(
	'controllers' => array(
		'invokables' => array(
			'Exhibit\Controller\Exhibit' => 'Exhibit\Controller\ExhibitController'
		    )
	    ),

	'router' => array(
		'routes' => array(
			'exhibit' => array(
				  'type' => 'segment'
				, 'options' => array(
					  'route' => '/exhibits[/:action][/:id]'
					, 'constraints' => array(
						  'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
						, 'id' => '[0-9]+'
					    )
					, 'defaults' => array(
						  'controller' => 'Exhibit\Controller\Exhibit'
						, 'action' => 'index'
					    )
				    )
			    )
		    )
	    ),

	'view_manager' => array(
		'template_path_stack' => array(
			'exhibit' => __DIR__ . '/../view'
		    )
	    )
    );
?>
