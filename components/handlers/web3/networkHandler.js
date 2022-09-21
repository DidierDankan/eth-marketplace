import EnumNetworks from 'enum/chainNetworkName';
import useSwr from 'swr';

const targetNetwork = EnumNetworks[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID];

export const handler = (web3) => () => {
	const { data, ...swrRes } = useSwr(
		() => {
			return web3 ? 'web3/network' : null;
		},
		async () => {
			//get current chainId
			const chainId = await web3.eth.getChainId();
			console.log('CHAIN ID', chainId);

			if (!chainId) {
				throw new Error('Cannot retrieve network, please refresh the browser');
			}

			return EnumNetworks[chainId].name;
		}
	);

	return {
		data: data,
		target: targetNetwork.name,
		isSupported: data === targetNetwork.name,
		...swrRes,
	};
};
