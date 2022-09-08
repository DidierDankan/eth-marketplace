import { OrderList } from '@components/order';
import { CourseCard } from '@components/course';
import { Breadcrumbs, Hero } from '@components/common';
import { Walletbar, EthRates } from '@components/web3';
import { BaseLayout } from '@components/layout';
import { getAllCourser } from '@content/course/fetcher';

export default function Home({ courses }) {
	console.log(courses);
	return (
		<div className="overflow-hidden">
			<>
				<Hero />
				{/* <Breadcrumbs />
				<Walletbar />
				<EthRates />
				<OrderList /> */}

				<section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
					{courses.map((c) => (
						<CourseCard
							key={c.id}
							type={c.type}
							title={c.title}
							description={c.description}
							image={c.coverImage}
							slug={c.slug}
						/>
					))}
				</section>
			</>
		</div>
	);
}

export function getStaticProps() {
	const { data } = getAllCourser();
	return {
		props: {
			courses: JSON.parse(JSON.stringify(data)),
		},
	};
}

Home.Layout = BaseLayout;
