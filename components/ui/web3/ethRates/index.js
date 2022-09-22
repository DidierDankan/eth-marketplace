import Image from 'next/image';
import ethImg from 'img/chain/eth.png';
import { useEthPrice } from '@components/web3/useEthPrice';
import { Loader } from '@components/ui/common';

export default function EthRates() {
	const { eth } = useEthPrice();

	return (
		<div className="flex flex-col xs:flex-row text-center">
			<div className="p-6 border drop-shadow rounded-md mr-2">
				<div className="flex items-center justify-center">
					{eth.data ? (
						<>
							<Image
								layout="fixed"
								height="26"
								width="16"
								src={ethImg}
								alt="ether image"
							/>
							<span className="ml-2 text-xl font-bold">= {eth.data}$</span>
						</>
					) : (
						<div className="w-full flex justify-center">
							<Loader size="md" />
						</div>
					)}
				</div>
				<p className="text-lg text-gray-500">Current eth Price</p>
			</div>
			<div className="p-6 border drop-shadow rounded-md">
				<div className="flex items-center justify-center">
					{eth.data ? (
						<>
							<span className="mr-1 text-xl font-bold">{eth.perItem}</span>
							<Image
								layout="fixed"
								height="26"
								width="16"
								src={ethImg}
								alt="ether image"
							/>
							<span className="ml-2 text-xl font-bold">= {eth.itemPrice}$</span>
						</>
					) : (
						<div className="w-full flex justify-center">
							<Loader size="md" />
						</div>
					)}
				</div>
				<p className="text-lg text-gray-500">Price per course</p>
			</div>
		</div>
	);
}
