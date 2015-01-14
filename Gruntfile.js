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
                dest: 'js/build/index.js'
            }
        },

        //Minify the JS
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js/build/index.js',
                dest: 'js/build/index.min.js'
            }
        },

        //Compress images. Use imageoptim manually since it compresses all images (slowly)
        //WARNING: You cannot specify an output folder, so the original files will be modified!
        imageoptim: {
            myTask: {
                options: {
                    jpegMini: false,
                    imageAlpha: true,
                    quitAfter: true
                },
                src: ['images/tech/compressed']
            }
        }
    });

    //Load plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-imageoptim');

    //Tasks to execute when using the "grunt" command with no arguments
    grunt.registerTask('default', ['concat','uglify']);

    //Use imageoptim manually since it compresses all images (slowly)
};