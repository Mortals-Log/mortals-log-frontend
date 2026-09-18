import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	outputFileTracingRoot: path.join(__dirname),
	webpack(config) {
		const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.('.svg'));

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
				use: [
					{
						loader: '@svgr/webpack',
						options: {
							// viewBox 가 width/height 와 중복되면 SVGO 가 제거해 버려서
							// (Lucide 아이콘 등) CSS 로 축소할 때 스케일되지 않고 잘린다. viewBox 유지.
							svgoConfig: {
								plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false } } }],
							},
						},
					},
				],
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
