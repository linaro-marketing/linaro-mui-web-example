import Layout from '@components/@Layouts/Default';
import { getAllLanguageSlugs } from '@lib/lang';
import { getContent } from '@lib/content';
import i18n from '@i18n/init';
/**
 * Home page component
 * @param {Object} props
 * @component
 */
export default function Page(props) {
	let { content, language, pageId } = props;
	return (
		<Layout
			image={content.image}
			pageId={pageId}
			content={content}
			language={language}
			title={content.title}
			description={content.description}
		/>
	);
}
export async function getStaticPaths() {
	const paths = getAllLanguageSlugs();
	return {
		paths,
		fallback: false,
	};
}
export const getStaticProps = async ({ req, context }) => {
	let content = await getContent('index', 'en');
	return {
		props: {
			language: 'en',
			pageId: '/',
			content,
		},
	};
};
