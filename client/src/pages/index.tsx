import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Main } from '../components/Main';
import { WrapRootElement } from '../WrapRootElement';

const IndexPage = () => {
	return (
		<WrapRootElement>
			<BrowserRouter>
				<Main />
			</BrowserRouter>
			{/* <SEO /> */}
		</WrapRootElement>
	);
};

export default IndexPage;
