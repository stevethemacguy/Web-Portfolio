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
        }
    });

    //Load plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //Tasks to execute when using the "grunt" command with no arguments
    grunt.registerTask('default', ['concat','uglify']);
};