module.exports = {
	mode:'development',
	entry:{
		simplelib: './src/simplelib.js'
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
