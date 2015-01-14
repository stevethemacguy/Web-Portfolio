module.exports = function(grunt) {

    //Configuration for all modules 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //Minify JS Configuration
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        }
    });

    //Load plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //Tasks to execute when using the "grunt" command
    grunt.registerTask('default', ['uglify']);

};