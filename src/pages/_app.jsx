import React from 'react';
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import { CustomSnackbarProvider, ThemeProvider } from '/home/delara/linaro-mui-web';
import '../styles/global.css';
import createCache from '@emotion/cache';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { darkTheme, lightTheme } from '../styles/theme';
const clientSideEmotionCache = createCache({ key: 'css', prepend: true });
const App = function ({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
	const notistackRef = React.createRef();
	const primaryColour = darkTheme.palette.primary.main;
	const progress = new ProgressBar({
		color: primaryColour,
		className: 'bar-of-progress',
		size: 4,
		delay: 100,
	});
	Router.events.on('routeChangeStart', progress.start);
	Router.events.on('routeChangeComplete', progress.finish);
	Router.events.on('routeChangeError', progress.finish);
	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider darkTheme={darkTheme} lightTheme={lightTheme}>
				<CustomSnackbarProvider notistackRef={notistackRef} dismissText="dismiss">
					<CssBaseline />
					<Component {...pageProps} />
				</CustomSnackbarProvider>
			</ThemeProvider>
		</CacheProvider>
	);
};

export default App;
