import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/@Layouts/Default';
import { getContent } from '../lib/content';
import i18n from '../i18n/init';
/**
 * Acts as a redirect for directing users to the current
 * i18n subpath
 */
export default function Home({ content, language }) {
	const router = useRouter();
	useEffect(() => {
		const { pathname } = router;
		if (pathname == '/') {
			router.push('/' + i18n.language.substring(0, 2));
		}
	});
	return (
		<>
			<Layout
				fluid={true}
				removePadding
				content={content}
				pageId={''}
				language={language}
				title={content.title}
				description={content.description}
			/>
		</>
	);
}

export const getStaticProps = async ({ req, context }) => {
	let content = await getContent('index', 'en');
	return {
		props: {
			language: 'en',
			content,
		},
	};
};
