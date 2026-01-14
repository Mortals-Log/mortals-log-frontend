import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const DUMMY_SCHEDULE = [
	{
		id: 'event-1',
		title: '부산불바다2',
		location: '부산 리얼라이즈',
		date: '2026. 01. 17',
		schedules: [
			{ part: '1부', time: '16:00' },
			{ part: '2부', time: '19:00' }
		]
	},
	{
		id: 'event-2',
		title: '고독의 포크 전사 주정뱅이 딴따라',
		location: '홍대 롤링홀',
		date: '2026. 02. 06 ~ 07',
		schedules: [
			{ part: '02. 06, 토', time: '16:00' },
            { part: '02. 07, 일', time: '16:00' }

		]
	}
];

const DUMMY_ALBUM = {
	title: '졸업앨범',
	releaseDate: '2025. 11. 01',
	type: 'Regular Album',
    musicVideo: '#',
	store: '#',
};

const Home = () => {
	return (
		<MainContainer>
			<BackgroundNoise />

			<HeroSection initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
				<header>
					<Category>천진우 팬페이지</Category>
					<MainTitle>천진우</MainTitle>

                    <SubTitleContainer initial={{ width: 0, opacity: 0 }} animate={{ width: '100%', opacity: 1 }} transition={{ delay: 0.8, duration: 1.5, ease: 'easeInOut' }}>
                        <SubTitleWrapper>
                            <SubTitle>CHUN JINWOO</SubTitle>
                            <VerticalBar>|</VerticalBar>
                            <SubTitle>千鎭宇</SubTitle>
                            <VerticalBar>|</VerticalBar>
                            <SubTitle>1000 Jinwoo</SubTitle>
                        </SubTitleWrapper>
                    </SubTitleContainer>
				</header>
              
                <InformationContainer
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                
                    <SectionWrapper>
                        <InfoSection>
                            <span className="section-label">공연 예정</span>
                            <EventList>
                                {DUMMY_SCHEDULE.map((event) => (
                                    <ContentCard key={event.id}>
                                        <h3 className="title">{event.title}</h3>
                                        <div className="details">
                                            <p className="info-text">
                                                {event.location} | {event.date}
                                            </p>
                                            <TimeSlotWrapper>
                                                {event.schedules.map((sched, idx) => (
                                                    <TimeTag key={idx}>
                                                        {sched.part && <span className="part">{sched.part}</span>}
                                                        <span className="time">{sched.time}</span>
                                                    </TimeTag>
                                                ))}
                                            </TimeSlotWrapper>
                                        </div>
                                    </ContentCard>
                                ))}
                            </EventList>
                        </InfoSection>

                        <InfoSection>
                            <span className="section-label">최근 앨범</span>
                            <ContentCard>
                                <h3 className="title">{DUMMY_ALBUM.title}</h3>
                                <div className="details">
                                    <p className="info-text">
                                        {DUMMY_ALBUM.type} | {DUMMY_ALBUM.releaseDate}
                                    </p>
                                    <LinkButton transition={{ duration: 0.3 }}>
                                        앨범 구매
                                    </LinkButton>
                                    <LinkButton transition={{ duration: 0.3 }}>
                                        뮤직 비디오
                                    </LinkButton>
                                </div>
                            </ContentCard>
                        </InfoSection>
                    </SectionWrapper>
                </InformationContainer>

            </HeroSection>

            <ScrollIndicator>
                <p>SCROLL</p>
                <div className="line" />
            </ScrollIndicator>
        </MainContainer>
	);
};

export default Home;

// --- Emotion Styles ---

const MainContainer = styled.main`
	position: relative;
	width: 100%;
	height: 100vh;
	background-color: ${props => props.theme.COLOR.WHITE};
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
`;

const BackgroundNoise = styled.div`
	position: absolute;
	inset: 0;
	background: url('https://grainy-gradients.vercel.app/noise.svg');
	opacity: 0.8;
	pointer-events: none;
`;

