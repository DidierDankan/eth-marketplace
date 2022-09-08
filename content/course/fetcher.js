import courses from './index.json';

export const getAllCourser = () => {
	return {
		data: courses,
		courseMap: courses.reduce((a, c, i) => {
			//first interaction
			// a = accumulator {}
			// c = data itself(each obj) next
			// i = index 0
			a[c.id] = c;
			a[c.id].index = i;
			return a;
		}, {}),
	};
};

//the id of the course becomes the key of each obj, so if we know the id we can access that course trought the id.
