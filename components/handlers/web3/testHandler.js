import { useEffect, useState } from 'react';

export const handler = (web3) => () => {
	const [test, setTesting] = useState(null);

	useEffect(() => {
		const testing = () => {
			setTesting('testing');
		};

		web3 && testing();
	}, [web3]);

	return { test };
};
