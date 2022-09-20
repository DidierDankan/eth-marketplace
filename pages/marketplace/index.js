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

export default function Marketplace({ courses }) {
	const { web3, contract } = useWeb3();
	const { account, hasConnectedWallet, isConnecting } = useWalletInfo();
	const [seletedCourse, setSelectedCourse] = useState(null);
	const [isNewPurchase, setIsNewPurchase] = useState(true);
	const { ownedCourses } = useOwnedCourses(courses, account.data);

	const _onPurchase = async (order) => {
		const hexCourseId = web3.utils.utf8ToHex(seletedCourse.id);

		//courseIdHex + account address
		const courseHash = web3.utils.soliditySha3(
			{
				type: 'bytes16',
				value: hexCourseId,
			},
			{ type: 'address', value: account.data }
		);

		const price = web3.utils.toWei(String(order.price));

		if (isNewPurchase) {
			const emailHash = web3.utils.sha3(order.email);
			//emailHash + courseHash
			const proof = web3.utils.soliditySha3(
				{
					type: 'bytes32',
					value: emailHash,
				},
				{ type: 'bytes32', value: courseHash }
			);
			_purchaseCourse(hexCourseId, proof, price);
		} else {
			_repurchaseCourse(courseHash, price);
		}
	};

	const _purchaseCourse = async (hexCourseId, proof, price) => {
		try {
			await contract.methods
				.purchaseCourse(hexCourseId, proof)
				.send({ from: account.data, value: price });
		} catch {
			console.log('Purchase course: Operation has failed!');
		}
	};

	const _repurchaseCourse = async (courseHash, price) => {
		try {
			await contract.methods
				.repurchasedCourse(courseHash)
				.send({ from: account.data, value: price });
		} catch {
			console.log('Purchase course: Operation has failed!');
		}
	};

	return (
		<>
			<WalletHeader />
			<CourseList courses={courses}>
				{(course) => {
					const owned = ownedCourses.lookup[course.id];
					return (
						<CourseCard
							key={course.id}
							course={course}
							state={owned?.state}
							disabled={!hasConnectedWallet}
							Footer={() => {
								if (isConnecting) {
									return (
										<div className="mt-4">
											<Button
												size="sm"
												disabled={!hasConnectedWallet}
												variant="lightBlue"
											>
												<Loader size="sm" />
											</Button>
										</div>
									);
								}

								if (owned) {
									return (
										<div className="mt-4 flex items-center">
											{owned?.state === 'deactivated' ? (
												<Button
													size="sm"
													disabled={false}
													onClick={() => {
														setIsNewPurchase(false);
														setSelectedCourse(course);
													}}
													variant="lightBlue"
												>
													Fund to Activate
												</Button>
											) : (
												<Button size="sm" disabled={true} variant="green">
													Owned
												</Button>
											)}
										</div>
									);
								}
								if (!owned && !isConnecting) {
									return (
										<div className="mt-4">
											<Button
												size="sm"
												disabled={!hasConnectedWallet}
												onClick={() => setSelectedCourse(course)}
												variant="lightBlue"
											>
												Purchase
											</Button>
										</div>
									);
								}
							}}
						/>
					);
				}}
			</CourseList>

			<OrderModal
				isNewPurchase={isNewPurchase}
				onClose={() => {
					setSelectedCourse(null);
					setIsNewPurchase(true);
				}}
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
