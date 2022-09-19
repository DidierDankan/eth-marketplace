import { useEffect } from 'react';
import EnumNetworks from 'enum/chainNetworkName';
import useSwr from 'swr';

const targetNetwork = EnumNetworks[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID];

export const handler = (web3, provider) => () => {
	const { data, mutate, ...swrRes } = useSwr(
		() => {
			return web3 ? 'web3/network' : null;
		},
		async () => {
			//get current chainId
			const chainId = await web3.eth.getChainId();

			if (!chainId) {
				throw new Error('Cannot retrieve network, please refresh the browser');
			}

			return EnumNetworks[chainId].name;
		}
	);
	useEffect(() => {
		const mutator = (chainId) => {
			mutate(EnumNetworks[parseInt(chainId, 16)].name);
		};
		//mutate state when changed so it refresh without reloading page
		window.ethereum && window.ethereum.on('chainChanged', mutator);

		//clean up function to un-subscribe when changing NETWORK
		return () => {
			window.ethereum.removeListener('chainChanged', mutator);
		};
	}, [mutate]);

	return {
		data: data,
		mutate,
		target: targetNetwork.name,
		isSupported: data === targetNetwork.name,
		...swrRes,
	};
};
