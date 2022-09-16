import Link from 'next/link';
import { useWeb3 } from '@components/provider';
import { Button, ActiveLink } from '@components/ui/common';
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

	return (
		<section>
			<div className="relative pt-6 px-4 sm:px-6 lg:px-8 nav-min-h">
				<nav className="relative" aria-label="Global">
					<div className="flex justify-between items-center">
						<ol className="flex xs:flex-row justify-between items-center">
							<li className="font-medium text-sm lg:text-lg md:text-base mr-4 sm:mr-8 text-gray-500 hover:text-gray-900">
								<ActiveLink href="/" passHref>
									<a>Home</a>
								</ActiveLink>
							</li>
							<li className="font-medium text-sm lg:text-lg md:text-base mr-4 sm:mr-8 text-gray-500 hover:text-gray-900">
								<ActiveLink href="/marketplace" passHref>
									<a>Marketplace</a>
								</ActiveLink>
							</li>

							<li className="font-medium text-sm lg:text-lg md:text-base mr-4 sm:mr-8 text-gray-500 hover:text-gray-900">
								<ActiveLink href="/" passHref>
									<a>Blogs</a>
								</ActiveLink>
							</li>
						</ol>
						<div className="text-center md:flex md:items-center">
							<div className="font-medium text-sm lg:text-lg md:text-base md:mr-8 text-gray-500 hover:text-gray-900">
								<ActiveLink href="/" passHref>
									<a>Wishlist</a>
								</ActiveLink>
							</div>
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
