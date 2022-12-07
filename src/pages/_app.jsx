import React from 'react';
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import { ThemeProvider } from '@context/ThemeContext';
import CustomSnackbarProvider from '@components/CustomSnackbarProvider';
import '@styles/global.css';
import createCache from '@emotion/cache';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { darkTheme } from '@styles/theme';
// import * as Sentry from "@sentry/browser";
// const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
// const SENTRY_ENVIRONMENT = process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT;
// const SENTRY_RELEASE = process.env.NEXT_PUBLIC_SENTRY_RELEASE;
// if (typeof window !== "undefined") {
//   console.log("Initialising Sentry with DSN", SENTRY_DSN);
//   Sentry.init({
//     dsn: SENTRY_DSN,
//     release: SENTRY_RELEASE,
//     environment: SENTRY_ENVIRONMENT,
//     debug: true,
//   });
// }
//---------- Setup progress bar.
const primaryColour = darkTheme.palette.primary.main;
// Grab the primary.main colour from the theme directly since this is outside
// of the <ThemeProvider> scope
const progress = new ProgressBar({
	color: primaryColour,
	className: 'bar-of-progress',
	size: 4,
	delay: 100,
});
Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);
//---------- End Setup progress bar.
const clientSideEmotionCache = createCache({ key: 'css', prepend: true });

const App = function ({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
	const notistackRef = React.createRef();
	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider>
				<CustomSnackbarProvider notistackRef={notistackRef}>
					<CssBaseline />
					<Component {...pageProps} />
				</CustomSnackbarProvider>
			</ThemeProvider>
		</CacheProvider>
	);
};

export default App;
