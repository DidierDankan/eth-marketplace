export const COURSE_STATES = {
	0: 'pending',
	1: 'activated',
	2: 'deactivated',
};

// here wer merging info together course + courseOwned
export const normalizeOwnedCourse = (web3) => (course, courseOwned) => {
	return {
		...course,
		courseOwnedId: courseOwned.id,
		proof: courseOwned.proof,
		owned: courseOwned.owner,
		price: web3.utils.fromWei(courseOwned.price),
		state: COURSE_STATES[courseOwned.state],
	};
};
