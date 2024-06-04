const path = require('path'); // EC module system yerine CommonJS NodeJS module sistem kullkanılmış.
const htmlWebPack = require('html-webpack-plugin');
module.exports = {
	entry: './src/index.tsx', // uygulama giriş noktası, uygulama buradan bootstrap olur.
	mode: 'development',
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
		],
	},
	plugins: [
		new htmlWebPack({
			template: './src/index.html',
		}),
	],
};

// htmlWebPack plugin ile index.html den uygulayı hizmet et.
