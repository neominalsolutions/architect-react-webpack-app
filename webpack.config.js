const path = require('path'); // EC module system yerine CommonJS NodeJS module sistem kullkanılmış.
const htmlWebPack = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/index.tsx', // uygulama giriş noktası, uygulama buradan bootstrap olur.
	mode: 'development',
	devServer: {
		port: 3009,
		historyApiFallback: true,
	},
	output: {
		// uygulama çıktısında hangi isimde hangi klasör altında tutulacağı
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		// uygulamanın hangi dosya tipinde olduğu
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx|js|jsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.(s(a|c)ss)$/,
				include: path.resolve(__dirname, 'src'),
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
					'postcss-loader',
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				loader: 'file-loader',
			},
		],
	},
	plugins: [
		new htmlWebPack({
			template: './src/index.html',
		}),
		new MiniCssExtractPlugin(),
	],
};

// htmlWebPack plugin ile index.html den uygulayı hizmet et.
