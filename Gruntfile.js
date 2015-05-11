/**
 * Created by TRAN CHI TAM on 4/14/2015.
 */

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        apidoc: {
            apm: {
                src: "rest/",
                dest: "docs/",
                options: {
                    debug: true,
                    includeFilters: [".*\\.js$"],
                    excludeFilters: ["node_modules"],
                    marked: {
                        gfm: true
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-apidoc');
    grunt.registerTask('default', ['apidoc']);
};