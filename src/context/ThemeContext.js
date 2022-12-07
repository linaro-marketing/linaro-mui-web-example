import { createContext, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider, useMediaQuery } from '@mui/material';
import { lightTheme, darkTheme } from '@styles/theme';
import { useLocalStorage } from '@lib/hooks';

const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';

const ThemeContext = createContext({});
const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
	const isDarkOS = useMediaQuery(DARK_SCHEME_QUERY);

	const [themeMode, setThemeMode] = useLocalStorage('themeMode', isDarkOS ? 'light' : 'dark');
	function setClassOnDocumentBody(mode) {
		var classNameDark = 'dark';
		var classNameLight = 'light';
		document.body.classList.add(mode === 'dark' ? classNameDark : classNameLight);
		document.body.classList.remove(mode === 'dark' ? classNameLight : classNameDark);
	}
	const toggleTheme = () => {
		console.log('Theme is toggled: ', themeMode);
		if (themeMode === 'light') {
			setClassOnDocumentBody('dark');
			setThemeMode('dark');
		} else {
			setClassOnDocumentBody('light');
			setThemeMode('light');
		}
	};

	return (
		<ThemeContext.Provider value={{ themeMode, toggleTheme }}>
			<MuiThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
				{children}
			</MuiThemeProvider>
		</ThemeContext.Provider>
	);
};

export { useThemeContext, ThemeProvider };
