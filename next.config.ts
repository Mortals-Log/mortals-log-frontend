import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	outputFileTracingRoot: path.join(__dirname),
	webpack(config) {
		const fileLoaderRule = config.module.rules.find(
			(rule: any) => rule.test?.test?.('.svg'),
		);

		// webpack disallows a rule from having both `loader` and `use` — drop
		// `loader`/`options` from the spread before adding `use: [svgr]`.
		const restFileLoaderRule = { ...fileLoaderRule };
		delete restFileLoaderRule.loader;
		delete restFileLoaderRule.options;

		config.module.rules.push(
			{
				...restFileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /react/,
				use: ['@svgr/webpack'],
			},
			{
				...restFileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: { not: [...(restFileLoaderRule.resourceQuery?.not || []), /react/] },
			},
		);

		fileLoaderRule.exclude = /\.svg$/i;

		return config;
	},
};

export default nextConfig;
