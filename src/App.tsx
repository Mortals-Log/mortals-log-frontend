import { ThemeProvider } from '@emotion/react';
import { theme } from '@styles/themes';
import Home from '@pages/Home';
import GNB from '@components/GNB';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GNB />
			<Home />
		</ThemeProvider>
	);
}

export default App;
