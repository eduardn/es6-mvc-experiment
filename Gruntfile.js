var fs = require('fs');

/**
 * Helper function that strips src from the source file path
 *
 * @param  {String} srcPath Source file path
 * @return {String}         Destination file path
 */
function getDestinationPath(srcPath) {
    var srcParts = srcPath.split('/');
    var cleanPath = srcParts.slice(1, srcParts.length - 1).join('/');

    return 'dist/' + cleanPath + '/';
}

/**
 * Gets all the sources and create an options object used by babel to compile
 * the source files.
 *
 * The function is recursive and reads all the directories from src until it
 * finds a file that can be compiled.
 *
 * @param  {Object} options    Temporary options obejct
 * @param  {String} parentPath Current path we are in
 * @return {Object}            Final options object
 */
function getSources(options, parentPath) {
    var files = fs.readdirSync(parentPath || 'src');
    var fileOptions = options || {};
    var path = parentPath || 'src/';

    files.forEach(function (file) {
        var stat = fs.lstatSync(path + file);

        if (stat.isDirectory()) {
            getSources(fileOptions, path + file + '/');
        } else {
            var destPath = getDestinationPath(path) + file;
            var srcPath = path + file;
            fileOptions[destPath] = srcPath;
        }
    });

    return fileOptions;
}

module.exports = function (grunt) {
    var files = getSources();

    grunt.initConfig({
        babel: {
            options: {
                stage: 1
            },
            dist: {
                files: files
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('default', ['babel']);
}
