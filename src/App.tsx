import { ThemeProvider } from '@emotion/react';
import { theme } from '@styles/themes';
import { Route, Routes } from 'react-router-dom';
import GNB from '@components/GNB';
import Home from '@pages/Home';
import Profile from './pages/Profile';
import Album from './pages/Album';
import Schedule from './pages/Schedule';
import About from './pages/About';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GNB />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/album" element={<Album />} />
				<Route path="/schedule" element={<Schedule />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</ThemeProvider>
	);
}

export default App;
