import Head from 'next/head';
import { Navbar, Seo } from '@linaro-marketing/linaro-mui-web';
import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createCanonical } from '@lib/seo';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import nav from '@content/data/nav';

/**
 * Default Layout component
 * @param {Object} props
 * @component
 */
const Layout = (props) => {
	const { content, title, description, image, pageId, language, dataPayload } = props;
	let openGraphDetails = {
		type: 'website',
		url: createCanonical(pageId, language),
		title: title,
		description: description,
		images: [],
		site_name: 'Linaro.org',
	};
	if (image) {
		openGraphDetails.images.push({
			url: image,
			alt: title,
		});
	}
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<>
			<Seo
				title={title}
				description={description}
				canonical={createCanonical(pageId, language)}
				openGraph={openGraphDetails}
				additionalLinkTags={[
					{
						rel: 'icon',
						href: '/favicon.ico',
					},
					{
						rel: 'preconnect',
						href: 'https://fonts.gstatic.com',
					},
				]}
			/>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
			<CssBaseline />
			<Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
				<Navbar logoLink={'/'} logo={'/static/logo.svg'} pages={nav.pages} />
				<Box
					component="main"
					sx={[
						{
							flexGrow: 1,
							marginTop: '84px',
							marginBottom: '55px',
						},
					]}
				>
					{/* <FlowWrapper content={content} dataPayload={dataPayload} /> */}
				</Box>
				{/* <Footer /> */}
			</Box>
		</>
	);
};
export default Layout;

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string,
	description: PropTypes.string,
	image: PropTypes.string,
	pageId: PropTypes.string,
	fluid: PropTypes.bool,
	removePadding: PropTypes.bool,
	language: PropTypes.string,
};