const HeroSection = styled(motion.section)`
	text-align: center;
	z-index: 10;
`;

const Category = styled.span`
	color: ${props => props.theme.COLOR.PRIMARY};
	font-size: 0.9rem;
	letter-spacing: 0.4em;
	text-transform: uppercase;
	display: block;
	margin-bottom: 1rem;
`;

const MainTitle = styled.h1`
	font-size: clamp(3.5rem, 12vw, 9rem);
	font-weight: 900;
	color: ${props => props.theme.COLOR.BLACK};
	margin: 0;
	letter-spacing: -0.02em;
`;

const SubTitleContainer = styled(motion.div)`
	overflow: hidden;
	white-space: nowrap;
    margin: 1.5rem 0rem;
`;

const SubTitleWrapper = styled(motion.div)`
	display: inline-flex;
	align-items: center;
	gap: 0.8rem;
`;

const SubTitle = styled.span`
	font-size: 1.1rem;
	font-weight: 200;
	color: ${props => props.theme.COLOR.BLACK};
`;

const VerticalBar = styled.span`
	font-size: 1.1rem;
	font-weight: 100;
	color: ${props => props.theme.COLOR.PRIMARY};
`;

const InformationContainer = styled(motion.div)`
	margin-top: 4rem;
	width: 100%;
	max-width: 1000px;
	padding: 0 2rem;
`;

const SectionWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 5rem;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		gap: 3rem;
	}
`;

const InfoSection = styled.div`
	.section-label {
		color: ${props => props.theme.COLOR.PRIMARY};
		font-size: 0.8rem;
        letter-spacing: 0.2rem;
		display: block;
		margin-bottom: 1.5rem;
	}
`;

const EventList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2.5rem;
`;

const TimeSlotWrapper = styled.div`
	display: flex;
	gap: 0.6rem;
	margin-top: 1rem;
	flex-wrap: wrap;
`;

const TimeTag = styled.div`
	border: 1px solid ${props => props.theme.COLOR.BLACK};
	padding: 0.4rem 0.8rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	min-width: 70px;

	.part {
		font-size: 0.6rem;
		font-weight: 800;
		color: ${props => props.theme.COLOR.PRIMARY};
		margin-bottom: 0.1rem;
		text-transform: uppercase;
	}
	.time {
		font-size: 1rem;
		font-weight: 400;
	}
`;

const ContentCard = styled.div`
	border-left: 1px solid ${props => props.theme.COLOR.PRIMARY};
	padding-left: 1.5rem;
	text-align: left;
	
	.title {
		font-size: 1.4rem;
		font-weight: 700;
		margin: 0 0 0.5rem 0;
	}
	.info-text {
		font-size: 0.9rem;
		opacity: 0.7;
		margin: 0;
	}
`;

const LinkButton = styled(motion.button)`
	margin: 1.5rem 1rem 0rem 0rem;
	background: transparent;
	border: 1px solid ${props => props.theme.COLOR.BLACK};
	color: ${props => props.theme.COLOR.BLACK};
	padding: 0.6rem 1.5rem;
	font-size: 0.75rem;
	letter-spacing: 0.2em;
	cursor: pointer;
	font-weight: 600;

    &:hover {
		background: ${props => props.theme.COLOR.PRIMARY};
		color: ${props => props.theme.COLOR.WHITE};
        border-color: ${props => props.theme.COLOR.PRIMARY};
	}
`;

const ScrollIndicator = styled.div`
	position: absolute;
	bottom: 2rem;
	left: 50%;
	transform: translateX(-50%);
	text-align: center;

	p {
		font-size: 0.7rem;
		letter-spacing: 0.3em;
		color: ${props => props.theme.COLOR.GRAY600};
		margin-bottom: 1rem;
	}

	.line {
		width: 1px;
		height: 50px;
		background: linear-gradient(to bottom, ${props => props.theme.COLOR.PRIMARY}, transparent);
		margin: 0 auto;
	}
`;
