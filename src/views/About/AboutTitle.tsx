// @/pages/About/AboutTitle

import { LAYOUT_CONTENT_SECTION } from '@/const/layout-classes';
import { ABOUT_STORY } from '@/const/about';

const AboutStory = () => {
	const mainTitle = ABOUT_STORY.MAINTITLE.split('\n')[0];
	const logTitle = ABOUT_STORY.MAINTITLE.split('\n')[1];
	const subTitles = ABOUT_STORY.SUBTITLE.split('\n');

	return (
		<section className={LAYOUT_CONTENT_SECTION}>
			<div className="font-serif text-display font-semibold text-gray-600 leading-[0.9] tracking-[-0.05em] text-left uppercase mb-10 [&_span]:inline-block [&_span]:text-primary [&_.bottom-row]:flex [&_.bottom-row]:items-end [&_.bottom-row]:gap-5 [&_.subtitle-column]:flex [&_.subtitle-column]:flex-col [&_.subtitle-column]:gap-0.5 [&_.subtitle-column]:pb-[0.2em] [&_small]:font-serif [&_small]:text-md [&_small]:font-medium [&_small]:text-gray-400 [&_small]:normal-case [&_small]:tracking-[-0.02em] [&_small]:leading-[1.2] [&_small]:whitespace-nowrap max-tablet:mb-6 max-tablet:[&_.bottom-row]:items-start max-tablet:[&_.bottom-row]:flex-wrap max-tablet:[&_.bottom-row]:gap-3 max-tablet:[&_.subtitle-column]:pb-0 max-tablet:[&_.subtitle-column]:mt-3 max-tablet:[&_small]:text-sm">
				{mainTitle}

				<div className="bottom-row">
					<span>{logTitle}</span>

					<div className="subtitle-column">
						{subTitles.map((text, i) => (
							<small key={i}>{text}</small>
						))}
					</div>
				</div>
			</div>

			<div className="font-sans whitespace-pre-line [word-break:keep-all] leading-[1.6] [&_.main-text]:text-xl [&_.main-text]:font-medium [&_.main-text]:text-gray-700 [&_.main-text]:mb-[0.8rem] [&_.highlight]:font-serif [&_.highlight]:text-md [&_.highlight]:text-primary [&_.highlight]:align-middle [&_.highlight]:ml-0.5 [&_.highlight]:mr-1 [&_.sub-text]:text-md [&_.sub-text]:font-normal [&_.sub-text]:text-gray-500 max-tablet:[&_.main-text]:text-lg max-tablet:[&_.main-text]:mb-2 max-tablet:[&_.highlight]:text-md max-tablet:[&_.sub-text]:text-sm max-tablet:[&_.sub-text]:leading-[1.3] max-mobile:[&_.main-text]:text-md max-mobile:[&_.main-text]:mb-2 max-mobile:[&_.highlight]:text-sm">
				<p className="main-text">
					{ABOUT_STORY.DESCRIPTION.MAIN.map((part, index) => (
						<span key={index} className={part.startsWith(':') ? 'highlight' : ''}>
							{part}
						</span>
					))}
				</p>
				<p className="sub-text">{ABOUT_STORY.DESCRIPTION.SUB}</p>
			</div>
		</section>
	);
};

export default AboutStory;
