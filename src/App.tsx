import { ThemeProvider } from '@emotion/react';
import { theme } from '@styles/themes';
import { Route, Routes } from 'react-router-dom';
import GNB from '@components/GNB';
import Home from '@pages/Home';
import Profile from '@pages/Profile';
import Album from '@pages/Album';
import AlbumDetail from '@pages/Album/AlbumDetail';
import Schedule from '@pages/Schedule';
import ScheduleDetail from '@pages/Schedule/ScheduleDetail';
import Goods from '@pages/Goods';
import About from '@pages/About';
import ScrollToTop from '@const/ScrollToTop';

/**
 * Root application component that provides theming, global navigation, and client-side routes.
 *
 * @returns The root JSX element that wraps the app in a ThemeProvider, renders the global navigation bar (GNB), and configures routes for Home, Profile, Album, Schedule, and About.
 */
function App() {
	return (
		<ThemeProvider theme={theme}>
			<ScrollToTop />
			<GNB />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/album" element={<Album />} />
				<Route path="/album/:id" element={<AlbumDetail />} />
				<Route path="/schedule" element={<Schedule />} />
				<Route path="/schedule/:id" element={<ScheduleDetail />} />
				<Route path="/goods" element={<Goods />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</ThemeProvider>
	);
}

export default App;
