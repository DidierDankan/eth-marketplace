import Address from '@components/home/Address';
import Breadcrumbs from '@components/home/Breadcrumbs';
import CourseCard from '@components/home/CourseCard';
import Currency from '@components/home/Currency';
import Hero from '@components/home/Hero';
import Navbar from '@components/Navbar';
import OrderInfo from '@components/home/OrderInfo';
import Footer from '@components/Footer';

export default function Home() {
	return (
		<div>
			<div className="relative bg-white overflow-hidden">
				<div className="relative max-w-7xl mx-auto px-4">
					<Navbar />
					<div className="fit">
						<Hero />
						<Breadcrumbs />
						<Address />
						<Currency />
						<OrderInfo />
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
