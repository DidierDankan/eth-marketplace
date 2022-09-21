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
	},
	compilers: {
		solc: {
			version: '0.8.16', // Fetch exact version from solc-bin (default: truffle's version)
		},
	},
};

// transaction hash: 0x679161de776e35d9214d34b6f575dd26fdfd2a165e4ec6f4346d54250ab7ae6f
// contract address:    0xba4bb0152E004149390F4712Ab55Eaf179bCE933
// account:             0x45b5F53aD37503ffd60188D00428c91E0dCb9544

// GANACHE ENV
// NEXT_PUBLIC_TARGET_CHAIN_ID=1337
// NEXT_PUBLIC_NETWORK_ID=5777
