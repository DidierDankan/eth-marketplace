import { CourseFilter, ManagedCourseCard } from '@components/ui/course';
import { BaseLayout } from '@components/ui/layout';
import { WalletHeader } from '@components/ui/marketplace';
import { Message, Button } from '@components/ui/common';
import { useAdmin, useManageCourses } from '@components/web3/hooks';
import { useState } from 'react';
import { useWeb3 } from '@components/provider';
import { VerificationInput } from '@components/ui/marketplace';
import { normalizeOwnedCourse } from '@utils/normalize';

export default function ManageCourses() {
	const [searchCourse, setSearchCourse] = useState(null);
	const [filter, setFilter] = useState({ state: 'all' });
	const [proofedOwnership, setProofedOwnership] = useState({});
	const { web3, contract } = useWeb3();

	const { account } = useAdmin({ redirectTo: '/marketplace' });
	const { manageCourses } = useManageCourses(account);

	const verifyCourse = (email, { hash, proof }) => {
		const emailHash = web3.utils.sha3(email);
		const proofToCheck = web3.utils.soliditySha3(
			{ type: 'bytes32', value: emailHash },
			{ type: 'bytes32', value: hash }
		);

		proofToCheck === proof
			? setProofedOwnership({
					...proofedOwnership,
					[hash]: true,
			  })
			: setProofedOwnership({
					...proofedOwnership,
					[hash]: false,
			  });
	};

	const changeCourseState = async (courseHash, method) => {
		try {
			await contract.methods[method](courseHash).send({
				from: account.data,
			});
		} catch (error) {
			console.error(error.message);
		}
	};

	const _activateCourse = async (courseHash) => {
		changeCourseState(courseHash, 'activateCourse');
	};

	const _deactivateCourse = async (courseHash) => {
		changeCourseState(courseHash, 'deactivateCourse');
	};

	const _searchCourse = async (hash) => {
		const re = /[0-9A-Fa-f]{6}/g;

		if (hash && hash.length === 66 && re.test(hash)) {
			const course = await contract.methods.getCourseByHash(hash).call();

			if (course.owner !== '0x0000000000000000000000000000000000000000') {
				const normalize = normalizeOwnedCourse(web3)({ hash }, course);
				setSearchCourse(normalize);
				return;
			}
		}

		setSearchCourse(null);
	};

	const renderCard = (course, isSearched) => {
		return (
			<ManagedCourseCard
				key={course.ownedCourseId}
				isSearched={isSearched}
				course={course}
			>
				<VerificationInput
					onVerify={(email) => {
						verifyCourse(email, {
							hash: course.hash,
							proof: course.proof,
						});
					}}
				/>
				{proofedOwnership[course.hash] && (
					<div className="mt-2">
						<Message>Verified!</Message>
					</div>
				)}
				{proofedOwnership[course.hash] === false && (
					<div className="mt-2">
						<Message type="danger">Wrong Proof!</Message>
					</div>
				)}
				{course.state === 'purchased' && (
					<div className="mt-2">
						<Button
							onClick={() => _activateCourse(course.hash)}
							variant="green"
						>
							Activate
						</Button>
						<Button
							onClick={() => _deactivateCourse(course.hash)}
							variant="red"
						>
							Deactivate
						</Button>
					</div>
				)}
			</ManagedCourseCard>
		);
	};

	const filteredCourses = manageCourses.data
		?.filter((course) => {
			if (filter.state === 'all') {
				return true;
			}
			return course.state === filter.state;
		})
		.map((course) => renderCard(course));

	if (!account.isAdmin) {
		return null;
	}

	return (
		<>
			<WalletHeader />
			<CourseFilter
				onSearchSubmit={_searchCourse}
				onFilterSelecte={(value) => setFilter({ state: value })}
			/>
			<section className="grid grid-cols-1">
				<div>
					<h1 className="text-2xl font-bold p-5">Search</h1>
					{searchCourse && renderCard(searchCourse, true)}
				</div>
				<h1 className="text-2xl font-bold p-5">All Courses</h1>
				{filteredCourses}
				{filteredCourses?.length === 0 && (
					<Message type="warning">No Courses to display</Message>
				)}
			</section>
		</>
	);
}

ManageCourses.Layout = BaseLayout;
