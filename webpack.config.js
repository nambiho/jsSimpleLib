const webpack = require('webpack');

//var dir='./src';
var dir='./build';

module.exports = {
	mode:'development',
	entry:{
		simplelib: [dir+'/simplelib.js', dir+'/index.js']
	},
	output : {
		path : __dirname + '/public',
		filename : '[name].js',
		publicPath:'/'
	},
	module : {
		rules: [{
			test: /\.js?$/,
			loader: 'babel-loader',
			options: {
			  presets: ['es2015']
			},
			exclude: ['/node_modules']
		}]
	}
}
