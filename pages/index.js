import { CourseCard, CourseList } from '@components/ui/course';
import { Hero } from '@components/ui/common';
import { BaseLayout } from '@components/ui/layout';
import { getAllCourser } from '@content/course/fetcher';

export default function Home({ courses }) {
	return (
		<>
			<Hero />
			<CourseList courses={courses}>
				{(course) => <CourseCard key={course.id} course={course} />}
			</CourseList>
		</>
	);
}

export function getStaticProps() {
	const { data } = getAllCourser();
	return {
		props: {
			courses: JSON.parse(JSON.stringify(data)),
		},
	};
}

Home.Layout = BaseLayout;
