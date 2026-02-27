// @/styles/pates/Album/AlbumDetailTracks.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import * as L from '@/styles/common/Layout.style';
export { SectionTitle } from '@/styles/common/Layout.style';

export const ContentSection = styled(L.ContentSection)`
	margin-top: 2rem;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		margin-top: 1.5rem;
	}
`;

export const SideTitle = styled.div`
	padding: 1.2rem 0;
	border-bottom: 2px solid ${props => props.theme.COLOR.GRAY100};

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY600};
	letter-spacing: 0.1em;
	text-transform: uppercase;

	@media ${props => props.theme.WINDOW_SIZE.tablet}, ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}
`;
