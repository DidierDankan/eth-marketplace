import Link from 'next/link';
import { useWeb3 } from '@components/provider';
import { useWalletInfo } from '@components/web3/hooks';
import { Button } from '@components/ui/common';

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
				<h1 className="text-base xs:text-xl">
					Hello,{' '}
					{account.data &&
						`${
							account.data.substr(0, 5) +
							'...' +
							account.data.substr(account.data.length - 5, account.data.length)
						}`}
				</h1>
				<h2 className="subtitle mb-5 text-sm xs:text-base">
					I hope you are having a great day!
				</h2>
				<div className="flex justify-between items-center">
					<div className="sm:flex sm:justify-center lg:justify-start">
						<Button variant="white" className="mr-2 text-sm xs:text-lg p-2">
							Learn how to purchase
						</Button>
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

						{!isWeb3Loaded && !network.hasInitialResponse && (
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
