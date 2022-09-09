const CourseList = ({ courses, children }) => {
	return (
		<section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
			{/* children will be a callback function dlecrared in marketplace/home page */}
			{courses.map((course) => children(course))}
		</section>
	);
};

export default CourseList;
