import useSWR from 'swr';

export const handler = (web3, contract) => (courses, account) => {
	const swrRes = useSWR(
		() => (web3 && contract && account ? 'we3/ownedCourses' : null),
		async () => {
			const ownedCourses = [];
			for (let i = 0; i < courses.length; i++) {
				const course = courses[i];

				if (!course.id) {
					continue;
				}

				//transform course id in hash
				const hexCourseId = web3.utils.utf8ToHex(course.id);
				//course hash wich is a hash made by the course id plus the account
				const courseHash = web3.utils.soliditySha3(
					{
						type: 'byte16',
						value: hexCourseId,
					},
					{
						type: 'address',
						value: account,
					}
				);

				//then we can find the course by its hashed string
				const courseOwned = await contract.methods
					.getCourseByHash(courseHash)
					.call();

				if (
					courseOwned.owner !== '0x0000000000000000000000000000000000000000'
				) {
					ownedCourses.push(courseOwned);
				}
			}

			return ownedCourses;
		}
	);

	return swrRes;
};
