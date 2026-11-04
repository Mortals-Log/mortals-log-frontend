import path from 'path';
import type { NextConfig } from 'next';

// 이름이 바뀌지 않는 정적 파일: 일주일은 다시 묻지 않고, 그 뒤 한 달은 저장본을 먼저 보여준 뒤 뒤에서 새로 확인한다.
const STATIC_FILE_CACHE_CONTROL = 'public, max-age=604800, stale-while-revalidate=2592000';

const nextConfig: NextConfig = {
	outputFileTracingRoot: path.join(__dirname),
	poweredByHeader: false,
	async headers() {
		return [
			{ source: '/images/:path*', headers: [{ key: 'Cache-Control', value: STATIC_FILE_CACHE_CONTROL }] },
			{ source: '/files/:path*', headers: [{ key: 'Cache-Control', value: STATIC_FILE_CACHE_CONTROL }] },
		];
	},
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
