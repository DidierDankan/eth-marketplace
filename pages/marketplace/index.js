import { CourseCard, CourseList } from '@components/ui/course';
import { BaseLayout } from '@components/ui/layout';
import { getAllCourser } from '@content/course/fetcher';
import { useWalletInfo } from '@components/web3/hooks';
import { Button } from '@components/ui/common';
import { OrderModal } from '@components/ui/order';
import { useState } from 'react';
import { WalletHeader } from '@components/ui/marketplace';

export default function Marketplace({ courses }) {
	const { canPurchaseCourse } = useWalletInfo();
	const [seletedCourse, setSelectedCourse] = useState(null);

	const _onPurchase = (order) => {
		alert(JSON.stringify(order));
	};

	return (
		<>
			<WalletHeader />
			<CourseList courses={courses}>
				{(course) => (
					<CourseCard
						key={course.id}
						course={course}
						disable={!canPurchaseCourse}
						Footer={() => (
							<div className="mt-4">
								<Button
									disabled={!canPurchaseCourse}
									onClick={() => setSelectedCourse(course)}
									variant="lightBlue"
								>
									Purchase
								</Button>
							</div>
						)}
					/>
				)}
			</CourseList>

			<OrderModal
				onClose={() => setSelectedCourse(null)}
				onSubmit={_onPurchase}
				course={seletedCourse}
			/>
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
