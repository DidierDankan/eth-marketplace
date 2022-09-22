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
import { notify } from '@utils/notify';

export default function Marketplace({ courses }) {
	const { web3, contract } = useWeb3();
	const { account, hasConnectedWallet, isConnecting } = useWalletInfo();
	const [seletedCourse, setSelectedCourse] = useState(null);
	const [busyCourseId, setBusyCourseId] = useState(null);
	const [isNewPurchase, setIsNewPurchase] = useState(true);
	const { ownedCourses } = useOwnedCourses(courses, account.data);

	const _onPurchase = async (order, course) => {
		const hexCourseId = web3.utils.utf8ToHex(course.id);

		//courseIdHex + account address
		const courseHash = web3.utils.soliditySha3(
			{
				type: 'bytes16',
				value: hexCourseId,
			},
			{ type: 'address', value: account.data }
		);

		const price = web3.utils.toWei(String(order.price));

		setBusyCourseId(course.id);
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
			notify(_purchaseCourse({ hexCourseId, proof, price }, course));
		} else {
			notify(_repurchaseCourse({ courseHash, price }, course));
		}
	};

	const _purchaseCourse = async ({ hexCourseId, proof, price }, course) => {
		try {
			const result = await contract.methods
				.purchaseCourse(hexCourseId, proof)
				.send({ from: account.data, value: price });
			//mutating data imidiatly after buying tx
			ownedCourses.mutate([
				...ownedCourses.data,
				{
					...course,
					proof: proof,
					state: 'pending',
					owner: account.data,
					price,
				},
			]);
			return result;
		} catch (error) {
			throw new Error(error.message);
		} finally {
			setBusyCourseId(null);
		}
	};

	const _repurchaseCourse = async ({ courseHash, price }, course) => {
		try {
			const result = await contract.methods
				.repurchasedCourse(courseHash)
				.send({ from: account.data, value: price });

			// find the index of course and use it to update state of said course
			const index = ownedCourses.data.findIndex((c) => c.id === course.id);
			if (index >= 0) {
				ownedCourses.data[index].state = 'pending';
				ownedCourses.mutate(ownedCourses.data);
			} else {
				ownedCourses.mutate();
			}
			return result;
		} catch (error) {
			throw new Error(error.message);
		} finally {
			setBusyCourseId(null);
		}
	};

	const cleanupModal = () => {
		setSelectedCourse(null);
		setIsNewPurchase(true);
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

								if (!ownedCourses.hasInitialResponse) {
									return (
										<div className="mt-4">
											<Button size="sm" disabled={true} variant="lightBlue">
												{hasConnectedWallet ? <Loader size="sm" /> : 'Connect'}
											</Button>
										</div>
									);
								}
								const isBusy = busyCourseId === course.id;

								if (owned) {
									return (
										<div className="mt-4 flex items-center">
											{owned?.state === 'deactivated' ? (
												<Button
													size="sm"
													disabled={isBusy}
													onClick={() => {
														setIsNewPurchase(false);
														setSelectedCourse(course);
													}}
													variant="lightBlue"
												>
													{isBusy ? (
														<div className="flex items-center">
															{' '}
															<Loader size="sm" />{' '}
															<span className="ml-2">In Progress</span>{' '}
														</div>
													) : (
														'Fund to Activate'
													)}
												</Button>
											) : (
												<Button size="sm" disabled={true} variant="white">
													Owner
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
												disabled={!hasConnectedWallet || isBusy}
												onClick={() => setSelectedCourse(course)}
												variant="lightBlue"
											>
												{isBusy ? (
													<div className="flex items-center">
														{' '}
														<Loader size="sm" />{' '}
														<span className="ml-2">In Progress</span>{' '}
													</div>
												) : (
													'Purchase'
												)}
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
				onClose={cleanupModal}
				onSubmit={(formData, course) => {
					_onPurchase(formData, course);
				}}
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
