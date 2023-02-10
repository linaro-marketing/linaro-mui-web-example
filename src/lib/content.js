import { defaultLanguage, languages } from '../i18n/config';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Gets a repeated section by name and lang
 * @param {String} name Name of the section e.g 'bottom_cta'
 * @param {String} lang The lang to get the section of.
 * @returns
 */
const getRepeatedSection = async (name, lang) => {
	const contentDirectory = path.join(process.cwd(), 'src/content/sections');
	const fullPath = path.join(contentDirectory, `${name}.md`);
	let fileName = name + '.md';
	let finalPath = fullPath;
	if (lang !== defaultLanguage) {
		let localePath = path.join(contentDirectory, '/_i18n', lang, fileName);
		if (fs.existsSync(localePath)) {
			finalPath = localePath;
		}
	}
	const fileContents = fs.readFileSync(finalPath, 'utf8');
	// Use gray-matter to parse the post metadata section
	const matterResult = matter(fileContents);
	return matterResult.data.flow;
};
/**
 * Loops over flow row sections and gets any repeated sections added.
 * @param {Object} matterData The matter data object.
 * @param {String} lang The current lang.
 * @returns
 */
const processFlow = async (matterData, lang) => {
	let matterResultWithRepeatedSections = { ...matterData };
	let newFlowRows = [];
	let nonRepeatedSections = ['container_row'];
	if (Object.prototype.hasOwnProperty.call(matterResultWithRepeatedSections, 'flow')) {
		for (let flowRow of matterResultWithRepeatedSections.flow) {
			let newFlowRow = { ...flowRow };
			if (!nonRepeatedSections.includes(flowRow.row)) {
				let newRowContent = await getRepeatedSection(flowRow.row, lang);
				newFlowRow = { ...newRowContent[0] };
			}
			newFlowRows.push(newFlowRow);
		}
	}
	matterResultWithRepeatedSections.flow = newFlowRows;
	return matterResultWithRepeatedSections;
};
/**
 * Fetches the post data for a given id.
 * @param  {String} id The id of a post to fetch data for.
 * @return {Object}     The post data object
 */
export async function getContent(
	id,
	lang,
	directory = 'content/pages/',
	category = null,
	processFiles = false,
) {
	const contentDirectory = path.join(process.cwd(), directory);
	const fullPath = path.join(contentDirectory, `${id}.md`);
	let fileName = id + '.md';
	console.log('File Name: ', fileName);
	console.log('Lang: ', lang);
	let finalPath = fullPath;
	if (lang !== defaultLanguage) {
		let localePath = path.join(contentDirectory, '/_i18n', lang, fileName);
		if (fs.existsSync(localePath)) {
			finalPath = localePath;
		}
	}
	const fileContents = fs.readFileSync(finalPath, 'utf8');

	// Use gray-matter to parse the post metadata section
	const matterResult = matter(fileContents);
	if (category) {
		if (matterResult.data.category !== category) {
			return null;
		}
	}
	let contentHtml = matterResult.content;
	let matterData = matterResult.data;
	if (Object.prototype.hasOwnProperty.call(matterData, 'flow')) {
		matterData = await processFlow(matterData, lang);
	}
	if (processFiles) {
		let processedMatterResult = await processFrontMatter(matterData);
		matterData = processedMatterResult;
	}
	if (Object.prototype.hasOwnProperty.call(matterData, 'date')) {
		if (typeof matterData.date === Date) {
			matterData.date = matterData.date.toISOString();
		} else {
			matterData.date = new Date(matterData.date).toISOString();
		}
	}
	if (Object.prototype.hasOwnProperty.call(matterData, 'author')) {
		let authorDetails = await getAuthorDetails(matterData.author, 'src/content/authors/');
		matterData.authorDetails = authorDetails;
	}
	let normalizedDirectory = directory.endsWith('/') ? directory.slice(0, -1) : directory;
	let contentReturnObject = {
		id,
		contentHtml,
		...matterData,
		pageType: normalizedDirectory.split('/').slice(-1)[0],
	};
	console.log('Content Return Object: ', contentReturnObject);
	// Combine the data with the id and contentHtml
	return contentReturnObject;
}
