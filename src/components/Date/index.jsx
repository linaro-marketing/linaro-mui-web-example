import { parseISO, format, formatDistance } from 'date-fns';
import PropTypes from 'prop-types';
import { enGB, fr, de, es, it, ru, zhCN, cy } from 'date-fns/locale';
import i18n from '../../i18n/init';
export const languages = {
	en: enGB,
	fr: fr,
	de: de,
	es: es,
	it: it,
	ru: ru,
	zh: zhCN,
	cy: cy,
};
/**
 * Returns a time element with the date string provided formatted
 * @param {String} dateString The ISO date string to output as a time element in the format
 * @return {Component} A time element with the date formatted as LLLL d, yyyy
 * @component
 */
const DateItem = (props) => {
	const { dateString, type, includeTime } = props;
	const date = parseISO(dateString);
	let formattedDate = null;
	if (type === 'distance') {
		formattedDate = formatDistance(date, new Date(), {
			addSuffix: true,
			locale: Object.hasOwnProperty.call(languages, i18n.language)
				? languages[i18n.language]
				: languages.en,
		});
	} else {
		let formatString = includeTime ? 'do LLL yyyy h:mm a' : 'do LLL yyyy';
		formattedDate = format(date, formatString, {
			locale: Object.hasOwnProperty.call(languages, i18n.language)
				? languages[i18n.language]
				: languages.en,
		});
	}
	return <time dateTime={dateString}>{formattedDate}</time>;
};
export default DateItem;
DateItem.propTypes = {
	dateString: PropTypes.string.isRequired,
	type: PropTypes.string,
	includeTime: PropTypes.bool,
};
