import { OwnedCourseCard } from '@components/ui/course';
import { BaseLayout } from '@components/ui/layout';
import { WalletHeader } from '@components/ui/marketplace';
import { Button } from '@components/ui/common';
import { useAccount, useOwnedCourses } from '@components/web3/hooks';
import { getAllCourser } from '@content/course/fetcher';

export default function OwnedCourses({ courses }) {
	const { account } = useAccount();

	const { ownedCourses } = useOwnedCourses(courses, account.data);
	console.log(ownedCourses);

	return (
		<div>
			<WalletHeader />
			<section className="grid grid-cols-1">
				<OwnedCourseCard>
					{/* <Message>
						My custom message!
					</Message> */}
					<Button variant="purple">Watch the course</Button>
				</OwnedCourseCard>
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
