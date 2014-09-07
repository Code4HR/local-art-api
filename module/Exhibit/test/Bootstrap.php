<?php
    namespace ExhibitTest;

    use Zend\Loader\AutoloaderFactory;
    use Zend\Mvc\Service\ServiceManagerConfig;
    use Zend\ServiceManager\ServiceManager;
    use RuntimeException;

    error_reporting(E_ALL | E_STRICT);
    chdir(__DIR__); # wut

    /**
     * The test bootstrap model.
     */
    class Bootstrap {
	/**
	 * @var ServiceManager $serviceManager The service manager value.
	 */
	protected static $serviceManager;

	/**
	 * Computation, initialises the bootstrap.
	 */
	public static function init() {
	    $localartapiModulePaths = [dirname(dirname(__DIR__))];
	    if (($path = static::findParentPath('vendor'))) {
		$localartapiModulePaths[] = $path;
	    }

	    if (($path = static::findParentPath('module') !== $localartapiModulePaths[0])) {
		$localartapiModulePaths[] = $path;
	    }

	    static::initAutoLoader();

	    // use ModuleManager to load this module and its dependencies
	    $config = [
		    'module_listener_options' => [
			    'module_paths' => $localartapiModulePaths
			]
		    , 'modules' => [
			    'Exhibit'
			]
		];

	    $serviceManager = new ServiceManager(new ServiceManagerConfig());
	    $serviceManager->setService('ApplicationConfig', $config);
	    $serviceManager->get('ModuleManager')->loadModules();
	    static::$serviceManager = $serviceManager;
	}

	/**
	 * Computation, changes context to the root directory.
	 */
	public static function chroot() {
	    $rootName = dirname(static::findParentPath('module'));
	    chdir($rootName);
	}

	/**
	 * Returns the service manager.
	 *
	 * @return ServiceManager The service manager.
	 */
	public static function getServiceManager() {
	    return static::$serviceManager;
	}

	/**
	 * Computation, initialises the autoloader.
	 */
	public static function initAutoloader() {
	    $vendorPath = static::findParentPath('vendor');
	    $zf2Path = getenv('ZF2_PATH');
	    if (!$zf2Path) {
		if (defined('ZF2_PATH')) {
		    $zf2Path = ZF2_PATH;
		} else if (is_dir($vendorPath . '/ZF2/library')) {
		    $zf2Path = $vendorPath . '/ZF2/library';
		} else if (is_dir($vendorPath . '/zendframework/zendframework/library')) {
		    $zf2Path = $vendorPath . '/zendframework/zendframework/library';
		}
	    }

	    if (!$zf2Path) {
		throw new RuntimeException('Unable to load ZF2.  Run `composer install` or '
		    . ' define a ZF2_PATH environment variable.');
	    }

	    if (file_exists($vendorPath . '/autoload.php')) {
		include $vendorPath . '/autoload.php';
	    }

	    include $zf2Path . '/Zend/Loader/AutoloaderFactory.php';
	    AutoloaderFactory::factory([
		    'Zend\Loader\StandardAutoloader' => [
			      'autoregister_zf' => true
			    , 'namespaces' => [
				    __NAMESPACE__ => __DIR__ . '/' . __NAMESPACE__
				]
			]
		]);
	}

	/**
	 * Returns the parent path of the directory specified.
	 *
	 * @param string $path The path to find.
	 *
	 * @return string|boolean The parent of the path specified.
	 */
	public static function findParentPath($path) {
	    $dir = __DIR__;
	    $previousDir = '.';
	    while (!is_dir($dir . '/' . $path)) {
		$dir = dirname($dir);
		if ($previousDir === $path) {
		    return false;
		}
	    }
	    return $dir . '/' . $path;
	}
    }
    Bootstrap::init();
    Bootstrap::chroot();
?>
