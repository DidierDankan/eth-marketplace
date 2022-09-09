import { useEffect } from 'react';
import EnumNetworks from 'enum/chainNetworkName';
import useSwr from 'swr';

export const handler = (web3) => () => {
	const { data, mutate, ...swrRes } = useSwr(
		() => {
			return web3 ? 'web3/network' : null;
		},
		async () => {
			//get current chain
			const netId = await web3.eth.getChainId();
			return EnumNetworks[netId].name;
		}
	);
	useEffect(() => {
		//mutate state when changed so it refresh without reloading page
		window.ethereum &&
			window.ethereum.on('chainChanged', (chainId) => {
				mutate(EnumNetworks[parseInt(chainId, 16)].name);
			});
	}, [mutate]);

	return {
		network: {
			data: data,
			mutate,
			...swrRes,
		},
	};
};
