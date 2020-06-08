const webpack = require('webpack')
const path = require('path')
const { InjectManifest } = require('workbox-webpack-plugin')
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
	output: {
		filename: `[name].${global.TASK.js.filename}.${global.TASK.stamp}.js`
	},

	devtool: 'source-map',

	plugins: [
		// new LodashModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new InjectManifest({
			swDest: path.resolve(process.env.PWD, global.PATHS.public, 'sw.js'),
			swSrc: path.resolve(
				process.env.PWD,
				global.PATHS.src,
				global.PATHS.js.src,
				'service-worker.js'
			),
			include: [
				/\.html$/,
				/\.js$/,
				/\.css$/,
				/\.woff2$/,
				/\.jpg$/,
				/\.png$/
			],
			maximumFileSizeToCacheInBytes: 100 * 1024 * 1024
		})
	]
}
