import Link from 'next/link';
import { useWeb3 } from '@components/provider';
import { useWalletInfo } from '@components/web3/hooks';

const Walletbar = () => {
	const { isWeb3Loaded } = useWeb3();
	const { account, network } = useWalletInfo();

	const adminColorAddress = () => {
		if (account.isAdmin) {
			return 'bg-green-500';
		}

		return 'bg-indigo-600';
	};
	return (
		<section className={`text-white ${adminColorAddress()} rounded-lg`}>
			<div className="p-8">
				<h1 className="text-2xl">
					Hello,{' '}
					{account.data &&
						`${
							account.data.substr(0, 5) +
							'...' +
							account.data.substr(account.data.length - 5, account.data.length)
						}`}
				</h1>
				<h2 className="subtitle mb-5 text-xl">
					I hope you are having a great day!
				</h2>
				<div className="flex justify-between items-center">
					<div className="sm:flex sm:justify-center lg:justify-start">
						<div className="rounded-md shadow">
							<a
								href="#"
								className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
							>
								Learn how to purchase
							</a>
						</div>
					</div>
					<div>
						{network.hasInitialResponse && !network.isSupported && (
							<div className="bg-red-400 p-4 rounded-lg">
								<div>Connected to wrong Network</div>
								<div>
									Connect to:{' '}
									<strong className="text-xl">{network.target}</strong>
								</div>
							</div>
						)}

						{!isWeb3Loaded && network.hasInitialResponse && (
							<Link href="https://metamask.io/download/" passref>
								<a target="_blank" rel="noreferrer">
									<div className="bg-yellow-500 p-4 rounded-lg">
										Cannot connect to network. Please, install Metamask
									</div>
								</a>
							</Link>
						)}
						{network.data && (
							<div>
								<span>Currently on </span>
								<strong className="text-2xl">{network.data}</strong>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Walletbar;
