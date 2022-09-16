import { normalizeOwnedCourse } from '@utils/normalize';
import useSwr from 'swr';

export const handler = (web3, contract) => (course, account) => {
	const swrRes = useSwr(
		//when the unic identifier changes, the function will re-fetch, so we use the account number to make it unic
		//we do this becouse when we change account on metamask the owned courses will be updated straigth away
		() => (web3 && contract && account ? `web3/ownedCourse/${account}` : null),
		async () => {
			//transform course id into hash (something like this 0x31313132343331)
			const hexCourseId = web3.utils.utf8ToHex(course.id);

			//course hash wich is a hash made by the course id + the account (something like this 0x6f4b930f3b55568a587638fd9ad5ff059793c0bce09da4bb051862226b2a17ba)
			//this will be the course identifier to find it with the next function
			const courseHash = web3.utils.soliditySha3(
				{
					type: 'bytes16',
					value: hexCourseId,
				},
				{
					type: 'address',
					value: account,
				}
			);

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
