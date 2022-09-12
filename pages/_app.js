import { useEffect, useState } from 'react';

import '@styles/globals.css';
import { Loader } from '@components/ui/common';

const Noop = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }) {
	// const [loading, setLoading] = useState(false);

	// useEffect(() => {
	// 	setLoading(true);
	// }, []);

	const Layout = Component.Layout ?? Noop;

	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);

	// return (
	// 	<>
	// 		{loading ? (
	// 			<Layout>
	// 				<Component {...pageProps} />
	// 			</Layout>
	// 		) : (
	// 			<Layout>
	// 				<Loader size="lg" />
	// 			</Layout>
	// 		)}
	// 	</>
	// );
}

export default MyApp;
