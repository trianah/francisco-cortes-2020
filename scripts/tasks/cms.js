const gulp = require('gulp');
const browserSync = require('browser-sync');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const htmlreplace = require('gulp-html-replace');
const middleware = require('../webpack/middleware');
const devConfig = require('../webpack/config.dev');

const {
	PATHS: {
		cacheTag: { file, dir },
	},
} = global;

const clearCacheTags = () => {
	return gulp
		.src(path.resolve(process.env.PWD, dir, file))
		.pipe(
			htmlreplace(
				{
					cms: {
						src: '',
						tpl: '{% set stamp = "%s" %}',
					},
				},
				{
					keepBlockTags: true,
				}
			)
		)
		.pipe(gulp.dest(path.resolve(process.env.PWD, dir)));
};

const cacheTags = () => {
	return gulp
		.src(path.resolve(process.env.PWD, dir, file))
		.pipe(
			htmlreplace(
				{
					cms: {
						src: PRODUCTION ? `.${global.TASK.stamp}` : '',
						tpl: '{% set stamp = "%s" %}',
					},
				},
				{
					keepBlockTags: true,
				}
			)
		)
		.pipe(gulp.dest(path.resolve(process.env.PWD, dir)));
};

const serverProxy = done => {
	const compiler = webpack(merge(global.WEBPACK_CONFIG, devConfig));

	const {
		PATHS: { proxy },
		TASK: { server },
	} = global;

	browserSync.init({
		...middleware(compiler),
		proxy,
		...server,
	});

	done();
};

module.exports = {
	serverProxy,
	clearCacheTags,
	cacheTags,
};
