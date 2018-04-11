module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify:{
			options: {
				banner: '// <%= pkg.name %>\n' +
				'// version: <%= pkg.version %>\n' +
				'// update: <%= grunt.template.today("yyyy.mm.dd") %>\n'
			},
			dist: {
				files: {
					'dist/simplelib.min.js': [
					'dist/simplelib.js',
					]
				}
			}
		},
		browserify: {
			dist: {
					files: {
						// destination for transpiled js : source js
						'dist/simplelib.js': 'src/simplelib.js'
					},
					options: {
						transform: [['babelify', { presets: "es2015" }]],
						browserifyOptions: {
								debug: true
						}
					}
			}
		},
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('default', ['browserify'/*,'requirejs:dist','umd:dist'*/,'uglify'/*, 'clean'*/])
}