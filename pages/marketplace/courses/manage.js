import { CourseFilter, ManagedCourseCard } from '@components/ui/course';
import { BaseLayout } from '@components/ui/layout';
import { WalletHeader } from '@components/ui/marketplace';
import { Message, Button } from '@components/ui/common';
import { useAdmin, useManageCourses } from '@components/web3/hooks';
import { useState } from 'react';
import { useWeb3 } from '@components/provider';
import { VerificationInput } from '@components/ui/marketplace';

export default function ManageCourses() {
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

	const _activateCourse = async (courseHash) => {
		try {
			await contract.methods
				.activateCourse(courseHash)
				.send({ from: account.data });
		} catch (error) {
			console.error(error.message);
		}
	};

	const _deactivateCourse = async (courseHash) => {
		try {
			await contract.methods
				.deactivateCourse(courseHash)
				.send({ from: account.data });
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<>
			<WalletHeader />
			<CourseFilter />
			<section className="grid grid-cols-1">
				{manageCourses.data?.map((course) => (
					<ManagedCourseCard key={course.courseOwnedId} course={course}>
						<div className="flex mr-2 relative rounded-md">
							<VerificationInput
								onVerify={(email) => {
									verifyCourse(email, {
										hash: course.hash,
										proof: course.proof,
									});
								}}
							/>
						</div>
						{proofedOwnership[course.hash] && (
							<div className="mt-2">
								<Message>Verified!</Message>
							</div>
						)}
						{proofedOwnership[course.hash] == false && (
							<div className="mt-2">
								<Message type="danger">Wrong Proof!</Message>
							</div>
						)}
						{course.state === 'purchased' && (
							<div>
								<Button
									onClick={() => _activateCourse(course.hash)}
									className="mt-2 mr-2"
									variant="green"
								>
									Activate
								</Button>
								<Button
									onClick={() => _deactivateCourse(course.hash)}
									className="mt-2"
									variant="red"
								>
									Deactivate
								</Button>
							</div>
						)}
					</ManagedCourseCard>
				))}
			</section>
		</>
	);
}

ManageCourses.Layout = BaseLayout;
