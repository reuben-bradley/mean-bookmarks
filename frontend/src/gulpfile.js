/* 
 * Gulp configuration and task file.
 * 
 * @author Reuben Bradley
 */

'use strict';

var config = {
    outputDir: '/build/',
    sourcePaths: {
        styles: ['./css/**/*.scss'],
        scripts: ['./js/**/*.js'],
        templates: ['./html/**/*.html']
    },
    styles: {
        bundles: [
            { entry: './css/main.scss', outputFilename: 'main' }
        ],
        autoprefixerSettings: {
            browsers: ['last 2 versions'],
            cascade: false
        }
    },
    scripts: {
        webpackSettings: {
            watch: false,
            entry: {
                main: './js/main.js'
            },
            output: {
                filename: '[name].js'
            },
            loaders: [
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader'
                }
            ]
        }
    },
    templates: {
    }
};
var gulp = require('gulp');
var prefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var chalk = require('chalk');
var webpack = require('webpack-stream');
var tsLoader = require('awesome-typescript-loader');

var logSuccess = function ( text ) {
    console.log(chalk.bgGreen.white('Task Runner: ' + text));
};
var logFailure = function ( text ) {
    console.log(chalk.bgRed.white('Task Runner: ' + text));
};

// Individual tasks for image compression, styles, and scripts for easier
//  customisation
gulp.task('styles', function ( taskComplete ) {
    var task, currentBundle;
    var promises = [];
    var bundles = config.styles.bundles;
    
    logSuccess('Starting \'styles\' task.');
    for ( var index = 0, ln = bundles.length; index < ln; index++ ) {
        task = new Promise(function ( resolve, reject ) {
            logSuccess('Starting bundle: ' + bundles[index].entry);
            currentBundle = bundles[index];
            var stream = gulp.src(bundles[index].entry)
                    .pipe(sass().on('error', sass.logError))
                    .pipe(prefixer(config.styles.autoprefixerSettings))
                    .pipe(rename(function (path) {
                        path.basename = currentBundle.outputFilename;
                    }))
                    .pipe(gulp.dest(config.outputDir + 'css/'));

            stream.on('error', function () {
                logFailure('Stylesheet failed.');
                reject();
            })
            .on('end', function () {
                logSuccess('Stylesheet completed - ' + 
                    currentBundle.entry + ' => ' + config.outputDir + 
                    currentBundle.outputFilename + '.css');
                resolve();
            });
        });
        
        promises.push(task);
    }
    
    if ( promises.length ) {
        Promise.all(promises).then(function () {
            taskComplete();
        }, function () {
            taskComplete('An error occurred.');
        });
    }
    else {
        taskComplete('No style bundles given.');
    }
});

gulp.task('scripts', function ( taskComplete ) {
    var stream = gulp.src([])
            .pipe(webpack(config.scripts.webpackSettings))
            .pipe(gulp.dest(config.outputDir + 'js/'));

    stream.on('error', function () {
        logFailure('Scripts failed.');
        taskComplete('Scripts failed.');
    })
    .on('end', function () {
        logSuccess('Scripts completed successfully.');
        taskComplete();
    });
});

gulp.task('templates', function ( taskComplete ) {
    var stream = gulp.src(config.sourcePaths.templates)
            .pipe(gulp.dest(config.outputDir + 'html/'));

    stream.on('error', function () {
        logFailure('Templates failed.');
        taskComplete('Templates failed.');
    })
    .on('end', function () {
        logSuccess('Templates completed successfully.');
        taskComplete();
    });
});


// Build and watch tasks for production and development
gulp.task('build', [
    'styles',
    'scripts',
    'templates'
]);

gulp.task('watch', ['build'], function () {
    gulp.watch(config.sourcePaths.styles, ['styles']);
    gulp.watch(config.sourcePaths.scripts, ['scripts']);
    gulp.watch(config.sourcePaths.templates, ['templates']);
});
