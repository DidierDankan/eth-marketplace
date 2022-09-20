import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider'; //package to set ethereum provider
import Web3 from 'web3';
import { setupHooks } from '@components/web3/hooks/setupHooks';
import { loadContract } from '@utils/loadContract';

const Web3Context = createContext(null);

const createWeb3State = ({ provider, web3, contract, isProviderLoaded }) => {
	return {
		provider,
		web3,
		contract,
		isProviderLoaded,
		//use to call hooks that depend on web3, we pass web3 as argument
		hooks: setupHooks({ provider, web3, contract }),
	};
};

const setListener = (provider) => {
	provider.on('chainChanged', (_) => window.location.reload());
};

export default function Web3Provider({ children }) {
	const [web3Api, setWeb3Api] = useState(
		createWeb3State({
			web3: null,
			provider: null,
			contract: null,
			isProviderLoaded: false,
		})
	);
	//load web3 provider
	useEffect(() => {
		const loadProvider = async () => {
			const provider = await detectEthereumProvider();

			if (provider) {
				const web3 = new Web3(provider);
				const contract = await loadContract('Marketplace', web3);
				//make the window reload wenever changing network on metamask
				setListener(provider);
				setWeb3Api(
					createWeb3State({
						web3,
						provider,
						contract: contract,
						isProviderLoaded: true,
					})
				);
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
			isWeb3Loaded: web3 != null,
			connect: provider
				? async () => {
						try {
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

//use to call hooks that depend on web3, we pass web3 as argument
export function useHooks(cb) {
	const { hooks } = useWeb3();
	return cb(hooks);
}

// ** cb = callback
