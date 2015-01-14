module.exports = function(grunt) {

    //Configuration for all modules 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //Concat multiple files into a single index file
        concat: {
            dist: {
                src: [
                    //'js/*.js' // All JS in the js folder. Not used
                    //jQuery/ui/mobile is currently loaded as needed, so it doesn't appear here
                    'js/jquery.stellar.js',
                    'js/jquery.inview.min.js',
                    'js/main.js'
                ],
                dest: 'live/js/index.js'
            }
        },

        //Minify the JS
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'live/js/index.js',
                dest: 'live/js/index.min.js'
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
        //WARNING: Due to a current bug, the destination folder MUST be different than the source
        imagemin: {
            allImages: {
                files: [{
                    expand: true,
                    cwd: 'images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'live/images'
                }]
            }
        }
    });

    //Load plugins
    grunt.loadNpmTasks('grunt-newer'); //Runs grunt tasks on new and modified files only
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-imageoptim');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    //Tasks to execute when using the "grunt" command with no arguments
    grunt.registerTask('default', ['concat','uglify']);

    //Use imageoptim manually since it compresses all images (slowly)
};