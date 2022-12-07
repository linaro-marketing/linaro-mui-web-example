import React from 'react';
import { Navbar } from '@linaro-marketing/linaro-mui-web';
import nav from '@content/data/nav';
const Page = () => {
	return (
		<>
			<Navbar logoLink={'/'} logo={'/static/logo.svg'} pages={nav.pages} />
		</>
	);
};
export default Page;
