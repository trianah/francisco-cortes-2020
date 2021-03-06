const gulp = require('gulp');
const clean = require('./clean');
const assets = require('./assets');
const scss = require('./scss');
const bundle = require('./javascript');
const purge = require('./purge');
const watch = require('./watch');
const { clearCacheTags, cacheTags, serverProxy } = require('./cms');
const { sizeReport } = require('../utils/logger');
const criticalCSS = require('./critical');

const defaultTask = gulp.series(
	clean,
	clearCacheTags,
	assets,
	scss,
	watch,
	serverProxy
);

const build = gulp.series(
	clean,
	clearCacheTags,
	gulp.parallel(cacheTags, assets, bundle),
	scss
);

const production = gulp.series(
	clean,
	clearCacheTags,
	gulp.parallel(cacheTags, assets, bundle),
	scss,
	purge,
	criticalCSS,
	sizeReport
);

gulp.task('default', gulp.task('default', defaultTask));

gulp.task('build', build);

gulp.task('production', production);

gulp.task('server', require('./server'));

gulp.task('purge', require('./purge'));
