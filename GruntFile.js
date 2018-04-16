

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
		clean: {
			dist: {
				src: [
					'dist'
				]
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
		jshint: {
			files: ['./src/*.js'],
			options: {
				force: true,
				esversion: 6,
				asi: true,
				strict: 'global',
				browser: true,
				expr: true,
				globals: {
					console: true,
					simplelib: true
				}
			}
		},
		watch: {
			options: {
				livereload: true
			},
			files: ['./src/*.js'],
			tasks: ['jshint','clean:dist','browserify']
		},
		connect: {
			server: {
				options: {
					open: true,
					protocol: 'http',
					hostname: 'localhost',
					livereload: true
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', ['clean:dist','browserify','uglify']);
	grunt.registerTask('devserver', ['jshint', 'clean:dist', 'browserify', 'connect:server', 'watch']);
}
