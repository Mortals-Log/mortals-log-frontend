// @/pages/About/AboutPolicySection

import { LAYOUT_CONTENT_SECTION, LAYOUT_SECTION_TITLE } from '@/const/layout-classes';

import { ABOUT_POLICY } from '@/const/about';

const AboutPolicy = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	return (
		<section className={LAYOUT_CONTENT_SECTION}>
			<div className={LAYOUT_SECTION_TITLE}>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</div>

			{ABOUT_POLICY.SECTIONS.map((item, index) => (
				<div
					key={index}
					className="flex justify-center items-center gap-5 py-4 border-t border-gray-200 whitespace-pre-line [word-break:keep-all] font-sans text-sm first-of-type:border-t-0 [&_.label]:flex-[0_0_120px] [&_.label]:text-center [&_.label]:font-medium [&_.label]:text-primary [&_.label]:tracking-[0.05em] [&_.label]:uppercase [&_.label]:pt-[0.2rem] [&_.content]:leading-[1.6] [&_.content]:font-normal [&_.content]:text-gray-600 max-tablet:[&_.label]:pl-4 max-mobile:flex-col max-mobile:gap-2 max-mobile:py-[0.8rem] max-mobile:px-[0.3rem] max-mobile:[&_.label]:text-left max-mobile:[&_.label]:flex-none">
					<div className="label">{item.label}</div>
					<div className="content">{item.content}</div>
				</div>
			))}
		</section>
	);
};

export default AboutPolicy;
