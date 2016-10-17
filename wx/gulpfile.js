var gulp = require("gulp");

var concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),            //压缩成一行
    rename = require("gulp-rename"),
    htmlmin = require('gulp-htmlmin'),          //html压缩
    imagemin = require('gulp-imagemin'),        //图片压缩
    pngquant = require('imagemin-pngquant'),    //图片深度压缩
    rev = require('gulp-rev'),                  //MD5加在后面
    revCollector = require('gulp-rev-collector'),
    minifycss = require('gulp-clean-css');     //css压缩

// 压缩页面
gulp.task('html', function () {
    gulp.src(['*.html', './js/modules/**/*.html'])
        .pipe(htmlmin({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true//压缩HTML
        }))
        .pipe(gulp.dest('./dist/html'))
});

// 压缩图片
gulp.task('img', function () {
    gulp.src(['img/*'])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp.dest('./dist/img'));
});

// 合并、压缩、重命名css
gulp.task('css', function () {
    return gulp.src(['css/index.css'])
        .pipe(gulp.dest('./dist/css'))
        .pipe(minifycss())
        .pipe(rev())    //- 文件名加MD5后缀
        .pipe(gulp.dest('./dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/css'));
});

// 合并、压缩js文件
gulp.task("js", function () {
    gulp.src(['./js/*.js', './js/**/*.js'])
        .pipe(gulp.dest('./dist/js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/js'));
});
gulp.task('rev', function () {
    gulp.src(['./rev/**/*.json', '*.html'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                'css': 'css',
                'js': 'js'
            }
        }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))
});

gulp.task('default', ['html', 'img', 'css', 'js', 'rev']);
