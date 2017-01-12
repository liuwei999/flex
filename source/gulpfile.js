var gulp = require("gulp");
var sass = require("gulp-sass");
var wrap = require("gulp-wrap");
var mincss = require("gulp-minify-css");
var prefix = require("gulp-autoprefixer");

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
};

gulp.task("build",function(){
	gulp.src("pages/*.html")
	.pipe(wrap({src:"layout/default.html"}))
	.pipe(gulp.dest("../dist/"));
});

gulp.task("sass",function(){
	gulp.src("styles/main.scss")
		.pipe(sass()).on('error', handleError)
		.pipe(prefix())
		.pipe(mincss())
		.pipe(gulp.dest("../dist/styles/"))
});

gulp.task("watch",function(){
	gulp.watch(["**/*.html"],["build"]);
	gulp.watch(["styles/*.scss"],["sass"]);
});

gulp.task("default",["sass","build","watch"]);
