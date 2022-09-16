import { BaseLayout } from '@components/ui/layout';
import { Lecture, Hero, Keyinfo } from '@components/ui/course';
import { Message, Modal } from '@components/ui/common';
import { getAllCourser } from '@content/course/fetcher';
import { useAccount, useOwnedCourse } from '@components/web3/hooks';

export default function Course({ course }) {
	const { account } = useAccount();
	const { ownedCourse } = useOwnedCourse(course, account.data);
	const courseState = ownedCourse.data?.state;

	const isLocked = courseState === 'purchased' || courseState === 'deactivated';

	const showCourseState = () => {
		if (courseState === 'purchased') {
			return (
				<Message type="warning">
					Course is purchased and waiting for activation. Process can take up to
					24h.
					<i className="block text-sm">
						In case of any trouble, please contact didier.dankan@outlook.com.
					</i>
				</Message>
			);
		}

		if (courseState === 'activated') {
			return (
				<Message>
					I whish you happy watching.
					<i className="block text-sm">
						In Case of any issues, please contact didier.dankan@outlook.com.
					</i>
				</Message>
			);
		}

		if (courseState === 'deactivated') {
			return (
				<Message type="red">
					Course was deactivated, due to incorrect purchased data. the
					functionality to watch the course has been disabled
					<i className="block text-sm">
						If that is not the case, please contact didier.dankan@outlook.com.
					</i>
				</Message>
			);
		}
	};

	return (
		<>
			<div className="py-4">
				<Hero
					hasOwner={!!ownedCourse.data}
					title={course.title}
					description={course.description}
					cover={course.coverImage}
				/>
			</div>
			<Keyinfo points={course.wsl} />
			{courseState && (
				<div className="max-w-5xl mx-auto">{showCourseState()}</div>
			)}
			<Lecture lock={isLocked} courseState={courseState} />
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
