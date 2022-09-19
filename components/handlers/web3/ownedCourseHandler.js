import { normalizeOwnedCourse } from '@utils/normalize';
import { createCorseHash } from '@utils/hash';
import useSwr from 'swr';

export const handler = (web3, contract) => (course, account) => {
	const swrRes = useSwr(
		//when the unic identifier changes, the function will re-fetch, so we use the account number to make it unic
		//we do this becouse when we change account on metamask the owned courses will be updated straigth away
		() => (web3 && contract && account ? `web3/ownedCourse/${account}` : null),
		async () => {
			const courseHash = createCorseHash(web3)(course.id, account);

			//then we can find the course by its hashed string
			//call() its a method of the smart contracts to call function of the contract, as well as send()
			const courseOwned = await contract.methods
				.getCourseByHash(courseHash)
				.call();

			if (courseOwned.owner === '0x0000000000000000000000000000000000000000') {
				return null;
			}

			const normalize = normalizeOwnedCourse(web3)(course, courseOwned);

			//return owned courses
			return normalize;
		}
	);

	return swrRes;
};
