/**
 @module Language
*/
import { languages, defaultLanguage } from '../i18n/config';
import i18next from 'i18next';
import { detectionOptions } from '../i18n/init';
/**
 * Fetch the current languages which are supported by the app.
 * @function
 * @return {Array}     Returns an Array of the current supported languages.
 */
export function getSortedLangsData() {
	return Object.keys(languages); // languages;
}
/**
 * Helper function to prepend the current language to a URL.
 * @function
 * @param  {String} path The path to prepend the current language slug to.
 * @return {String}     The prepended i18n path for use in Link/Router paths
 */
export function prependPath(path) {
	const currentLanguage = i18next.language;
	return `/${currentLanguage}${path}`;
}
/**
 * Helper function to strip the lang from the URL and return the route with no locale
 * @function
 * @returns {String} The path with no lang
 */
export function pathWithoutLang(path) {
	let splitPath = path.split(i18next.language);
	return splitPath[1];
}
/**
 * Creates an array of the current language slugs for use in the getStaticPaths for [lang]/index.js
 * @function
 * @return {Array}     Returns and array of objects representing the current language slugs
 */
export function getAllLanguageSlugs() {
	// eslint-disable-next-line no-unused-vars
	return Object.keys(languages).map((value, _index) => {
		return { params: { lang: value } };
	});
}
/**
 * Gets the current language in use.
 * @function
 * @return {String}     The current language in use
 */
export function getLang() {
	console.log('getLang');
	console.log(i18next.language);
	return i18next.language.substring(0, 2);
}
/**
 * Gets a valid language based on i18n locale code
 * Checks to see if the language exists and if not, returns the default lang.
 * @function
 * @param  {String} lang The potential language
 * @return {Number}     The valid language code
 */
export function getLanguage(lang) {
	return Object.keys(languages).includes(lang) ? lang : defaultLanguage;
}
/**
 * Gets the i18n language code to use with i18next
 * @function
 * @param  {Object} req The request object to retrieve the language from.
 * @return {Number}     The i18n lang shortcode
 */
export function getLanguageFromRequest(req) {
	return req.cookies[detectionOptions['lookupCookie']]
		? req.cookies[detectionOptions['lookupCookie']]
		: req.url.split('/')[1].split('/')[0];
}
