declare module '*.svg?react' {
	import React = require('react');
	const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
	export default content;
}
