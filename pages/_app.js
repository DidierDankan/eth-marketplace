import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '@styles/globals.css';

const Noop = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		Array.from(
			document.querySelectorAll('head > link[rel="stylesheet"][data-n-p]')
		).forEach((node) => {
			node.removeAttribute('data-n-p');
		});
		const mutationHandler = (mutations) => {
			mutations.forEach(({ target }) => {
				if (target.nodeName === 'STYLE') {
					if (target.getAttribute('media') === 'x') {
						target.removeAttribute('media');
					}
				}
			});
		};
		const observer = new MutationObserver(mutationHandler);
		observer.observe(document.head, {
			subtree: true,
			attributeFilter: ['media'],
		});
		return () => {
			observer.disconnect();
		};
	}, []);

	const Layout = Component.Layout ?? Noop;

	return (
		<Layout>
			<ToastContainer />
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
