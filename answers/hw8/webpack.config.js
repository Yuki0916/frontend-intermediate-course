var path = require('path');
module.exports = {
	entry: './js/index.js',
	output: {
	  filename: 'bundle.js',
	  path: path.resolve(__dirname, 'dist')
	},
	module: {
	  rules: [{
	      test: /\.stylus$/,
	      use: [
	        'style-loader',
	        'css-loader',
	        'stylus-loader'
	      ]
	    },
	    {
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: ['env']
	        }
	      }
	    }
	  ]
	}
};
