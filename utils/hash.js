export const createCorseHash = (web3) => (courseId, account) => {
	//transform course id into hash (something like this 0x31313132343331)
	const hexCourseId = web3.utils.utf8ToHex(courseId);

	//course hash wich is a hash made by the course id + the account (something like this 0x6f4b930f3b55568a587638fd9ad5ff059793c0bce09da4bb051862226b2a17ba)
	//this will be the course identifier to find it with the contract function
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

	return courseHash;
};
