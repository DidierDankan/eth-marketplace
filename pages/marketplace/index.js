import { CourseCard, CourseList } from '@components/ui/course';
import { BaseLayout } from '@components/ui/layout';
import { getAllCourser } from '@content/course/fetcher';
import { EthRates, Walletbar } from '@components/ui/web3';
import { useWalletInfo } from '@components/web3/hooks';
import { Button } from '@components/ui/common';
import { OrderModal } from '@components/ui/order';
import { useState } from 'react';
import { useEthPrice } from '@components/web3/useEthPrice';

export default function Marketplace({ courses }) {
	const { account, network, canPurchaseCourse } = useWalletInfo();
	const [seletedCourse, setSelectedCourse] = useState(null);
	const { eth } = useEthPrice();

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
			<EthRates ethPrice={eth.data} ethPerItem={eth.perItem} />
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
