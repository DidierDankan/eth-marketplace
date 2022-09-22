const HDWalletProvider = require('@truffle/hdwallet-provider');
const keys = require('./keys.json');

module.exports = {
	contracts_build_directory: './public/contracts',
	networks: {
		development: {
			host: '127.0.0.1', // Localhost (default: none)
			port: 7545, // Standard Ethereum port (default: none)
			network_id: '*', // Any network (default: none)
		},
		//config for ropsten test net
		ropsten: {
			// must be a thunk, otherwise truffle commands may hang in CI
			provider: () =>
				new HDWalletProvider({
					mnemonic: {
						//cant share this with no one
						phrase: keys.MNEMONIC,
					},
					providerOrUrl: `wss://ropsten.infura.io/ws/v3/${keys.INFURA_PROJECT_ID}`,
					//choosing the first account in our wallet
					addressIndex: 0,
				}),
			network_id: 3,
			gas: 5500000, // Gas limit, how much gas wer willing to spent. if gas used is less, the rest will return to address
			gasPrice: 20000000000, // How much we are willing to spent for unit of gas (20 gwei)
			confirmations: 2, // number of blocks to wait between deployement
			networkCheckTimeout: 1000000,
			timeoutBlocks: 200, // number of blockas before deployment times out
		},
		//ethereum mainet
		live: {
			// must be a thunk, otherwise truffle commands may hang in CI
			provider: () =>
				new HDWalletProvider({
					mnemonic: {
						//cant share this with no one
						phrase: keys.MNEMONIC,
					},
					providerOrUrl: `wss://mainet.infura.io/ws/v3/${keys.INFURA_PROJECT_ID}`,
					//choosing the first account in our wallet
					addressIndex: 0,
				}),
			network_id: 1,
			gas: 2500000, // Gas limit, how much gas wer willing to spent. if gas used is less, the rest will return to address
			gasPrice: 710000000000, // How much we are willing to spent for unit of gas (20 gwei)
			confirmations: 2, // number of blocks to wait between deployement
			networkCheckTimeout: 1000000,
			timeoutBlocks: 200, // number of blockas before deployment times out
			skipDryRun: true,
		},
	},
	compilers: {
		solc: {
			version: '0.8.16', // Fetch exact version from solc-bin (default: truffle's version)
		},
	},
};
