import Image from 'next/image';
import ethImg from 'img/chain/eth.png';
import { useEthPrice } from '@components/web3/useEthPrice';
import { Loader } from '@components/ui/common';

const EthRates = () => {
	const { eth } = useEthPrice();
	return (
		<div className="grid grid-cols-4">
			<div className="flex flex-1 items-stretch text-center">
				<div className="p-10 border drop-shadow rounded-md">
					{!eth.data ? (
						<Loader />
					) : (
						<div className="flex items-center">
							<Image
								layout="fixed"
								width="16"
								height="26"
								src={ethImg}
								alt="eth"
							/>
							<span className=" ml-2 text-2xl font-bold"> = {eth.data}$</span>
						</div>
					)}
					<p className="text-xl text-gray-500">Current eth Price</p>
				</div>
			</div>
			<div className="flex flex-1 items-stretch text-center">
				<div className="p-10 border drop-shadow rounded-md">
					{!eth.data ? (
						<Loader />
					) : (
						<div className="flex items-center">
							<span className="text-2xl font-bold mr-2">{eth.perItem}</span>
							<Image
								layout="fixed"
								width="16"
								height="26"
								src={ethImg}
								alt="eth"
							/>
							<span className="ml-2 text-2xl font-bold">= 15$</span>
						</div>
					)}
					<p className="text-xl text-gray-500">Price per course</p>
				</div>
			</div>
		</div>
	);
};

export default EthRates;
