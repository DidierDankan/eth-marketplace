import links from '@helpers/walletLinks';
import { ActiveLink } from '@components/ui/common';
import { useAccount } from '@components/web3/hooks';
import React from 'react';

const Breadcrumbs = () => {
	const { account } = useAccount();
	return (
		<nav aria-label="breadcrumb">
			<ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
				{links.map((link, index) => (
					<React.Fragment key={link + index}>
						{!link.requireAdmin && (
							<li
								className={`${
									index === 0 ? 'pr-4' : 'px-4'
								} font-medium mr-2 text-gray-500 hover:text-gray-900`}
							>
								<ActiveLink href={link.href} passHref>
									<a>{link.text}</a>
								</ActiveLink>
							</li>
						)}
						{link.requireAdmin && account.isAdmin && (
							<li
								className={`${'px-4'} font-medium mr-2 text-gray-500 hover:text-gray-900`}
							>
								<ActiveLink href={links[2].href} passHref>
									<a>{links[2].text}</a>
								</ActiveLink>
							</li>
						)}
					</React.Fragment>
				))}
			</ol>
		</nav>
	);
};

export default Breadcrumbs;
