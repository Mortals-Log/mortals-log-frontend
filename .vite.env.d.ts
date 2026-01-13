/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.svg?react' {
	import type { FC, SVGProps } from 'react';
	export const ReactComponent: FC<SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}

interface ImportMetaEnv {
	readonly VITE_SUPABASE_URL: string;
	readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}