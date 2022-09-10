import Link from 'next/link';
import links from '@helpers/walletLinks';
import { ActiveLink } from '@components/ui/common';

const Breadcrumbs = () => {
	return (
		<nav aria-label="breadcrumb">
			<ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
				{links.map((link, index) => {
					return (
						<li
							key={link + index}
							className={`${
								index === 0 ? 'pr-4' : 'px-4'
							} font-medium mr-2 text-gray-500 hover:text-gray-900`}
						>
							<ActiveLink href={link.href} passHref>
								<a>{link.text}</a>
							</ActiveLink>
						</li>
					);
				})}
			</ol>
		</nav>
	);
};

export default Breadcrumbs;
