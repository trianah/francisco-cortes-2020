const path = require('path');

module.exports = env => ({
	stamp: Date.now(),

	server: {
		open: false,
		browser: ['google chrome'],
		port: 3000,
		logLevel: 'info',
		watch: true,
		logFileChanges: true,

		watchOptions: {
			ignoreInitial: true,
			ignored: ['**/*.js', '**/*.scss', '!**/*.config.js', '**/*.json'],
		},
		files: [
			'./deploy/templates/**/**/**.twig',
			{
				options: {
					ignored: '**/*.hot-update.json',
				},
			},
		],
	},

	js: {
		publicPath: '/dist/js/',
		entries: {
			app:
				env !== 'production'
					? [
							'webpack/hot/dev-server',
							'webpack-hot-middleware/client',
							'core-js/modules/es.object.to-string',
							'core-js/modules/es.promise',
							'core-js/modules/es.array.iterator',
							'./app.js',
					  ]
					: ['./app.js'],
			// preview: ['./app.js']
		},
		extensions: ['js', 'json'],
		extractSharedJs: false,
		filename: 'bundle', // no extension
	},

	scss: {
		options: {
			includePaths: [
				path.resolve(process.env.PWD, 'node_modules/normalize-scss/sass'),
				path.resolve(process.env.PWD, 'node_modules/susy/sass'),
			],
		},

		postcss: {
			plugins: [
				require('postcss-write-svg')({
					encoding: 'base64',
				}),
				require('postcss-inline-svg')({
					path: path.resolve(process.env.PWD, 'static/img/'),
				}),
				require('postcss-animation')(),
				require('postcss-easing-gradients')(),
				require('rucksack-css')(),
				require('tailwindcss')('./src/scss/tailwind.js'),
				require('autoprefixer')(),
			],
		},
	},

	cssnanoOptions: {
		discardComments: {
			removeAll: false,
		},
	},

	critical: {
		minify: true,
		width: 1400,
		height: 1000,
	},

	purge: {
		whitelist: ['i', 'em', 'b', 'strong'],
		whitelistPatterns: [/is-/, /has-/, /no-/, /icon/, /lazy/, /c-/, /o-/, /g-/],
		whitelistPatternsChildren: [
			/nprogress/,
			/flickity/,
			/plyr/,
			/headroom/,
			/modal/,
		],
	},
});
