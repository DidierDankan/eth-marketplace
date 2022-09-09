import { CourseList } from '@components/ui/course';
import { BaseLayout } from '@components/ui/layout';
import { getAllCourser } from '@content/course/fetcher';
import { Walletbar } from '@components/ui/web3';
import { useAccount } from '@components/web3/hooks/useAccount';
import { useNetwork } from '@components/web3/hooks/useNetwork';

export default function Marketplace({ courses }) {
	const { account, isAdmin } = useAccount();
	const { network } = useNetwork();

	return (
		<>
			<div className="py-4">
				<Walletbar
					address={account.data}
					isAdmin={isAdmin}
					networkName={network.data}
				/>
			</div>
			<CourseList courses={courses} />
			{/* <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
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
			</section> */}
		</>
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

Marketplace.Layout = BaseLayout;
