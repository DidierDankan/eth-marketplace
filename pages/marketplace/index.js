import { CourseCard, CourseList } from '@components/ui/course';
import { BaseLayout } from '@components/ui/layout';
import { getAllCourser } from '@content/course/fetcher';
import { useWalletInfo } from '@components/web3/hooks';
import { Button, Loader } from '@components/ui/common';
import { OrderModal } from '@components/ui/order';
import { useState } from 'react';
import { WalletHeader } from '@components/ui/marketplace';
import { useWeb3 } from '@components/provider';
import { useOwnedCourses } from '@components/web3/hooks';
import { STATE_COLORS } from '@helpers/stateColor';

export default function Marketplace({ courses }) {
	const { web3, contract } = useWeb3();
	const { account, hasConnectedWallet, isConnecting, network } =
		useWalletInfo();
	const [seletedCourse, setSelectedCourse] = useState(null);
	const { ownedCourses } = useOwnedCourses(courses, account.data, network.data);

	const _onPurchase = async (order) => {
		const hexCourseId = web3.utils.utf8ToHex(seletedCourse.id);

		//courseIdHex + account address
		const orderHash = web3.utils.soliditySha3(
			{
				type: 'bytes16',
				value: hexCourseId,
			},
			{ type: 'address', value: account.data }
		);

		const emailHash = web3.utils.sha3(order.email);
		//emailHash + orderHash
		const proof = web3.utils.soliditySha3(
			{
				type: 'bytes32',
				value: emailHash,
			},
			{ type: 'bytes32', value: orderHash }
		);

		const price = web3.utils.toWei(String(order.price));

		try {
			await contract.methods
				.purchaseCourse(hexCourseId, proof)
				.send({ from: account.data, value: price });
		} catch {
			console.log('Purchase course: Operation has failed!');
		}
	};

	return (
		<>
			<WalletHeader />
			<CourseList courses={courses}>
				{(course) => (
					<CourseCard
						key={course.id}
						course={course}
						disabled={!hasConnectedWallet}
						Footer={() => {
							if (isConnecting) {
								return (
									<div className="mt-4">
										<Button disabled={!hasConnectedWallet} variant="lightBlue">
											<Loader size="sm" />
										</Button>
									</div>
								);
							}

							const owned = ownedCourses.lookup[course.id];
							const stateColor = STATE_COLORS[owned?.state];

							if (owned) {
								return (
									<div className="mt-4 flex items-center">
										<Button disabled={true} variant="green">
											Owned
										</Button>
										<span
											className={`text-xs text-${stateColor}-800 bg-${stateColor}-200 rounded p-1 ml-2`}
										>
											{owned?.state}
										</span>
									</div>
								);
							}

							return (
								<div className="mt-4">
									<Button
										disabled={!hasConnectedWallet}
										onClick={() => setSelectedCourse(course)}
										variant="lightBlue"
									>
										Purchase
									</Button>
								</div>
							);
						}}
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
