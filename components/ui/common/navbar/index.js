import Link from 'next/link';
import { useWeb3 } from '@components/provider';
import { Button } from '@components/ui/common';
import { useRouter } from 'next/router';
import { useAccount } from '@components/web3/hooks';

const Navbar = () => {
	const { connect, isProviderLoaded, isWeb3Loaded } = useWeb3();
	const { account } = useAccount();
	const router = useRouter();

	const hideAddress = () => {
		if (router.asPath.includes('/marketplace')) {
			return true;
		}

		return false;
	};

	console.log('what does it returns', hideAddress());

	return (
		<section>
			<div className="relative pt-6 px-4 sm:px-6 lg:px-8">
				<nav className="relative" aria-label="Global">
					<div className="flex justify-between items-center">
						<div>
							<Link href="/" passHref>
								<a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
									Home
								</a>
							</Link>

							<Link href="/marketplace" passHref>
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
								<Button
									variant={'purple'}
									disabled={true}
									onClick={() => connect()}
								>
									Loading...
								</Button>
							) : isWeb3Loaded ? (
								!account.data ? (
									<Button variant={'purple'} onClick={() => connect()}>
										Connect
									</Button>
								) : (
									!hideAddress() && (
										<Button
											variant={account.isAdmin ? 'green' : 'purple'}
											className={'cursor-default'}
										>
											{`${
												account.data.substr(0, 5) +
												'...' +
												account.data.substr(
													account.data.length - 5,
													account.data.length
												)
											}`}
										</Button>
									)
								)
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
