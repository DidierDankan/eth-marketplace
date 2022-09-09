import { CourseCard } from '@components/ui/course';

const CourseList = ({ courses }) => {
	return (
		<section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
			{courses.map((c) => (
				<CourseCard
					key={c.id}
					type={c.type}
					title={c.title}
					description={c.description}
					image={c.coverImage}
					slug={c.slug}
				/>
			))}
		</section>
	);
};

export default CourseList;
