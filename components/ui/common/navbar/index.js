import Link from 'next/link';

const Navbar = () => {
	return (
		<section>
			<div className="relative pt-6 px-4 sm:px-6 lg:px-8">
				<nav className="relative" aria-label="Global">
					<div className="flex justify-between">
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

							<a
								href="#"
								className="px-4 py-2 border text-base rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
							>
								Connect
							</a>
						</div>
					</div>
				</nav>
			</div>
		</section>
	);
};

export default Navbar;
