import { EthRates, Walletbar } from '@components/ui/web3';
import { Breadcrumbs } from '@components/ui/common';

export default function Header() {
	return (
		<div className="pt-4">
			<Walletbar />
			<EthRates />
			<div className="flex flex-row-reverse py-5 px-4 sm:px-6 lg:px-8">
				<Breadcrumbs />
			</div>
		</div>
	);
}
