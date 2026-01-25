// @src/pages/About/components/AboutStory.tsx

import * as S from '@styles/pages/About/AboutTitle.style';
import { ABOUT_STORY } from '@const/about';

const AboutStory = () => {
	const mainTitle = ABOUT_STORY.MAINTITLE.split('\n')[0];
	const logTitle = ABOUT_STORY.MAINTITLE.split('\n')[1];
	const subTitles = ABOUT_STORY.SUBTITLE.split('\n');

	return (
		<S.ContentSection>
			<S.Title>
				{mainTitle}
				<br />
				<div className="bottom-row">
					<span>{logTitle}</span>

					<div className="subtitle-column">
						{subTitles.map((text, i) => (
							<small key={i}>{text}</small>
						))}
					</div>
				</div>
			</S.Title>

			<S.DescriptionBox>
				<p className="main-text">
					{ABOUT_STORY.DESCRIPTION.MAIN.map((part, index) => (
						<span key={index} className={part.startsWith(':') ? 'highlight' : ''}>
							{part}
						</span>
					))}
				</p>{' '}
				<p className="sub-text">{ABOUT_STORY.DESCRIPTION.SUB}</p>
			</S.DescriptionBox>
		</S.ContentSection>
	);
};

export default AboutStory;
