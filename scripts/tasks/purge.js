const gulp = require('gulp');
const purgecss = require('gulp-purgecss');
const path = require('path');
const { getPublicPath, getSrcPaths, getCraftPath } = require('../utils/paths');
const argList = require('../utils/argv');
const { backstop: task } = argList(process.argv);

// class TailwindExtractor {
// 	static extract(content) {
// 		return content.match(/[\w-/.:]+(?<!:)/g) || []
// 	}
// }

const purge = done => {
	if (task === 'reference') {
		done();
		return;
	}

	const build = getPublicPath('dist');
	const twig = getCraftPath('templates/**/**/**/*.twig');
	const html = getCraftPath('templates/**/**/**/*.html');
	const js = getSrcPaths('js/**/**/*.js');
	const {
		TASK: { purge: options },
	} = global;

	return gulp
		.src(path.resolve(build, 'css/*.css'))
		.pipe(
			purgecss({
				content: [twig, html, js],
				defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || [],
				...options,
			})
		)
		.pipe(gulp.dest(`${build}/css`));
};

module.exports = purge;
