/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import GlobalStyle from './styles/GlobalStyles.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<GlobalStyle />
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>,
);
