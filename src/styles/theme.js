import { createTheme } from '@mui/material';

let customComponentStyle = {
	MuiInputBase: {
		styleOverrides: {
			root: {
				color: 'inherit',
			},
		},
	},
};
const baseTheme = createTheme();
let newShadows = baseTheme.shadows;
newShadows[20] = '0px 0px 19px 9px rgba(70,70,70,70%)';
export const darkTheme = createTheme({
	typography: {
		fontFamily: 'Lato',
	},
	components: customComponentStyle,
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 2000,
		},
	},
	shadows: newShadows,
	palette: {
		mode: 'dark',
		paperColor: '#1a1a1a',
		background: {
			default: '#141414',
			paper: '#060606',
		},
		default: {
			main: '#141414',
		},
		border: {
			default: '#424242',
		},
		secondary: {
			main: '#777777',
		},
		primary: {
			main: '#98cc33',
		},
	},
});
export const lightTheme = createTheme({
	typography: {
		fontFamily: 'Lato',
	},
	components: customComponentStyle,
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 2000,
		},
	},
	palette: {
		paperColor: '#f9f9f9',
		mode: 'light',
		primary: {
			main: '#98cc33',
		},
		background: {
			default: '#fff',
			paper: '#f9f9f9',
		},
		default: {
			main: '#fff',
		},
		secondary: {
			main: '#777777',
		},
		border: {
			default: '#dfdfdf',
		},
	},
});
