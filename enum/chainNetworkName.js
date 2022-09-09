import imgBnb from '@img/crypto/bnb.png';
import imgEth from '@img/crypto/eth.png';
import imgRky from '@img/crypto/rinkeby.png';
import imgPol from '@img/crypto/polygon.png';
import imgGan from '@img/crypto/ganache.png';

const EnumNetworks = {
	56: {
		image: imgBnb,
		name: 'Binance Smart Chain',
		decimals: 18,
	},
	4: {
		image: imgRky,
		name: 'Rinkeby test network',
		decimals: 18,
	},
	137: {
		image: imgPol,
		name: 'Polygon',
		decimals: 18,
	},
	1: {
		image: imgEth,
		name: 'Ethereum mainnet',
		decimals: 18,
	},
	97: {
		image: imgBnb,
		name: 'Binance Smart Chain - Tesnet',
		decimals: 18,
	},
	1337: {
		image: imgGan,
		name: 'Ganache',
		decimals: 18,
	},
};
export default EnumNetworks;
