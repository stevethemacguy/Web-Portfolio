module.exports = function(grunt) {

    //Configuration for all modules 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //Removes output folders (removes build folders with "clean:buildfiles")
        //Use "git clean:dry" to do a dry run.
        clean: {
            it: {
                src: ["live/css", "live/js"]
            },
            dry: {
                src: ["live/css", "live/js"],
                options: {
                    'no-write': true
                }
            },
            buildfiles: {
                src: ["css/build","live/js/live.js"]
            },
            spritefiles:
            {
                src: ["live/images/sprites/*"]
            }
        },

        //Creates a spritesheet and corresponding CSS using all of the images in the LIVE/images folder
        //NOTE: Always use "grunt clean:spritefiles" before creating a new stylesheet
        //This does NOT auto-update styles.less. Currently, sprite styles need to be updated MANUALLY.
        sprite:{
            all: {
                src: ['live/images/**/*.png','!live/**/Not-Used/*.png'],
                imgPath: '@spritesheet',
                algorithm: 'left-right',
                cssOpts: {
                    cssSelector: function (item) {
                        return item.name; //Use original image names instead of "icon-"
                    }
                },
                dest: 'live/images/sprites/spritesheet.png',
                destCss: 'live/images/sprites/sprites.css',
                engine: 'phantomjssmith'
            }
        },

        //Concat all css and js files into single files.
        concat: {
            css: {
                src: [ 'css/*.css'],
                dest: 'css/build/styles.css'
            },
            js: {
                src: [
                    //'js/*.js' // All JS in the js folder. Not used
                    //jQuery, jQueryUI, and jQuery Mobile are currently loaded as needed, so they don't appear here
                    'js/jquery.stellar.js',
                    'js/jquery.inview.min.js',
                    'js/main.js'
                ],
                dest: 'live/js/live.js'
            }
        },

        //Run PostCSS scripts (i.e. autoprefixer).
        postcss: {
            //Run autoprefixer on styles.css and overwrite the file
            dev: {
                options: {
                    map: true,
                    processors: [
                        require('autoprefixer')({
                            browsers: ['last 2 versions']
                        })
                    ]
                },
                src: 'css/styles.css',
                dest: 'css/styles.css'  //Overwrites the existing file
            },
            //Before the final concatenated css file is minified, run autoprefixer on the file
            build: {
                options: {
                    map: true,
                    processors: [
                        require('autoprefixer')({
                            browsers: ['last 2 versions']
                        })
                    ]
                },
                src: 'css/build/styles.css',
                dest: 'css/build/styles.css'  //Overwrite the existing file with result of autoprefixer
            }
        },

        //Creates index.html from dev.html by processing the build instructions (labeled as comments in dev.html).
        //Currently changes CSS and JS references to point to the live (concatenated and minified) files produced during the grunt build.
        //In other words, index.html is the production "version" of dev.html.
        processhtml: {
            options: {
                // Task-specific options
            },
            dist: {
                files: {
                    'index.html': ['dev.html']  //dest : source
                }
            }
        },

        //Minify the HTML (NOTE: processhtml MUST be done before minifying, which strips all comments
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    minifyJS: true
                },
                files: {
                    'index.html': 'index.html'  // 'destination': 'source'
                }
            }
        },

        //Minify the CSS
        cssmin: {
            combined: {
                files: [
                    {
                        expand: true,
                        cwd: 'css/build',
                        src: 'styles.css',    //Use ['*.css', '!*.min.css'] for all files
                        dest: 'live/css',
                        ext: '.min.css'
                    }
                ]
            }
        },

        //Minify the JS
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'live/js/live.js',
                dest: 'live/js/live.min.js'
            }
        },

        //Compress images. Use imageoptim manually since it compresses all images (slowly)
        //WARNING: You cannot specify an output folder, so the original files WILL be modified!
        //CURENTLY NOT USED with the default grunt command
        imageoptim: {
            myTask: {
                options: {
                    jpegMini: false,
                    imageAlpha: true,
                    quitAfter: true
                },
                src: ['images/tech']
            }
        },

        //Compresses all images in the image folder and outputs them to the live/images folder
        //WARNING: Due to a current bug with the plugin, the destination folder MUST be different than the source
        //NOTE: Destination creates a new live/images folder (i.e. it does NOT overwrite the existing images folder)
        imagemin: {
            all: {
                files: [{
                    expand: true,
                    cwd: 'images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'live/images'
                }]
            },
            spritefile:
            {
                files: [{
                    expand: true,
                    cwd: 'live/images/sprites',
                    src: ['*.{png,jpg,gif}'],
                    dest: 'live/images/sprites'
                }]
            }
        },

        //Watch css/js files for changes. Not currently used
        watch: {
            //When styles.css changes, run autoprefixer on the file.
            dev: {
                files: ['css/styles.css'],
                tasks: ['postcss:dev']
            }

            //Watch folders for changes. Removes build folders created in the process.
            //NOT currently used when testing, since minifying takes too long.
            /*scripts: {
                files: ['js/!*.js'],
                tasks: ['concat:js', 'uglify']
            },*/
            /*css: {
                files: ['css/!*.css'],
                tasks: ['concat:css', 'cssmin', 'clean:buildfiles']
            }*/
        },

        //Change spritefile path to production path
        replace: {
            spritefile: {
                src: ['css/build/styles.css'],
                overwrite: true,    //Overwrite styles.css with the change
                replacements: [{
                    from: "../live/images/sprites/spritesheet.png",
                    to: "../images/sprites/spritesheet.png"
                }]
            }
        }
    });

    //Load plugins
    grunt.loadNpmTasks('grunt-contrib-clean'); //Delete files or folders
    grunt.loadNpmTasks('grunt-newer'); //Runs grunt tasks on new and modified files only
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-imageoptim');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-text-replace');

    //Watch files (or run autoprefixer manually)
    /*    Be sure to use "grunt watch" before starting development. Currently, this watches for
          style.css changes and runs autoprefixer on the css whenever it's changed. If you don't want
          to watch the code (because of performance), you can just run "grunt postcss:dev" to run auto-prefixer once.
          Caution: un-prefixed css (transforms, animations, etc) might not work as expected until auto-prefixer is run.
    */

    //Build process
    /*
        If no images changed...
            1. Run the default "grunt" task.

        If any images were added, removed, or modified...
            1. Compress the images with imagemin:all if needed (which does all images EXCEPT for the sprite file since it doesn't exist yet)
            2. Run "grunt spritefile" to create a new spritefile (the spritefile itself is also optimized in the process)
            3. MANUALLY update styles.less file with "background-position" CSS from live/image/sprites/sprites.css
            4. Run the default "grunt" task.
    */

    /* Default "grunt" task
            1. Clean (Remove "live" folders)
            2. Concat CSS and JS files into single files
            3. Run autoprefixer on concatenated css file
            4. Change spritesheet image path in styles.less (since live page uses a different path
            5. Process dev.html to create index.html (see comments for the processhtml task above)
            6. Minify HTML
            7. Minify CSS
            8. Minify JS
            9. Clean (Remove any build folders created in the process)
    */
    grunt.registerTask('spritefile', ['clean:spritefiles','sprite', 'imagemin:spritefile']);
    grunt.registerTask('default', ['clean:it','concat','postcss:build','replace','processhtml','htmlmin','cssmin','uglify','clean:buildfiles']);
};