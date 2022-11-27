import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (_, argv) => {
	return {
		mode: argv.mode || 'production',
		entry: './src/index.ts',
		output: {
			path: path.join(__dirname, '/dist'),
			filename: 'index.js',
			libraryTarget: 'umd',
			clean: true,
		},
		devServer: {
			static: './dist',
		},
		resolve: {
			extensions: ['.tsx', '.ts'],
		},
		externals: {
			react: 'react',
		},
		module: {
			rules: [
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
	};
}