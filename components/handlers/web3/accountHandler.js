//common use of a fabricated hook

import { useEffect } from 'react';
//React Hooks for Data Fetching
import useSwr from 'swr';

const adminAddresses = {
	//hashed version of portfolio account "fb765b61dfac8bc33fa98ac16686b993e6d84798d6f6c28a6923e276e7e3f345"
	'0xD1d7d20147AD9cb7F60Fc85a3e3a3c8B28728699': true,
};

export const handler = (web3, provider) => () => {
	const { data, mutate, ...swrRes } = useSwr(
		() => {
			//if we dont have a identifier the callback function will not run, we have the identifier if we have web3
			return web3 ? 'web3/accounts' : null;
		},
		//callback function
		async () => {
			const accounts = await web3.eth.getAccounts();
			const account = accounts[0];
			if (!account) {
				throw new Error('Cannot retrieve account, please refresh the browser');
			}
			return account;
		}
	); // will return swrRes.data, swrRes.error

	//this handles the change of address of our portfolio
	useEffect(() => {
		// Sometimes, you want to update a part of your data based on the current data.
		// With mutate, you can pass an async function which will receive the current cached value, if any, and returns an updated document. The SWR object returned by useSWR also contains a mutate() function that is pre-bound to the SWR's key, it does not require the key parameter.
		const mutator = (accounts) => {
			mutate(accounts[0] ?? null);
		};
		window.ethereum && window.ethereum.on('accountsChanged', mutator);

		//clean up function to un-subscribe when changing ACCOUNT
		return () => {
			window.ethereum.removeListener('accountsChanged', mutator);
		};
	}, [mutate]);

	return {
		data: data,
		mutate,
		...swrRes,
		//web3 util to dehash keccak256: web3.utils.keccak256(hashed)
		isAdmin: (data && adminAddresses[data]) ?? false,
	};
};

//this also works
// export const handler = (web3) => () => {
// 	const [account, setAccount] = useState(null);

// 	useEffect(() => {
// 		const getAccount = async () => {
// 			const accounts = await web3.eth.getAccounts();
// 			setAccount(accounts[0]);
// 		};

// 		web3 && getAccount();
// 	}, [web3]);

// 	useEffect(() => {
// 		window.ethereum &&
// 			window.ethereum.on('accountsChanged', (account) => {
// 				setAccount(account[0] ?? null);
// 			});
// 	}, [account]);

// 	return { account };
// };
