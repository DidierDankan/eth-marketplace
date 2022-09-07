import { OrderList } from '@components/order';
import { CourseCard } from '@components/course';
import { Breadcrumbs, Hero } from '@components/common';
import { Walletbar, EthRates } from '@components/web3';
import { BaseLayout } from '@components/layout';

export default function Home() {
	return (
		<div className="overflow-hidden">
			<>
				<Hero />
				<Breadcrumbs />
				<Walletbar />
				<EthRates />
				<OrderList />
				<section className="grid grid-cols-2 gap-4 mb-5">
					{Array.from({ length: 4 }).map((_, i) => (
						<CourseCard key={i + 'a'} />
					))}
				</section>
			</>
		</div>
	);
}

Home.Layout = BaseLayout;
