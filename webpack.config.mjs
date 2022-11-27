import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (_, argv) => {
	return {
		mode: argv.mode || 'production',
		entry: './src/index.tsx',
		devtool: 'source-map',
		output: {
			path: path.join(__dirname, '/dist'),
			filename: 'index.js',
		},
		devServer: {
			static: './dist',
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader'],
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './src/index.html',
			}),
		],
	};
}