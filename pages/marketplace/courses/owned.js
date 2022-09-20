import Link from 'next/link';
import { OwnedCourseCard } from '@components/ui/course';
import { BaseLayout } from '@components/ui/layout';
import { WalletHeader } from '@components/ui/marketplace';
import { Button, Message } from '@components/ui/common';
import { useOwnedCourses, useWalletInfo } from '@components/web3/hooks';
import { getAllCourser } from '@content/course/fetcher';

export default function OwnedCourses({ courses }) {
	const { account, network } = useWalletInfo();

	const { ownedCourses } = useOwnedCourses(courses, account.data, network.data);

	return (
		<div>
			<WalletHeader />
			<section className="grid grid-cols-1">
				{ownedCourses.isEmpty && (
					<div>
						<Message type="warning">
							<span>You don&apos;t have any courses </span>
							<Link href="/marketplace" passHref>
								<a className="font-normal hover:underline">
									<i>Browse courses</i>
								</a>
							</Link>
						</Message>
					</div>
				)}
				{account.isEmpty && (
					<Message type="warning">Please connect to Metamask</Message>
				)}
				{ownedCourses.data?.map((course) => {
					return (
						<OwnedCourseCard key={course.id} course={course}>
							<Button variant="purple">Watch the course</Button>
						</OwnedCourseCard>
					);
				})}
			</section>
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

OwnedCourses.Layout = BaseLayout;
