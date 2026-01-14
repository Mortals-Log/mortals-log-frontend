import { ThemeProvider } from '@emotion/react';
import { theme } from '@styles/themes';
import Home from '@pages/Home';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Home />
		</ThemeProvider>
	);
}

export default App;
