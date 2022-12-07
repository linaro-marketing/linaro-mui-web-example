/**
 * Returns the full page title
 *
 * @function
 * @param {string} title - the page title
 * @returns {string} - the full page title.
 */
export const prependPageTitle = (title) => {
	return `${title} - Linaro Resources Hub`;
};
/**
 * Check if the userAgent of the current client is a spider based on a list
 * of known spider/crawler user agent strings.
 *
 * @returns
 */
export const userAgentIsBot = () => {
	try {
		console.log('Checking User Agent: ', navigator.userAgent);
		return isbot(navigator.userAgent);
	} catch (err) {
		console.log('Error checking user agent', err);
		return false;
	}
};
/**
 * Returns a full canonical URL for the current page.
 * @param {String} pageId The part of the URL after the language code.
 * @param {String} language The lang shortcode used in the URL
 * @returns
 */
export const createCanonical = (pageId, language) => {
	let siteUrl = process.env.NEXT_PUBLIC_SITE_URL.endsWith('/')
		? process.env.NEXT_PUBLIC_SITE_URL.slice(0, -1)
		: process.env.NEXT_PUBLIC_SITE_URL;
	return siteUrl + '/' + language + '/' + pageId;
};
