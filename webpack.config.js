const webpack = require('webpack');

const dir='./src';
const lifecycle = process.env.npm_lifecycle_event;
let entry = {simplelib: [dir+'/simplelib.js']};
if (lifecycle === 'dev') {
	entry.index='./testing/index.js'
}
module.exports = {
	mode:'development',
	entry:entry,
	output : {
		path : __dirname + '/dist',
		filename : '[name].js',
		publicPath:'/dist/'
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
