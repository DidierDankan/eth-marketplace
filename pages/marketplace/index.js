import { CourseCard, CourseList } from '@components/ui/course';
import { BaseLayout } from '@components/ui/layout';
import { getAllCourser } from '@content/course/fetcher';
import { Walletbar } from '@components/ui/web3';
import { useAccount, useNetwork } from '@components/web3/hooks';

export default function Marketplace({ courses }) {
	const { account } = useAccount();
	const { network } = useNetwork();

	console.log('ACCOUNT', account);

	return (
		<>
			<div className="py-4">
				<Walletbar
					address={account.data}
					isAdmin={account.isAdmin}
					network={{
						isSupported: network.isSupported,
						target: network.target,
						networkName: network.data,
						hasInitialResponse: network.hasInitialResponse,
					}}
				/>
			</div>
			<CourseList courses={courses}>
				{(course) => <CourseCard key={course.id} course={course} />}
			</CourseList>
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
