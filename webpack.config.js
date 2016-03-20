var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var nodeModulesPath = path.join(__dirname, 'node_modules');

var includes = [
    path.resolve(__dirname, "src")
];
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
        __PRODUCTION__: false
    }),
     new HtmlWebpackPlugin({
         title: 'React-Percent-Doughnut',
         template: 'index.html'
})
  ],

  module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel?presets[]=react,presets[]=es2015,presets[]=react-hmre'],
          include: includes,
          excludes: /node_modules/
        },
	    {
          test: /\.tsx?$/,
          loaders: ['babel?presets[]=react,presets[]=es2015,presets[]=react-hmre', 'ts'],
          include: includes
	    },
        {
          test: /\.css$/,
          loaders: ["style", "css"],
          include: path.join(__dirname, 'styles')
        },
        {
          test: /\.less$/,
          loaders: ["style", "css", "less"],
          include: path.join(__dirname, 'styles')
        },
        { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel' },
        { test: /\.css$/, loader: 'style-loader!css-loader' }
     ]
  },

  resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  }
};
