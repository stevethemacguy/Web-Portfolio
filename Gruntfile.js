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
                src: ["images/sprites/*"]
            }
        },

        //Concat all css and js files into single files
        concat: {
            css: {
                src: [
                    'css/*.css' // All css in the folder.
                ],
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
                    'index.html': 'index.html'     // 'destination': 'source'
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
                        src: 'styles.css',
                        //src: ['*.css', '!*.min.css'], //Use for all files
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
        imagemin: {
            allImages: {
                files: [{
                    expand: true,
                    cwd: 'images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'live/images'
                }]
            }
        },

        //Watch folders for changes. Removes build folders created in the process.
        //NOT currently used when testing, since minifying takes too long.
        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat:js', 'uglify']
            },
            css: {
                files: ['css/*.css'],
                tasks: ['concat:css', 'cssmin', 'clean:buildfiles']
            }
        },

        //Create a spritesheet and corresponding CSS using all images in the image folder
        //NOTE: If you want to just add a new image, then run 'grunt sprite".
        //If you want to re-create the entire sprite file then clean the "sprites" folder first.
        //This does NOT auto-update the CSS file. Currently, sprite css has to be updated manually for new images.
        sprite:{
            all: {
                src: ['images/**/*.png','!images/tech/Not-Used/*.png'],
                imgPath: '@spritesheet',
                cssOpts: {
                    cssSelector: function (item) {
                        return '.' + item.name; //Use original classnames instead of "icon-"
                    }
                },
                dest: 'images/sprites/spritesheet.png',
                destCss: 'images/sprites/sprites.css',
                engine: 'phantomjssmith'
            }
        }
    });

    //Load plugins
    grunt.loadNpmTasks('grunt-contrib-clean'); //Delete files or folders
    grunt.loadNpmTasks('grunt-newer'); //Runs grunt tasks on new and modified files only
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-imageoptim');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-spritesmith');

    //Build process (i.e. "grunt" command with no arguments)
    /*
        a. Clean (Remove "live" folders)
        b. Concat CSS and JS files into single files
        c. Process dev.html to create index.html (see comments for the processhtml task above)
        d. Minify HTML
        e. Minify CSS
        f. Minify JS

        g. Clean (Remove any build folders created in the process)
     */
    grunt.registerTask('default', ['clean:it','concat','processhtml','htmlmin','cssmin','uglify','clean:buildfiles']);
};