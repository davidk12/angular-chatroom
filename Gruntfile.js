module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	concat: {
		options: {
			// define a string to put between each file in the concatenated output
			separator: ';'
		},
		dist: {
			// the files to concatenate
			src: [
				"src/js/*.js",
				"src/js/services/*.js",
				"src/js/directives/*.js",
				"src/js/controllers/*.js",
				],
		// the location of the resulting JS file
		dest: 'dist/<%= pkg.name %>.js'
	  }
	},
	
    jshint: {
      foo: {
        src: [
          "src/js/*.js",
          "src/js/services/*.js",
          "src/js/directives/*.js",
          "src/js/controllers/*.js",
        ],
      },
    },
	uglify: {
		options: {
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		},
		dist: {
			files: {
				'build/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
			}
		}
	},
	});
 
  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
    // Load the plugin that provides the "concat" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Default task(s).
  grunt.registerTask('default', ['jshint', 'concat', 'uglify'/* more tasks here */]);
};