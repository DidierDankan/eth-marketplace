import { OrderList } from '@components/order';
import { CourseCard } from '@components/course';
import { Footer, Navbar, Breadcrumbs, Hero } from '@components/common';
import { Walletbar, EthRates } from '@components/web3';

export default function Home() {
	return (
		<div>
			<div className="relative bg-white overflow-hidden">
				<div className="relative max-w-7xl mx-auto px-4">
					<Navbar />
					<div className="fit">
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
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
}
