import imgBnb from '@img/crypto/bnb.png';
import imgEth from '@img/crypto/eth.png';
import imgRky from '@img/crypto/rinkeby.png';
import imgPol from '@img/crypto/polygon.png';
import imgGan from '@img/crypto/ganache.png';

const EnumNetworks = {
	56: {
		image: imgBnb,
		name: 'Binance Smart Chain',
	},
	4: {
		image: imgRky,
		name: 'Rinkeby test network',
	},
	137: {
		image: imgPol,
		name: 'Polygon',
	},
	1: {
		image: imgEth,
		name: 'Ethereum mainnet',
	},
	97: {
		image: imgBnb,
		name: 'Binance Smart Chain - Tesnet',
	},
	1337: {
		image: imgGan,
		name: 'Ganache',
	},
};
export default EnumNetworks;
