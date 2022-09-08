import { BaseLayout } from '@components/ui/layout';
import { Lecture, Hero, Keyinfo } from '@components/ui/course';
import { Modal } from '@components/ui/common';
import { getAllCourser } from '@content/course/fetcher';

export default function Course({ course }) {
	console.log('points', course.wsl);
	return (
		<>
			<div className="py-4">
				<Hero
					title={course.title}
					description={course.description}
					cover={course.coverImage}
				/>
			</div>
			<Keyinfo points={course.wsl} />
			<Lecture lock={true} />
			<Modal />
		</>
	);
}

export function getStaticProps(ctx) {
	let query = ctx.params.slug;

	const { data } = getAllCourser();

	const singleCourse = data.filter((c) => {
		return c.slug.toString() === query.toString();
	})[0];

	return {
		props: {
			course: JSON.parse(JSON.stringify(singleCourse)),
		},
	};
}

export function getStaticPaths() {
	const { data } = getAllCourser();
	return {
		paths: data.map((c) => ({ params: { slug: c.slug } })),
		fallback: false,
	};
}

Course.Layout = BaseLayout;
