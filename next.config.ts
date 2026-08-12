import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	webpack(config) {
		const fileLoaderRule = config.module.rules.find(
			(rule: any) => rule.test?.test?.('.svg'),
		);

		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /react/,
				use: ['@svgr/webpack'],
			},
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not || []), /react/] },
			},
		);

		fileLoaderRule.exclude = /\.svg$/i;

		return config;
	},
};

export default nextConfig;
