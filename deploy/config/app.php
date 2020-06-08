<?php
/**
 * Yii Application Config
 *
 * Edit this file at your own risk!
 *
 * The array returned by this file will get merged with
 * vendor/craftcms/cms/src/config/app/main.php and [web|console].php, when
 * Craft's bootstrap script is defining the configuration for the entire
 * application.
 *
 * You can define custom modules and system components, and even override the
 * built-in system components.
 */

return [
	'modules' => [
			'mud-module' => [
					'class' => \modules\mudmodule\MudModule::class,
					'components' => [
							'MudModuleService' => [
									'class' => 'modules\mudmodule\services\MudModuleService',
							],
					],
			],
	],
	'bootstrap' => ['mud-module'],
	// 'components' => [
	// 	'deprecator' => [
	// 		'throwExceptions' => YII_DEBUG,
	// 	],
	// 	'redis' => [
	// 		'class' => yii\redis\Connection::class,
	// 		'hostname' => getenv('REDIS_HOSTNAME'),
	// 		'port' => getenv('REDIS_PORT'),
	// 		'database' => getenv('REDIS_DEFAULT_DB'),
	// 	],
	// 	'cache' => [
	// 		'class' => yii\redis\Cache::class,
	// 		'redis' => [
	// 				'database' => getenv('REDIS_CRAFT_DB'),
	// 		],
	// 	],
	// 	'session' => [
	// 		'class' => \yii\redis\Session::class,
	// 		'as session' => [
	// 				'class' => \craft\behaviors\SessionBehavior::class,
	// 		],
	// 	],
	// ],
];
