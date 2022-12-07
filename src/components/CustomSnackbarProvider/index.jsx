import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import i18n from '@i18n/init';
import { SnackbarProvider } from 'notistack';
import PropTypes from 'prop-types';
const useStyles = makeStyles((theme) => ({
	dismissSnackbarButton: {
		color: theme.palette.background.default,
	},
}));
/**
 * Custom SnackbarProvider component
 * @param {props} props
 * @component
 */
const CustomSnackbarProvider = (props) => {
	const { children, notistackRef, ...rest } = props;
	const dismissSnackbar = (key) => () => {
		notistackRef.current.closeSnackbar(key);
	};
	const classes = useStyles();
	return (
		<SnackbarProvider
			ref={notistackRef}
			maxSnack={3}
			autoHideDuration={2000}
			action={(key) => (
				<Button className={classes.dismissSnackbarButton} onClick={dismissSnackbar(key)}>
					{i18n.t('common.dismiss')}
				</Button>
			)}
			{...rest}
		>
			{children}
		</SnackbarProvider>
	);
};
export default CustomSnackbarProvider;
CustomSnackbarProvider.propTypes = {
	children: PropTypes.node.isRequired,
	notistackRef: PropTypes.object.isRequired,
};
