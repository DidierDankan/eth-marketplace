import { normalizeOwnedCourse } from '@utils/normalize';
import useSwr from 'swr';

export const handler = (web3, contract) => (account) => {
	const swrRes = useSwr(
		//when the unic identifier changes, the function will re-fetch, so we use the account number to make it unic
		//we do this becouse when we change account on metamask the owned courses will be updated straigth away
		() =>
			web3 && contract && account.data && account.isAdmin
				? `web3/manageCourses/${account}`
				: null,
		async () => {
			const courses = [];

			const courseCount = await contract.methods.getCourseCount().call();

			//if we supposed to have 5 courses
			//courseCount would be 5
			//but the last course index would be 4

			for (let i = Number(courseCount) - 1; i >= 0; i--) {
				const courseHash = await contract.methods
					.getCourseHashAtIndex(i)
					.call();
				const course = await contract.methods
					.getCourseByHash(courseHash)
					.call();

				if (course) {
					const normalize = normalizeOwnedCourse(web3)(
						// wer adding a new property to the object
						{ hash: courseHash },
						course
					);
					courses.push(normalize);
				}
			}

			//return owned courses
			return courses.reverse();
		}
	);

	return swrRes;
};
