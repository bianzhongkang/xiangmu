
//引入gulp
let gulp = require("gulp");
//引入gulp-connect
let connect = require("gulp-connect");

//合并插件
let concat = require("gulp-concat");
//压缩插件
let uglify = require("gulp-uglify");
//重命名插件
let rename = require("gulp-rename");
//es6转es5
let babel = require("gulp-babel");

let sass = require("gulp-sass");

gulp.task("buildCSS",()=>{
	gulp.src("./src/styles/*.scss")	//将css变成scss，因为再styles的文件下已经没有css文件
	.pipe(sass())
	.pipe(gulp.dest("./dist/styles"));
});
gulp.task("index",function(){
	gulp.src("src/**/*.*").pipe(gulp.dest("dist")).pipe(connect.reload())
})
gulp.task("watch",function(){
	// gulp.watch(["src/**/*.*"],["index"]) ;
	// gulp.watch(["./src/styles/*.scss"], ["buildCSS"]) ;
	gulp.watch(["./src/**/*.*"],["index"])
})

gulp.task("server",function(){
	connect.server({
		root:"dist",
		port:9000,
		livereload:true
	})
})

gulp.task("bzk",["watch","server"])

