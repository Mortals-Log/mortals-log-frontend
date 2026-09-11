// @/pages/About/AboutInquirySection

import Link from 'next/link';
import { LAYOUT_CONTENT_SECTION, LAYOUT_SECTION_TITLE } from '@/const/layout-classes';
import { ABOUT_INQUIRY, ABOUT_INQUIRY_SUFFIX } from '@/const/about';

const AboutInquiry = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const suffix = ABOUT_INQUIRY_SUFFIX;

	return (
		<section className={LAYOUT_CONTENT_SECTION}>
			<div className={LAYOUT_SECTION_TITLE}>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</div>

			<div className="w-full grid grid-cols-2 mt-6 gap-2 max-tablet:grid-cols-1 max-tablet:mt-4 max-tablet:gap-[0.8rem] max-mobile:grid-cols-1 max-mobile:mt-6 max-mobile:gap-4">
				{Object.values(ABOUT_INQUIRY).map(item => (
					<Link
						key={item.label}
						href={item.url}
						target="_blank"
						rel="noreferrer"
						className="flex no-underline p-8 flex-col items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-[10px] font-sans text-lg font-medium text-primary [&_span]:text-sm [&_span]:font-normal [&_span]:text-gray-500 hover:border-primary hover:bg-primary hover:text-white hover:[&_span]:text-gray-100 active:scale-[0.98] max-tablet:p-6 max-tablet:text-md">
						{item.label}
						<span>
							{item.label}
							{suffix}
						</span>
					</Link>
				))}
			</div>
		</section>
	);
};

export default AboutInquiry;
