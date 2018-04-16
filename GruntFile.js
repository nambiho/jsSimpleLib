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
		concat: {
			dist: {
				src : ['src/*.js'],
				dest: 'dist/<%= pkg.name %>.js'
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
			files: ['./src/*.js','GruntFile.js'],
			tasks: ['jshint','clean:dist','browserify:dist']
		},
		connect: {
			server: {
				base: '.',
				livereload: 8000,
				keepAlive: true,
				open: {
					target: 'http://localhost:8000',
					appName: 'open'
				}
			}
		}
		,open: {
			dev: {
				path: 'http:localhost:8000'
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	//grunt.loadNpmTasks('grunt-open');

	grunt.registerTask('default', ['jshint','clean:dist','browserify','uglify']);
	grunt.registerTask('devserver', ['connect:server', 'clean:dist', 'browserify', 'watch']);
	grunt.registerTask('conn', ['connect:server']);
}