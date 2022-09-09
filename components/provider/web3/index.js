import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider'; //package to set ethereum provider
import Web3 from 'web3';
import { setupHooks } from '@components/web3/hooks/setupHooks';

const Web3Context = createContext(null);

export default function Web3Provider({ children }) {
	const [web3Api, setWeb3Api] = useState({
		provider: null,
		web3: null,
		contract: null,
		isProviderLoaded: false,
	});
	//load web3 provider
	useEffect(() => {
		const loadProvider = async () => {
			const provider = await detectEthereumProvider();

			if (provider) {
				const web3 = new Web3(provider);
				setWeb3Api({
					web3,
					provider,
					contract: null,
					isProviderLoaded: true,
				});
			} else {
				setWeb3Api((prev) => ({
					...prev,
					isProviderLoaded: true,
				})),
					console.error('Please, install Matamask');
			}
		};

		loadProvider();
	}, []);

	//connect to wallet
	const connectMetamask = useMemo(() => {
		const { web3, provider } = web3Api;
		return {
			...web3Api,
			isWeb3Loaded: web3,
			//use to call hooks that depend on web3, we pass web3 as argument
			getHooks: () => setupHooks(web3),
			connect: provider
				? async () => {
						try {
							console.log('does it comes in here');
							await provider.request({ method: 'eth_requestAccounts' });
						} catch {
							location.reload();
						}
				  }
				: () =>
						console.error(
							'Cannot connect to Metamask, try to reload your browser'
						),
		};
	}, [web3Api]);

	return (
		<Web3Context.Provider value={connectMetamask}>
			{children}
		</Web3Context.Provider>
	);
}

export function useWeb3() {
	return useContext(Web3Context);
}

export function useHooks(cb) {
	const { getHooks } = useWeb3();
	return cb(getHooks());
}

// ** cb = callback
