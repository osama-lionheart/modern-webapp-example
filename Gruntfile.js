module.exports = function(grunt) {
    'use strict';
    //
    // Grunt configuration:
    //
    // https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
    //
    grunt.initConfig({

        // Project configuration
        // ---------------------
        // specify an alternate install location for Bower
        bower: {
            dir: 'app/components'
        },

        // Coffee to JS compilation
        coffee: {
            compile: {
                files: {
                    'temp/js/*.js': 'app/js/**/*.coffee'
                },
                options: {
                    basePath: 'app/js'
                }
            }
        },

        // compile .scss/.sass to .css using Compass
        compass: {
            dist: {
                // http://compass-style.org/help/tutorials/configuration-reference/#configuration-properties
                options: {
                    css_dir: 'temp/css',
                    sass_dir: 'app/css',
                    images_dir: 'app/img',
                    javascripts_dir: 'temp/js',
                    force: true,
                    load: ['app/components/twitter-bootstrap-sass/vendor/assets']
                }
            }
        },

        // generate application cache manifest
        manifest: {
            dest: ''
        },

        // headless testing through PhantomJS
        mocha: {
            all: ['test/**/*.html']
        },

        // default watch configuration
        watch: {
            coffee: {
                files: 'app/js/**/*.coffee',
                tasks: 'coffee reload'
            },
            compass: {
                files: ['app/css/**/*.{scss,sass}'],
                tasks: 'compass reload'
            },
            reload: {
                files: ['app/*.html', 'app/css/**/*.css', 'app/js/**/*.js', 'app/img/**/*'],
                tasks: 'reload'
            }
        },

        // default lint configuration, change this to match your setup:
        // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#lint-built-in-task
        lint: {
            files: ['Gruntfile.js', 'app/js/**/*.js', 'spec/**/*.js']
        },

        // specifying JSHint options and globals
        // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#specifying-jshint-options-and-globals
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true
            },
            globals: {
                jQuery: true
            }
        },

        // Build configuration
        // -------------------
        // the staging directory used during the process
        staging: 'temp',
        // final build output
        output: 'dist',

        mkdirs: {
            staging: 'app/'
        },

        // Below, all paths are relative to the staging directory, which is a copy
        // of the app/ directory. Any .gitignore, .ignore and .buildignore file
        // that might appear in the app/ tree are used to ignore these values
        // during the copy process.

        // renames JS/CSS to prepend a hash of their contents for easier
        // versioning
        rev: {
            js: 'js/**/*.js',
            css: 'css/**/*.css',
            img: ''
        },

        // usemin handler should point to the file containing
        // the usemin blocks to be parsed
        'usemin-handler': {
            html: 'index.html'
        },

        // update references in HTML/CSS to revved files
        usemin: {
            html: ['index.html'],
            css: ['**/*.css']
        },

        // HTML minification
        html: {
            files: ['**/*.html']
        },

        // Optimizes JPGs and PNGs (with jpegtran & optipng)
        img: {
            dist: '<config:rev.img>'
        },

        // rjs configuration. You don't necessarily need to specify the typical
        // `path` configuration, the rjs task will parse these values from your
        // main module, using http://requirejs.org/docs/optimization.html#mainConfigFile
        //
        // name / out / mainConfig file should be used. You can let it blank if
        // you're using usemin-handler to parse rjs config from markup (default
        // setup)
        rjs: {
            // no minification, is done by the min task
            optimize: 'none',
            baseUrl: './js',
            wrap: false,
            name: 'main'
        },

        // While Yeoman handles concat/min when using
        // usemin blocks, you can still use them manually
        concat: {
            dist: ''
        },

        min: {
            dist: ''
        }
    });

    // Alias the `test` task to run the `mocha` task instead
    grunt.registerTask('test', 'server:phantom mocha');

    grunt.registerTask('build', 'intro clean coffee compass mkdirs usemin-handler rjs concat min img rev usemin manifest copy time');
};