var gulp = require('gulp');
var spawn = require('child_process').spawn;
var mocha = require('gulp-mocha');
var browserSync = require('browser-sync').create('default');
var server;

gulp.task('serve', function (cb) {
    server = spawn('node', ['app.js']);

    server.stdout.on('data', (data) => {
       process.stdout.write(`stdout: ${data}`);
    }); 

    server.stderr.on('data', (data) => {
       process.stderr.write(`stderr: ${data}`);
    }); 


    browserSync.init({
        proxy: "localhost:8080",
        startPath: '/index.html'
    });
    gulp.watch('./web/*.html', [ 'reload' ]);
    gulp.watch('./web/src/css/*.css', [ 'reload' ]);
    gulp.watch('./web/src/js/*.js', [ 'reload' ]);
})

gulp.task('reload', function(cb) {
    browserSync.reload();
    cb();
});

gulp.task('test', function(){
     return gulp.src(['quizServer/test/*.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec'
    }));
});

gulp.task('python-test', function(){
    process.chdir("quizServer")

    var py = spawn('nosetests');
    py.stdout.on('data', function(data){
        console.log('stdout: ' + data);
    });

    py.stderr.on('data', function(data){
        console.log('stderr: ' + data);
    });
});
