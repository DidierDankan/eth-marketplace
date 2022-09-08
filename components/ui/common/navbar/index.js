import Link from 'next/link';
import { useWeb3 } from '@components/provider';
import { Button } from '@components/ui/common';
import { useAccount } from '@components/web3/hooks/useAccount';

const Navbar = () => {
	const { connect, isProviderLoaded, isWeb3Loaded } = useWeb3();
	const { account } = useAccount();

	return (
		<section>
			{account}
			<div className="relative pt-6 px-4 sm:px-6 lg:px-8">
				<nav className="relative" aria-label="Global">
					<div className="flex justify-between items-center">
						<div>
							<Link href="/" passHref>
								<a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
									Home
								</a>
							</Link>
							<Link href="/" passHref>
								<a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
									Marketplace
								</a>
							</Link>
							<Link href="/" passHref>
								<a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
									Blogs
								</a>
							</Link>
						</div>
						<div>
							<Link href="/" passHref>
								<a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
									Wishlist
								</a>
							</Link>
							{!isProviderLoaded ? (
								<Button disabled={true} onClick={() => connect()}>
									Loading...
								</Button>
							) : isWeb3Loaded ? (
								<Button onClick={() => connect()}>Connect</Button>
							) : (
								<a
									target="_blank"
									href="https://metamask.io/download/"
									rel="noreferrer"
									className="px-4 py-2 border text-base rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
								>
									Install Metamask
								</a>
							)}
						</div>
					</div>
				</nav>
			</div>
		</section>
	);
};

export default Navbar;
