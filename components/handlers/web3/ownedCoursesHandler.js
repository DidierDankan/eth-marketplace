import { normalizeOwnedCourse } from '@utils/normalize';
import { createCourseHash } from '@utils/hash';
import useSwr from 'swr';

export const handler = (web3, contract) => (courses, account) => {
	const swrRes = useSwr(
		//when the unic identifier changes, the function will re-fetch, so we use the account number to make it unic
		//we do this becouse when we change account on metamask the owned courses will be updated straigth away
		() => (web3 && contract && account ? `web3/ownedCourses/${account}` : null),
		async () => {
			const ownedCourses = [];
			for (let i = 0; i < courses.length; i++) {
				const course = courses[i];

				if (!course.id) {
					continue;
				}

				const courseHash = createCourseHash(web3)(course.id, account);

				//then we can find the course by its hashed string
				//call() its a method of the smart contracts to call function of the contract, as well as send()
				const courseOwned = await contract.methods
					.getCourseByHash(courseHash)
					.call();

				if (
					courseOwned.owner !== '0x0000000000000000000000000000000000000000'
				) {
					const normalize = normalizeOwnedCourse(web3)(course, courseOwned);
					//push normalized courses to the array
					ownedCourses.push(normalize);
				}
			}

			//return owned courses
			return ownedCourses;
		}
	);

	return {
		...swrRes,
		lookup:
			swrRes.data?.reduce((a, c) => {
				a[c.id] = c;
				return a;
			}, {}) ?? {},
	};
};
