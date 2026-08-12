declare module '*.svg?react' {
	import type React from 'react';
	const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
	export default content;
}
