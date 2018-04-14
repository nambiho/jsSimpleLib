module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify:{
			options: {
				banner: '// <%= pkg.name %>\n' +
				'// version: <%= pkg.version %>\n' +
				'// update: <%= grunt.template.today("yyyy.mm.dd") %>\n',
				sourceMap:true,
				sourceMappingURL:'./simplelib.min.js.map'
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
					'dist/simplelib.js': 'src/simplelib.js'
				},
				options: {
					transform: [['babelify', { presets: "es2015" }]],
					browserifyOptions: {
						debug: false
					}
				}
			}
		},
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['browserify'/*,'requirejs:dist','umd:dist'*/, 'uglify'/*, 'clean'*/])
}